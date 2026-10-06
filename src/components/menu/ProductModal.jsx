import { useEffect, useMemo, useRef, useState } from 'react'
import Photo from '../ui/Photo.jsx'
import Toast from '../ui/Toast.jsx'
import { Bag, Check, Close, Minus, Plus } from '../ui/Icons.jsx'
import { menuCategories, productOptions } from '../../data/site.js'
import { saveOrder } from '../../lib/storage.js'
import { useEscape, useLockBodyScroll } from '../../lib/hooks.js'
import { cx, priceLabel, toPersianDigits } from '../../lib/utils.js'

function defaultSelections(groups) {
  const selections = {}
  groups.forEach((group) => {
    if (group.type === 'radio') {
      const preset = group.choices.find((choice) => choice.default) ?? group.choices[0]
      selections[group.id] = preset.id
    } else {
      selections[group.id] = []
    }
  })
  return selections
}

/** RTL product dialog: image, description, ingredients, customisation, order. */
export default function ProductModal({ product, onClose }) {
  const groups = useMemo(
    () => (product ? productOptions.filter((group) => group.appliesTo.includes(product.category)) : []),
    [product],
  )

  const [selections, setSelections] = useState(() => defaultSelections(groups))
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState('')
  const panelRef = useRef(null)

  useLockBodyScroll(Boolean(product))
  useEscape(Boolean(product), onClose)

  // Fresh state whenever a different product is opened.
  useEffect(() => {
    setSelections(defaultSelections(groups))
    setQuantity(1)
    setStatus('idle')
  }, [product?.id, groups])

  useEffect(() => {
    if (product) panelRef.current?.focus()
  }, [product])

  if (!product) return null

  const categoryLabel = menuCategories.find((item) => item.id === product.category)?.label ?? ''

  const extrasTotal = groups.reduce((sum, group) => {
    const selection = selections[group.id]
    if (group.type === 'radio') {
      const choice = group.choices.find((item) => item.id === selection)
      return sum + (choice?.extra ?? 0)
    }
    return (
      sum +
      group.choices
        .filter((choice) => Array.isArray(selection) && selection.includes(choice.id))
        .reduce((groupSum, choice) => groupSum + (choice.extra ?? 0), 0)
    )
  }, 0)

  const unitPrice = product.price + extrasTotal
  const totalPrice = unitPrice * quantity

  function chooseRadio(groupId, choiceId) {
    setSelections((current) => ({ ...current, [groupId]: choiceId }))
  }

  function toggleExtra(groupId, choiceId) {
    setSelections((current) => {
      const list = Array.isArray(current[groupId]) ? current[groupId] : []
      return {
        ...current,
        [groupId]: list.includes(choiceId)
          ? list.filter((id) => id !== choiceId)
          : [...list, choiceId],
      }
    })
  }

  function handleAdd() {
    if (status !== 'idle') return
    setStatus('loading')
    window.setTimeout(() => {
      saveOrder({
        productId: product.id,
        name: product.name,
        quantity,
        selections,
        unitPrice,
        totalPrice,
      })
      setStatus('done')
      setToast(`«${product.name}» به سفارش شما اضافه شد`)
      window.setTimeout(() => setStatus('idle'), 1800)
    }, 700)
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto sm:items-center sm:p-6">
        <button
          type="button"
          aria-label="بستن"
          onClick={onClose}
          className="fixed inset-0 animate-overlay-in cursor-default bg-coffee-950/80 backdrop-blur-sm"
        />

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          tabIndex={-1}
          className="relative z-10 w-full max-w-3xl animate-scale-in overflow-hidden rounded-t-modal border border-line bg-coffee-850 shadow-modal outline-none sm:rounded-modal"
        >
          <div className="grid sm:grid-cols-[0.85fr_1fr]">
            {/* Image — first in DOM, so it sits on the right in RTL */}
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[420px]">
              <Photo
                id={product.image}
                alt={product.name}
                priority
                sizes="(max-width: 640px) 100vw, 380px"
                widths={[480, 720, 960]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/60 to-transparent sm:bg-gradient-to-l" />
              {product.badge && (
                <span className="absolute end-4 top-4 rounded-pill border border-gold/40 bg-coffee-950/70 px-3 py-1 text-[10px] font-semibold text-gold backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="relative max-h-[70vh] overflow-y-auto p-6 sm:max-h-[80vh] sm:p-7">
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن پنجره"
                className="absolute end-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-sand/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Close className="h-4 w-4" />
              </button>

              <p className="text-[11px] font-semibold text-gold">{categoryLabel}</p>
              <h2 id="product-modal-title" className="mt-2 pe-10 text-3xl font-bold text-cream">
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand/70">{product.description}</p>

              {product.ingredients?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-[11px] font-semibold text-gold">ترکیبات</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="rounded-pill border border-line px-3 py-1 text-[11px] text-sand/70"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Customisation */}
              {groups.map((group) => (
                <fieldset key={group.id} className="mt-6">
                  <legend className="text-[11px] font-semibold text-gold">{group.label}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.choices.map((choice) => {
                      const active =
                        group.type === 'radio'
                          ? selections[group.id] === choice.id
                          : Array.isArray(selections[group.id]) && selections[group.id].includes(choice.id)

                      return (
                        <button
                          key={choice.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            group.type === 'radio'
                              ? chooseRadio(group.id, choice.id)
                              : toggleExtra(group.id, choice.id)
                          }
                          className={cx(
                            'inline-flex items-center gap-2 rounded-pill border px-3.5 py-2 text-[12px] transition-all duration-300 ease-premium',
                            active
                              ? 'border-gold bg-gold/15 text-cream'
                              : 'border-line text-sand/70 hover:border-gold/50 hover:text-cream',
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5 text-gold" />}
                          {choice.label}
                          {choice.extra > 0 && (
                            <span className="text-[11px] text-gold">
                              +{toPersianDigits(choice.extra.toLocaleString('en-US').replace(/,/g, '٬'))}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              ))}

              {/* Quantity */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold text-gold">تعداد</span>
                <div className="inline-flex items-center gap-3 rounded-pill border border-line px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    disabled={quantity <= 1}
                    aria-label="کاهش تعداد"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-cream transition-colors hover:text-gold disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold text-cream">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                    aria-label="افزایش تعداد"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-cream transition-colors hover:text-gold"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Total + CTA */}
              <div className="mt-7 border-t border-line pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sand/65">مبلغ قابل پرداخت</span>
                  <span className="text-lg font-bold text-gold">{priceLabel(totalPrice)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={status !== 'idle'}
                  className={cx(
                    'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-medium transition-all duration-300 ease-premium',
                    status === 'done'
                      ? 'bg-gold/20 text-gold'
                      : 'bg-cream text-coffee-900 hover:bg-cream-200',
                    status === 'loading' && 'cursor-wait opacity-80',
                  )}
                >
                  {status === 'idle' && (
                    <>
                      <Bag className="h-4 w-4" />
                      افزودن به سفارش
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-coffee-900/30 border-t-coffee-900" />
                      در حال افزودن…
                    </>
                  )}
                  {status === 'done' && (
                    <>
                      <Check className="h-4 w-4" />
                      به سفارش اضافه شد
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-sand/45">
                  سفارش شما در همین مرورگر ذخیره می‌شود و برای پرداخت به پیشخوان اعلام می‌گردد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast('')} />
    </>
  )
}
