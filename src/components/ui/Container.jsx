import { cx } from '../../lib/utils.js'

/** Consistent page gutter + max width across the whole site. */
export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={cx('mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-10', className)} {...rest}>
      {children}
    </Tag>
  )
}
