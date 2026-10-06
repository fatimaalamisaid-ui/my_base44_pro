import { cx } from '../../lib/utils.js'

/** Small gold eyebrow with a rule — sits above every section title. */
export default function SectionLabel({ children, className = '', rule = true, align = 'start' }) {
  const centered = align === 'center'
  return (
    <div className={cx('flex items-center gap-3', centered && 'justify-center', className)}>
      {rule && <span className="rule" />}
      <span className="label">{children}</span>
      {rule && centered && <span className="rule" />}
    </div>
  )
}
