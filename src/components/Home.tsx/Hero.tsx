
import { ArrowRightIcon, LeafIcon } from 'lucide-react'
import { herosectionData } from "../../assets/assets";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative flex items-center min-h-[540px] mb-10 overflow-hidden rounded-3xl px-5 py-7 m-3">
         <img src={herosectionData.hero_image} alt="Hero" className='absolute inset-0 h-full w-full object-cover'/>
         <div className='absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent '/>
         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:py-8 py-20 w-full'>
            <div className='max-w-xl xl:pl-10'>
                <span className='inline-flex items-center gap-2.5 px-4 py-1.5 text-sm font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5 ' >
                  <LeafIcon className='size-4 text-white ' />Farm-Fresh & Organic
                </span>

                <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-3'>
                    Nourish your home with <span className='text-orange-500'>Earth's finest</span>
                </h1>

                <p className='text-base text-white/70 leading-relaxed max-w-md py-4'>{herosectionData.description}</p>
                <div className='flex flex-wrap gap-3 py-5 px-5 '>
                    <Link to='/products' className='px-7 py-3 text-white bg-orange-500 font-semibold rounded-full hover:bg-orange-800 transition-all flex-center gap-2 active:scale-[0.94]'>
                    Shop Now <ArrowRightIcon className='size-4'/>
                    </Link>
                    
                    <Link to='/products' className='px-7 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/30 transition-all border border-white/20'>
                    Browser Categories
                    </Link>
                </div>
            </div>
         </div>
    </section>
  )
}

export default Hero