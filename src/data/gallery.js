/**
 * Editorial gallery — matches the intended CMS shape:
 * id, image, title, category, sortOrder
 *
 * `span` is a purely presentational hint for the asymmetric magazine grid:
 *   'tall'  -> occupies two rows   |  'wide' -> occupies two columns
 */
export const gallery = [
  {
    id: 'barista',
    image: 'photo-1504753793650-d4a2b783c15e',
    title: 'پشت پیشخوان',
    category: 'کافه',
    span: 'tall',
    sortOrder: 1,
  },
  {
    id: 'beans',
    image: 'photo-1447933601403-0c6688de566e',
    title: 'دانه‌های تازه',
    category: 'دانه',
    span: 'normal',
    sortOrder: 2,
  },
  {
    id: 'interior',
    image: 'photo-1554118811-1e0d58224f24',
    title: 'گوشه‌ای برای نشستن',
    category: 'فضا',
    span: 'wide',
    sortOrder: 3,
  },
  {
    id: 'latte-art',
    image: 'photo-1572442388796-11668a67e53d',
    title: 'فنجانی در نور صبح',
    category: 'قهوه',
    span: 'normal',
    sortOrder: 4,
  },
  {
    id: 'machine',
    image: 'photo-1516315720917-231ef9acce48',
    title: 'دستگاه همیشگی ما',
    category: 'کافه',
    span: 'normal',
    sortOrder: 5,
  },
  {
    id: 'roasting',
    image: 'photo-1453614512568-c4024d13c247',
    title: 'برشته‌کاری هفتگی',
    category: 'دانه',
    span: 'wide',
    sortOrder: 6,
  },
  {
    id: 'counter',
    image: 'photo-1445116572660-236099ec97a0',
    title: 'روزهای شلوغ کافه',
    category: 'فضا',
    span: 'normal',
    sortOrder: 7,
  },
  {
    id: 'table',
    image: 'photo-1521017432531-fbd92d768814',
    title: 'میز چیده‌شده',
    category: 'فضا',
    span: 'normal',
    sortOrder: 8,
  },
]

export const galleryPreview = gallery.slice(0, 6)
