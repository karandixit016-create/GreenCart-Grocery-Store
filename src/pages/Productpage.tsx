/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowLeftIcon, ArrowRightIcon, Home, LeafIcon, MinusIcon, PlusIcon,  ShoppingCartIcon, StarIcon } from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/Home.tsx/ProductCard";

const ProductPage = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { id } = useParams()
  const navigate = useNavigate()
  const {
  items,
  addToCart,
  removeFromCart,
  updateQuantity
} = useCart();

  const [relatedProducts , setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [localQuantity , setLocalQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null >(null)

  useEffect(()=> {
     setLoading(true)
     setLocalQuantity(1)
     window.scrollTo(0,0)
     const product = dummyProducts.find((p)=> p._id === id )
     setProduct(product!)
     setRelatedProducts(dummyProducts.filter((p)=> p._id !== id ))
     setLoading(false)
  },[id])

  if(loading) return <Loading />
  if(!product) return null;

  const cartItem = items.find((item)=> item.product._id === product._id)
  const inCart = !!cartItem;
  const displayQualitiy = inCart ? cartItem.quantity : localQuantity

  const categoryLabel = product.category.replace(/-/g,"")

  const handleMinus = ()=>{
    if(inCart){
      if(cartItem.quantity > 1) updateQuantity( product._id, cartItem.quantity - 1)
        else removeFromCart(product._id)
    }
    else{
      setLocalQuantity(Math.max(1, localQuantity-1))
    }
  }

  const handlePlus = ()=>{
    if(inCart) updateQuantity(product._id , cartItem.quantity + 1)
      else setLocalQuantity(localQuantity + 1)
  }

  return (
    <div className="min-h-screen">

     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         {/* breadcrumbs */}
         <nav className="flex items-center text-app-text-light gap-2 text-sm mb-6 "> 
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4"/>          
          </Link>
          <span>/</span>
           <Link to="/products" className="hover:text-app-green transition-colors">
            Products          
          </Link>
          <span>/</span>
           <Link to={`/products?category=${product.category}`} className="hover:text-app-green transition-colors capitalize">
                     {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-[200px]">{product.name}</span>
         </nav>
         
         {/* back button */}
          <button onClick={()=> navigate(-1)}
           className="flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-text-dark mb-6 ">
            <ArrowLeftIcon className="size-4" />Back
          </button>

         {/* product detail section  */}
          
         <div className="bg-white/80 rounded-2xl overflow-hidden ">
           <div className="grid md:grid-cols-2 gap-0 ">  
             {/* leftside */}
             <div className="relative flex-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
               <img src={product.image} alt={product.name} className="max-h-[320px] w-auto object-contain" />

                {/* badges */}
             <div className=" absolute top-5 left-5 flex flex-wrap gap-1.5">
              {product.isOrganic && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full  ">
                 <LeafIcon className="w-3 h-3"/> 
                 Organic
                </span>
              )}
              {product.discount > 0 && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full  "> 
                 {product.discount}%OFF
                </span>
              )}
             </div>
             
             </div>

           {/* right side details */}
             <div className=" p-6 md:p-6 flex flex-col justify-center">
                 <span className="text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize">{product.category}</span>

                 <h1 className="text-2xl md:text-3xl font-semibold text-app-text-green mb-3">{product.name}</h1>

                 {/* rating */}
                 {product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-5 ">
                    <div className="flex items-center gap-0.5">{[1, 2 , 3 , 4 , 5 ].map((star)=> 
                      <StarIcon key={star}
                       className={`w-3 h-6 
                       ${star <= Math.round(product.rating) ?
                        " fill-app-warning text-app-warning " : 
                        "text-app-border"}`} /> )}
                      </div>

                    <span className="text-md font-medium">{product.rating}</span>

                    <span className="text-sm text-app-text-light">({product.reviewCount}review)</span>
                  </div>
                 )}
                 {/* price */}
                 <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl md:text-4xl text-app-green font-semibold">{currency}{product.price.toFixed(2)}</span>
                   {product.originalPrice > product.price && (
                    <span className="text-lg text-app-text-light line-through">{currency}{product.originalPrice.toFixed(2)}</span>
                   )}
                 </div>
                 {/* description */}
                 <p className="text-sm text-app-text-light leading-relaxed mb-6">
                  {product.description}
                 </p>

                 {/* stock */}
                 <div>
                   {product.stock > 0 ? (
                     <span className="text-sm text-app-success font-medium">
                     ✓ In Stock ({product.stock} avilable)
                     </span>
                   ):(
                     <span className="text-sm text-app-error font-medium">
                      Out of Stock
                     </span>
                   )}
                 </div>

               {/* Quantitiy + AddToCart */}
                <div className="flex items-center gap-3 mt-5 ">
                  {/* Quantity */}
                  <div className='flex items-center border border-app-border rounded-xl overflow-hidden'>
                    <button onClick={handleMinus}
                    className=" p-3 hover:bg-app-cream transition-colors">
                      <MinusIcon className="w-4 h-4"/>
                    </button>
                    <span className="px-5 text-sm font-semibold min-w-[40px] text-center">{displayQualitiy}</span>
                    <button onClick={handlePlus}
                     className="p-3 hover:bg-app-cream transition-colors">
                      <PlusIcon className="w-4 h-4 "/>
                    </button>

                  </div>
                  {/* add to cart  */}
                  <button onClick={()=>{
                    if(!inCart) addToCart(product, localQuantity)
                  }}
                  disabled={product.stock === 0}
                   className={`flex-1 py-3 font-semibold 
                  rounded-xl transition-colors flex-center gap-2
                   disable:opacity-50 disable:cursor-not-allowed
                   active:scale-[0.98] 
                   ${inCart ? 
                  "bg-app-cream text-app-green border border-app-cream" : 
                  "bg-app-orange text-white hover:bg-app-orange-dark"
                  }`}>
                     <ShoppingCartIcon className="w-4 h-4" />
                     {inCart ? "Added to cart" : "Add to cart"}
                  </button>
                </div>

             </div>


           </div>
         </div>

         {/* costumer review section */}
         {product.reviewCount > 0 && <DummyReviewsSection product={product}/>}
         
         {/* related products */}
           {relatedProducts.length > 0 && (
            <section className="mt-12 mb-44">
              <div className="flex items-center justify-between mb-6">
                <div >
                  <h2 className="font-semibold text-2xl text-app-green ">Related Product</h2>
                  <p className="text-sm text-app-text-light mt-1">More from {categoryLabel}</p>
                </div>
                <Link className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors  " 
                to={`/products?category=${product.category}`}>
                  View All <ArrowRightIcon className="size-4"/> 
                </Link>
              </div>

              <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
                 {relatedProducts.slice(0,5).map((rp)=> (
                  <ProductCard key={rp._id} product={rp}/>
                 ))}
              </div>
            </section>
           )}


     </div>
      
    </div>
  )
}

export default ProductPage
