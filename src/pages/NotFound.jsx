import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import { useDocumentTitle } from '../lib/hooks.js'

export default function NotFound() {
  useDocumentTitle('Page not found — Horizon Properties')

  return (
    <section className="flex min-h-[70vh] items-center bg-white pb-20 pt-[132px]">
      <Container className="text-center">
        <p className="text-[11px] font-semibold uppercase text-champagne-600" style={{ letterSpacing: '0.18em' }}>
          404
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-navy-950">
          We could not find that page
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-navy-500">
          The link may be out of date. Try the current portfolio, or get in touch and we will point you in
          the right direction.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/properties" variant="primary" size="lg">
            Browse properties
          </Button>
          <Button to="/" variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  )
}
