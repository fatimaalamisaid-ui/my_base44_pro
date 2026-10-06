import { useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHero from '../components/layout/PageHero.jsx'
import MenuExplorer from '../components/menu/MenuExplorer.jsx'
import { menuCategories } from '../data/site.js'
import { pageSeo } from '../data/content.js'
import { usePageMeta } from '../lib/seo.js'

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('cat') ?? 'all'
  const category = menuCategories.some((item) => item.id === requested) ? requested : 'all'

  usePageMeta(pageSeo.menu)

  return (
    <>
      <PageHero
        eyebrow="منوی کافه"
        title="منوی کافه و دانه"
        text="از اسپرسو و فلت‌وایت تا نوشیدنی‌های سرد، دسرها و صبحانه‌های تازه — هر کدام با دانه‌های برشته‌شده در همین کافه."
        image="photo-1495474472287-4d71bcdd2085"
        breadcrumb={[{ label: 'منوی کافه' }]}
      />

      <section className="bg-coffee-950 pb-20 pt-12 lg:pb-28">
        <Container>
          <MenuExplorer
            initialCategory={category}
            onCategoryChange={(next) =>
              setSearchParams(next === 'all' ? {} : { cat: next }, { replace: true })
            }
          />
        </Container>
      </section>
    </>
  )
}
