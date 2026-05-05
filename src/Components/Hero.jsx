import groupProfile from '../assets/group_profile.png'
import heroImg from '../assets/hero_img.png'

function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-900 md:px-8">
      <img src={groupProfile} alt="Group Profile" className="mb-3 rounded-full object-cover" />
      <h1 className="mb-6 text-center text-3xl font-bold line-spacing-40 text-gray-600 dark:text-white md:text-5xl">
        Turning imagination into<br /> <span className="text-blue-900">reality</span> with AI tools
      </h1>
      <p className="mb-10 max-w-2xl text-center text-lg text-gray-500 dark:text-gray-400 md:text-xl">
        Experience the next generation of AI tools designed to streamline your workflow and bring your most ambitious ideas to life.
      </p>
      <img src={heroImg} alt="Hero Image" className="w-full max-w-2xl object-contain md:max-w-4xl lg:max-w-6xl" />
    </section>
  )
}

export default Hero