import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui';
import mainImage from './main-image.png';
import logoImage from './logo-name.svg';
import { Icons } from '@/components';

export default function Home() {
  const footerLinks = [
    {
      title: 'Productos',
      links: [
        { title: 'Características', href: '/features' },
        { title: 'Precios', href: '/pricing' },
        { title: 'Integraciones', href: '/integrations' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Términos y condiciones', href: '/terms' },
        { title: 'Política de privacidad', href: '/privacy' },
        { title: 'Cookies', href: '/cookies' },
      ],
    },
    {
      title: 'Compañía',
      links: [
        { title: '¿Quiénes somos?', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Clientes', href: '/clients' },
      ],
    },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full backdrop-blur-sm px-4 md:px-8">
        <section className="flex items-center justify-between py-4 h-20 max-w-6xl mx-auto">
          <Image src={logoImage} alt="logo1" width={100} />

          <div className="flex items-center justify-start gap-2">
            <Button className="hidden sm:inline-flex rounded-full" variant="ghost" asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button className="rounded-full bg-logo hover:bg-logo/80" asChild>
              <Link href="/register">
                Registrate
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-20">
        <section className="flex flex-col items-center justify-center text-center text-pretty gap-4 mt-16">
          <h1 className="text-5xl md:text-6xl font-medium mb-8 animate-fade-in-down">
            Moss es la nueva forma de llevar historias clínicas digitales.
          </h1>

          <h2 className="text-xl md:text-2xl text-muted-foreground max-w-4xl mb-12 animate-fade-in-down delay-300">
            Conozca el nuevo estándar en historias clínicas digitales, diseñado para ayudar a los
            profesionales de la salud a brindar una mejor atención.
          </h2>

          <Button
            className="rounded-full bg-logo hover:bg-logo/80 text-base animate-fade-in-down delay-500"
            size="lg"
            asChild
          >
            <Link href="/register">Empieza gratis</Link>
          </Button>
        </section>

        <section className="mt-24 animate-inclined-fade-in-down delay-500">
          <Image src={mainImage} alt="Demo dashboard image" priority />
        </section>
      </main>

      <div className="h-px bg-[#e4e4e7] mt-32"></div>

      <footer className="w-full px-4 md:px-8">
        <section className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 min-h-40 py-16 max-w-6xl mx-auto">
          <section className="flex flex-col items-start justify-start gap-6">
            <Image src={logoImage} alt="logo1" width={100} />

            <p className="text-sm text-muted-foreground max-w-72">
              Dando el poder a los profesionales de la salud para brindar una mejor atención.
            </p>

            <div className="flex items-center justify-start gap-4 mt-8">
              <Icons.Twitter className="w-6 h-6 text-muted-foreground" />
              <Icons.GitHub className="w-6 h-6 text-muted-foreground" />
              <Icons.Instagram className="w-6 h-6 text-muted-foreground" />
            </div>
          </section>

          {footerLinks.map((section) => (
            <section key={section.title}>
              <h3 className="text-sm font-medium text-logo mb-4">{section.title}</h3>

              <div className="flex flex-col items-start justify-start gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-muted-foreground/80"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </section>

        <section className="py-8 max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground">
            © 2021 Moss. Todos los derechos reservados.
          </p>
        </section>
      </footer>
    </>
  );
}

{
  /* <main className="max-w-6xl mx-auto px-8">
  <section className="grid grid-cols-2 items-center h-screen gap-8">
    <div className="flex flex-col gap-6 items-start justify-start text-pretty">
      <h1 className="text-5xl font-medium">Historias clínicas digitales pero con superpoderes.</h1>
      <h2 className="text-muted-foreground text-xl">
        Todo lo que necesitas para llevar un control de tus pacientes y consultas.
      </h2>
      <Button
        className="rounded-full bg-logo hover:bg-logo/80 text-base"
        size="lg"
        asChild
      >
        <Link href="/register">Registrate gratis</Link>
      </Button>
    </div>
    <Image src="/logo1.png" alt="logo1" width={528} height={528} />
  </section>
</main>; */
}
