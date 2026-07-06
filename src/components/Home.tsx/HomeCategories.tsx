  import { Link } from "react-router-dom"
  import { categoriesData } from "../../assets/assets"



  const HomeCategories = () => {
    return (
      <section className="py-20 m-4">
        <div className="max-w-7xl mx-auto ">
            <div>
              <h2 className="text-2xl font-semibold">Browser Categories</h2>
              <p className="text-sm text-app-light mt-1">Find excatly what you need to useing</p>
            </div>
            <div className="flex items-center overflow-x-scroll mt-8 no-scrollbar">
                {categoriesData.map((cat) => (
                   <Link 
                   key={cat.slug}
                   to={`/products?category=${cat.slug}`}
                   onClick={()=>window.scrollTo(0,0) } 
                   className="group flex items-center flex-col gap-4 p-3"> 
                    <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/45 transition-all">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-contain rounded-full transition-all" />
                    </div>
                    <span className="text-xs font-medium text-zinc-600 text-center leading-tight">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>
    )
  }

  export default HomeCategories
