import { useEffect, useMemo, useState } from 'react'
import Reveal from '../ui/Reveal.jsx'
import CategoryTabs from './CategoryTabs.jsx'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'
import { Coffee } from '../ui/Icons.jsx'
import { menuCategories } from '../../data/site.js'
import { products } from '../../data/products.js'
import { menuSection } from '../../data/content.js'
import { countLabel } from '../../lib/utils.js'

/**
 * Category tabs + product grid + product modal.
 *
 * Shared by the homepage (with `limit`) and the full menu page (without), so
 * filtering and ordering behave identically in both places.
 */
export default function MenuExplorer({
  limit,
  initialCategory = 'all',
  onCategoryChange,
  showCount = true,
}) {
  const [category, setCategory] = useState(initialCategory)
  const [selected, setSelected] = useState(null)

  // Keep in step when the category arrives from elsewhere (e.g. a footer link).
  useEffect(() => {
    setCategory(initialCategory)
  }, [initialCategory])

  const visible = useMemo(() => {
    const list =
      category === 'all' ? products : products.filter((product) => product.category === category)
    const sorted = [...list].sort((a, b) => a.sortOrder - b.sortOrder)
    return limit ? sorted.slice(0, limit) : sorted
  }, [category, limit])

  function handleCategory(next) {
    setCategory(next)
    onCategoryChange?.(next)
  }

  return (
    <>
      <CategoryTabs
        categories={menuCategories}
        activeId={category}
        onChange={handleCategory}
        className="mt-10"
      />

      {showCount && (
        <p className="mt-5 text-center text-[12px] text-sand/45">
          {countLabel(visible.length, 'آیتم نمایش داده می‌شود', 'آیتم نمایش داده می‌شود')}
        </p>
      )}

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {visible.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 7) * 70}>
              <ProductCard product={product} onSelect={setSelected} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 flex flex-col items-center rounded-modal border border-line bg-coffee-800/40 px-8 py-16 text-center">
          <Coffee className="h-9 w-9 text-gold/70" />
          <h3 className="mt-5 text-xl font-bold">{menuSection.emptyTitle}</h3>
          <p className="mt-2 max-w-sm text-sm text-sand/60">{menuSection.emptyText}</p>
        </div>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
