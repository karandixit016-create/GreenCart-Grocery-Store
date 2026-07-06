import { herosectionData } from "../../assets/assets"

const Features = () => {
  return (
    <>
       <div className="bg-white py-3 border border-app-border/80 rounded-xl m-6">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-clos-2 md:grid-cols-4 gap-4">
               {herosectionData.hero_features.map((features ,i)=>(
                <div key={i} className="flex items-center gap-3 py-4">
                  <div className="size-10 rounded-lg bg-app-cream flex-center shrink-0">
                    <features.icon className="size-5" />                    
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-app-green">{features.title}</p>
                    <p className="text-xs text-app-text-light">{features.desc}</p>
                  </div>
                </div>
               ))}
           </div>
          </div>
        </div>    
    </>
  )
}

export default Features