import { cx } from '../../lib/utils.js'

/** Small uppercase label with a champagne rule — used above every section title. */
export default function SectionLabel({ children, className = '', rule = true, align = 'left' }) {
  return (
    <div className={cx('flex items-center gap-3', align === 'center' && 'justify-center', className)}>
      {rule && <span className="rule" />}
      <span className="label">{children}</span>
      {rule && align === 'center' && <span className="rule" />}
    </div>
  )
}
