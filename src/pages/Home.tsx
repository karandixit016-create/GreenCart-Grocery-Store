import AppPromoBanner from "../components/Home.tsx/AppPromoBanner"
import Features from "../components/Home.tsx/Features"
import Hero from "../components/Home.tsx/Hero"
import HomeCategories from "../components/Home.tsx/HomeCategories"
import NewsLetter from "../components/Home.tsx/NewsLetter"
import PopularProducts from "../components/Home.tsx/PopularProducts"

const Home = () => {
  return (
    <div className="min-h-screen max-h-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
      <AppPromoBanner />
      <NewsLetter />
    </div>
  )
}

export default Home