
import { useState } from "react"
import { TruckIcon, ZapIcon, XIcon } from "lucide-react"


const Banner = () => {
 const [banner , setBanner] = useState( ()=> { 
    return sessionStorage.getItem('banner_dismissed') !== 'true';
   
 })

  const dissmissBanner = ()=>{
    setBanner(false)
sessionStorage.setItem('banner_dismissed', 'true')
  }

  return (
    <>
       {banner && (
        <div className="text-white relative bg-linear-to-r from-green-700 to-green-900 px-2 py-2 text-center overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8  flex items-center justify-center gap-4">
               <div className="flex items-center gap-2">
                <TruckIcon className="size-4 shrink-0"/>
                <span className=" font-medium ">Free delivery on orders over ₹99</span>
               </div>
                <span className="hidden md:inline text-white/40">|</span>
                <div className="hidden sm:flex items-center gap-3">
                     <ZapIcon className="size-4 fill-yellow-400 text-yellow-500 shrink-0"/> 
                                  
                <span className=" ">Farm-Fresh product delivered daily</span>
                </div>  

            </div>

            <button onClick={dissmissBanner} className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors" >
               <XIcon className= "size-2.5"/>            
            </button>
        </div>
       )}        
    </>
  )
}

export default Banner
