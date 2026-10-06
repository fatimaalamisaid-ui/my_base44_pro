/**
 * Client-side persistence seam.
 *
 * The site ships without a server: orders and contact messages are kept in
 * localStorage so every flow is real and works offline. When a CMS or database
 * is connected, these functions are the only thing that has to change — the
 * components around them already treat them as async-safe.
 */

const KEYS = {
  orders: 'kafevdaneh:orders',
  messages: 'kafevdaneh:messages',
}

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — the UI stays usable */
  }
}

export function getOrders() {
  return read(KEYS.orders, [])
}

/** Persist one order line and return the new order count. */
export function saveOrder(order) {
  const orders = getOrders()
  orders.push({ ...order, createdAt: new Date().toISOString() })
  write(KEYS.orders, orders)
  return orders.length
}

export function getMessages() {
  return read(KEYS.messages, [])
}

export function saveMessage(message) {
  const messages = getMessages()
  messages.push({ ...message, createdAt: new Date().toISOString() })
  write(KEYS.messages, messages)
  return messages.length
}
