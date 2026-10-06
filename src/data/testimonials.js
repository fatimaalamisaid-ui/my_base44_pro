/**
 * Guest testimonials — matches the intended CMS shape:
 * id, name, text, rating, image, active
 */

export const testimonials = [
  {
    id: 'sara',
    name: 'سارا',
    city: 'تهران',
    text: 'طعم فوق‌العاده و فضایی واقعاً صمیمی و دلنشین.',
    rating: 5,
    image: 'photo-1494790108377-be9c29b29330',
    active: true,
  },
  {
    id: 'amir',
    name: 'امیر',
    city: 'تهران',
    text: 'فلت‌وایت‌شان بهترین فنجانی‌ست که در تهران نوشیده‌ام؛ هر بار همان کیفیت.',
    rating: 5,
    image: 'photo-1500648767791-00dcc994a43e',
    active: true,
  },
  {
    id: 'niloofar',
    name: 'نیلوفر',
    city: 'کرج',
    text: 'اینجا می‌شود ساعت‌ها نشست، کار کرد و بی‌آنکه کسی عجله‌ات دهد قهوه نوشید.',
    rating: 5,
    image: 'photo-1534528741775-53994a69daeb',
    active: true,
  },
]

export const activeTestimonials = testimonials.filter((item) => item.active)
