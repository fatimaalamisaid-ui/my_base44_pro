import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import { LogoMark } from '../components/ui/Icons.jsx'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-coffee-950 pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(216,180,122,0.12),transparent_65%)]" />

      <Container className="text-center">
        <LogoMark className="mx-auto h-14 w-14 text-gold/70" />
        <p className="mt-8 text-sm font-semibold text-gold">خطای ۴۰۴</p>
        <h1 className="mt-5 text-[clamp(1.8rem,4vw,2.8rem)] font-bold">
          این صفحه در منوی ما نیست
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-sand/65">
          نشانی‌ای که دنبالش بودید پیدا نشد. می‌توانید به خانه برگردید یا نگاهی به منوی کافه بیندازید.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" variant="primary" size="lg">
            بازگشت به خانه
          </Button>
          <Button to="/menu" variant="outline" size="lg">
            مشاهده منو
          </Button>
        </div>
      </Container>
    </section>
  )
}
