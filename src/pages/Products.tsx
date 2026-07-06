import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import type { Product } from "../types";
import { categoriesData, dummyProducts } from "../assets/assets";
import { ChevronDown, Home, SlidersHorizontal, XIcon } from "lucide-react";
import ProductCard from "../components/Home.tsx/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";


const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([])
  const [ loading, setLoading] = useState(true)
  const [totalPage] = useState(1);
  const [mobileFiltersOpen, setMobileFilterOpen] = useState(false);
  
  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = searchParams.get("page") || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const updateFilter = (key:string, value:string)=> {
    const newParams = new URLSearchParams(searchParams)
     if(value){
      newParams.set(key,value)
     }
     else{
      newParams.delete(key)
     }
     if(key !== "page"){
      newParams.delete("page")
     }
     setSearchParams(newParams)
  }

  const clearFilter = ()=> setSearchParams({})

  const activeCategory = categoriesData.find((c)=> c.slug === category);
  const hasFilters = category || organic || minPrice || maxPrice;


  useEffect(()=> {
    const fetchProducts = async ()=> {
      setLoading(true)
      setProducts(dummyProducts.filter((p)=> p.category === category || category === ""));
      setLoading(false)
    }

    fetchProducts()
  },[category, organic, sort, page, minPrice, maxPrice] )

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl max-auto px-4 sm:px-6 lg:px-8 py-6 ">
        {/* breadcrumb */}
         <nav className="flex items-center gap-2 px-4 text-md text-app-text-dark mb-8">
          <Link to="/" className="hover:text-app-green transition-colors ">
            <Home className="size-4" />          
          </Link>
          <span>/</span>
          <span>{activeCategory ? activeCategory.name : "All Products"}</span>
         </nav>

         <div className="flex gap-8 xl-gap-10">
          {/*sidebar - desktop */}
            <aside className="hidden lg:block w-64 shrink-0"> 
              <div className="bg-white rounded-2xl p-4 sticky-0 top-24">
                 <FilterPanel
                  categories={categoriesData}
                  category={category}
                   organic={organic} 
                   minPrice={minPrice}
                    maxPrice={maxPrice}
                     updateFilter={updateFilter}
                      clearFilter={clearFilter} 
                      hasFilters={hasFilters} 
                       />
          
              </div>
            </aside>
          {/* main content */}
          <main className="flex-1">
            {/* header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-app-green">{activeCategory ? activeCategory.name : "All Products"}</h1>
                <p className="text-sm text-app-text-light mt-0.5">{products.length} Product found</p>
              </div>

              <div className="flex flex-col lg:items-center gap-3">
                {/* mobile filter toggle */}
                <button onClick={()=> setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-3 py-2 mt-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors ">
                  <SlidersHorizontal  className="size-4" /> Filters
                </button>

                {/* sort */}
                <div className="relative">
                  <select value={sort} onChange={(e)=> updateFilter("sort", e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer ">
                     <option value="">Newest</option>
                     <option value="price_asc">Price: low → high</option>
                     <option value="price_desc">Price: high → low</option>
                     <option value="rating">Top Rated</option>
                     <option value="name">A → Z </option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 text-app-light pointer-event-none"/>
                </div>
              </div>
            </div>

            {/* product grid */}
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
               <div className="text-center py-16"> 
                 <p className="text-lg font-semibold text-app-green mb-2">No Product Found</p>
                 <p className="text-sm text-app-text-light mb-4">Try adjusting your filter or search terms</p>
                 <button onClick={clearFilter} className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-xl hover:bg-app-green-light transition-colors">Clear Filter</button>
               </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl-gap-8">
                {products.map((product)=> product.stock > 0 && (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
            {/* pagination  */}
            {totalPage > 1 && (
              <div className="flex-center gap-2 mt-16 " >
                {Array.from({length: totalPage}).map((_,i)=>(
                  <button key={i}
                  onClick={()=> {updateFilter("page", String(i+1)); scrollTo(0,0)}}
                   className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i+1 ? "bg-app-green text-white" : "bg-white text-app-text-green hover:bg-app-cream" }`}>
                    {i+1}
                  </button>
                ))}
              </div>
            )}
          </main>
         </div>
      </div>

      {/* mobile filter modal  */}
      {mobileFiltersOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 " onClick={()=> setMobileFilterOpen(false)} />   

          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-2xl mac-h-[80vh] overflow-y-auto animate-slide-in-up ">

              <div className="flex items-center justify-between p-4 border-b border-app-border">
                <h3 className="text-lg font-semibold text-app-green"> Filter</h3>
                <button onClick={()=> setMobileFilterOpen(false)}
                 className="hover:bg-app-green rounded-lg ">
                  <XIcon className="size-5" />
                </button>
              </div>
              
              <div className="p-4">
                 <FilterPanel
                  categories={categoriesData}
                  category={category}
                   organic={organic} 
                   minPrice={minPrice}
                    maxPrice={maxPrice}
                     updateFilter={updateFilter}
                      clearFilter={clearFilter} 
                      hasFilters={hasFilters} 
                       />
              </div>

          </div>
        </>
      )}
    </div>
  )
}

export default Products




