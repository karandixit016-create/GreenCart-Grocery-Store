import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext";
import type { Order } from "../types"
import { Link, useSearchParams } from "react-router-dom";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import Loading from "../components/Loading";
import { CalendarIcon, ChevronRightIcon, PackageIcon } from "lucide-react";

const Myorder = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$" ;

  const [order , setOrder] = useState<Order[]>([])
  const [loading , setLoading] = useState(true)
  const [activeTab , setActiveTab] = useState('All')
  const [searchParams , setSearchParams] = useSearchParams('all')

  const tabs = [
    "All",
    "Placed",
    "Out For delivery ",
    "Delivery"
  ]
  const {clearCart} = useCart()
 
  const fetchOrder = async ()=> {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       setOrder(dummyDashboardOrdersData as any)
  }
  useEffect(()=>{
    if(searchParams.get("clearCart")){
      clearCart();
      setSearchParams({});
      setTimeout(()=>{
        fetchOrder()
      }, 2000 )
    }else{
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOrder()
    }
    setLoading(false)
  },[activeTab, clearCart, searchParams, setSearchParams])

  return (
    <div className="min-h-screen bg-app-cream mb-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <h1 className="text-2xl font-semoiold text-app-green mb-6">
          My Order
        </h1>

        {/* tabs */}
         <div className="flex gap-2 mb-6 overflow-x-auto pb-2 ">
          {tabs.map((tab)=>(
            <button key={tab} 
          onClick={()=> setActiveTab(tab)}
          className={`px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors
           ${activeTab === tab ? 
           "bg-app-green text-white" : 
           "bg-white text-app-text-light hover:bg-app-cream "}`} >
            {tab === 'all' ? "All Orders" : tab }
          </button>
          ))}
         </div>
        {/* order list  */}
        {loading ? (
        <Loading />
        ) : order.length === 0 ? (
           <div className="text-center py-16">
              <PackageIcon className="size-16 text-border mx-auto mb-4"/>
              <h2 className="text-lg text-app-green font-medium">No order yet</h2>
              <p className="text-sm text-app-text-light mb-4 ">Start shopping to see your order here </p>
              <Link to="/products" 
              className="inline-flex px-4 py-2 bg-app-green text-white text-sm rounded-lg">
                Start Shopping
              </Link>
            </div>
        ) : (
          <div className="space-y-4">
            {order.map((order)=>(
              <Link to={`/orders/${order._id}`}
              key={order._id}
              className="block max-w-4xl bg-white rounded-2xl p-5 hover:shadow transition-all"
              >
               {/* order id , data & status */}
                <div className="flex items-start justify-between mb-3">
                  {/* left */}
                   <div>
                    <p className="text-sm font-medium text-app-green">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <div className="flex items-center gap-2 mt-2 ">
                      <CalendarIcon className="size-4 text-app-text-light"/>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {month:'short', day:"numeric", year:"numeric"})}
                      </span>
                    </div>
                   </div>
                  {/* right */}
                   <div className="flex items-center gap-2 ">
                    <span className={`px-4 py-1 text-sm font-medium rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700 "}`}>
                      {order.status}
                      </span>
                      <ChevronRightIcon className="size-4 text-app-text-light" />
                   </div>
                </div>
               {/* item thumbnails */}
                 <div className="flex items-center gap-2 mb-3">
                  {order.items.slice(0,4).map((item,i)=>(
                    <img src={item.image} alt={item.name} key={i} 
                    className="size-12 sm:size-16 rounded:lg object-cover border border-app-border" />
                  ))}
                  {order.items.length > 4 && 
                     <div className="size-12 rounded-lg bg-app-cream flex-center text-xs font-semibold text-app-text-light">
                        +{order.items.length - 4}
                    </div>
                  }
                 </div>
               {/* total items & price */}
                <div className="flex items-center justify-between pt-3 text-sm  ">
                  <span className="text-app-text-green">{order.items.length} items</span>
                  
                  <span className="text-app-text-green font-semibold ">
                         {currency}{order.total.toFixed(2)}
                  </span>
                </div>

              </Link>
            ))}
          </div>
        )
      }
      </div>
   </div>
  )
}

export default Myorder
