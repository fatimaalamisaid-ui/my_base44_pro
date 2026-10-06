/**
 * Site-wide settings, contact details and structural content.
 *
 * Everything the café owner is likely to edit lives here (or in the other
 * files in /src/data) rather than inside components, so the content can later
 * be moved to a CMS/database without touching the UI.
 */

export const siteSettings = {
  brandName: 'کافه و دانه',
  tagline: 'قهوه تخصصی، از دانه تا فنجان',
  description:
    'کافه و دانه، جایی برای قهوه‌های تخصصی، دانه‌های تازه‌برشت و لحظه‌هایی که با آرامش سپری می‌شوند.',
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  phoneHref: 'tel:+982112345678',
  email: 'hello@kafevdaneh.ir',
  address: 'تهران، خیابان ...',
  openingHours: 'شنبه تا پنجشنبه — ۸ صبح تا ۱۰ شب',
  copyrightYear: '۱۴۰۴',
  socials: {
    instagram: 'https://instagram.com',
    telegram: 'https://t.me',
    whatsapp: 'https://wa.me',
  },
}

export const contactInfo = {
  addressLines: ['تهران، خیابان ...', 'پلاک ۰، طبقه همکف'],
  hoursLines: [
    { days: 'شنبه تا پنجشنبه', time: '۸ صبح تا ۱۰ شب' },
    { days: 'جمعه', time: '۹ صبح تا ۱۱ شب' },
  ],
  mapNote: 'موقعیت دقیق کافه و دانه روی نقشه — به‌زودی با Google Maps یا Mapbox متصل می‌شود.',
  directionsHref: 'https://maps.google.com/?q=Tehran',
}

export const navLinks = [
  { label: 'خانه', to: '/' },
  { label: 'منوی کافه', to: '/menu' },
  { label: 'درباره ما', to: '/about' },
  { label: 'داستان ما', to: '/story' },
  { label: 'گالری', to: '/gallery' },
  { label: 'تماس با ما', to: '/contact' },
]

export const features = [
  {
    id: 'blends',
    icon: 'blend',
    title: 'آمیزه‌های اختصاصی',
    description: 'انتخاب‌شده از بهترین دانه‌ها و برشته‌شده با دقت.',
  },
  {
    id: 'atmosphere',
    icon: 'armchair',
    title: 'فضایی برای آرامش',
    description: 'جایی برای قرارهای صمیمی، کار و لحظه‌های خوب.',
  },
  {
    id: 'roast',
    icon: 'grinder',
    title: 'برشت تازه',
    description: 'دانه‌ها با دقت و تازگی برای بهترین عطر و طعم آماده می‌شوند.',
  },
]

/* Menu taxonomy — used by the tabs and by every filter */
export const menuCategories = [
  { id: 'all', label: 'همه' },
  { id: 'hot', label: 'قهوه گرم' },
  { id: 'cold', label: 'نوشیدنی سرد' },
  { id: 'dessert', label: 'دسر' },
  { id: 'breakfast', label: 'صبحانه' },
]

/**
 * Optional customisation offered inside the product modal.
 * `appliesTo` limits an option group to certain menu categories.
 */
export const productOptions = [
  {
    id: 'size',
    label: 'اندازه',
    type: 'radio',
    appliesTo: ['hot', 'cold'],
    choices: [
      { id: 'small', label: 'کوچک', extra: 0 },
      { id: 'medium', label: 'متوسط', extra: 0, default: true },
      { id: 'large', label: 'بزرگ', extra: 20000 },
    ],
  },
  {
    id: 'milk',
    label: 'نوع شیر',
    type: 'radio',
    appliesTo: ['hot', 'cold'],
    choices: [
      { id: 'whole', label: 'شیر معمولی', extra: 0, default: true },
      { id: 'lactose-free', label: 'بدون لاکتوز', extra: 15000 },
      { id: 'oat', label: 'شیر جو دوسر', extra: 25000 },
      { id: 'almond', label: 'شیر بادام', extra: 25000 },
    ],
  },
  {
    id: 'extras',
    label: 'افزودنی‌ها',
    type: 'checkbox',
    appliesTo: ['hot', 'cold'],
    choices: [
      { id: 'extra-shot', label: 'شات اضافه اسپرسو', extra: 18000 },
      { id: 'vanilla', label: 'سیروپ وانیل', extra: 15000 },
      { id: 'cinnamon', label: 'دارچین', extra: 0 },
      { id: 'whipped', label: 'خامه فرم‌گرفته', extra: 20000 },
    ],
  },
]
