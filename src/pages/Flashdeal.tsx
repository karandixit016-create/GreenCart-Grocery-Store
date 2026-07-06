import { useEffect, useState } from "react"
import type { Product } from "../types"
import { dummyProducts } from "../assets/assets"
import { ZapIcon } from 'lucide-react';
import ProductCard from "../components/Home.tsx/ProductCard";
import Loading from "../components/Loading";

const Flashdeal = () => {

  const [products] = useState<Product[]>(() =>
    dummyProducts.filter((p) => p.stock > 0)
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     setTimeout(() => setLoading(false), 1000)
  }, [])
  
  return (
    <div className="bg-app-cream  min-h-screen">
      
      {/* banner */}
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark text-white py-10">
       
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <div className="flex-center gap-2 mb-3 ">
          <ZapIcon className="size-6 fill-white"/>
          <h1 className="text-3xl font-semibold">Flash Deals</h1>
          <ZapIcon className="size-6 fill-white"/>
        </div>
        <p className="text-white/80 max-w-md mx-auto"> Limited-time offers on your favorite organic products. Grab
           them before they're gone!</p>
       </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (<Loading/>) : (
            products.length === 0 ? (
              <div className="text-center py-16">
                <ZapIcon className="size-16 text-app-border mx-auto mb-4"/>
                <h2 className="text-sm text-app-text-light ">No deals right now</h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {products.map((product)=> (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )
          )}
      </div>

    </div>
  )
}

export default Flashdeal
