import { company_logos } from '../assets/assets'

function Logo() {
  return (
    <section className="bg-white py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Trusted by leading company
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20">
          {company_logos.map((logo, index) => (
            <a
              key={index}
              href={logo.href}
              target={logo.href.startsWith('http') ? '_blank' : undefined}
              rel={logo.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-all hover:opacity-100"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto cursor-pointer object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert dark:brightness-0 dark:hover:invert-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logo