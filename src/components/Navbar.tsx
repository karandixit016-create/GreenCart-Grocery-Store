    import { Link , useNavigate } from "react-router-dom";
    import React, {useState} from "react"
    import { BikeIcon , SearchIcon,ShoppingCartIcon,ChevronDownIcon , UserIcon, XIcon, MenuIcon, PackageIcon, ArrowUpRightIcon, LogOutIcon} from "lucide-react";
import { useCart } from "../context/CartContext";

  const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = {
    name : "Karan Dixit",
    email : "Karan280@gmail.com",
    isAdmin : true
  }
  
  const { cartCount, setIsCartOpen } = useCart()
    

    const [searchQuery , setSearchQuery] = useState("")
    const [ userMenuOpen , setUserMenuOpen] = useState(false)
    const navigate = useNavigate()        
    
    const handleSearch = (e:React.SubmitEvent) => {
           e.preventDefault()
           if(searchQuery.trim()){
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery("")
           }
    }
    const handleLogout = () =>{
      setUserMenuOpen(false)
      navigate('/')
    }

    return (
      <>
            <nav className="bg-white sticky top-0 z-50 border-b border-app-border ">
              <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 flex items-center justify-between gap-4 h-16">
                  {/* logo */}
                  <Link to='/' className = "flex items-center gap-2 text-[22px] font-medium shrink-0 ml-4">
                  <BikeIcon size={24}/>GreenCart
                  </Link>
                  <div className="flex items-center justify-end gap-4 lg:gap-10 w-full">
                    {/* Navbar for desktop  */}
                    <div className="hidden md:flex items-center gap-6 text-md text-zinc-700">
                      <Link to="/">Home</Link>
                      <Link to="/products">Product</Link>
                      <Link to="/deals" className="text-orange-500">Deals</Link>
                    </div>
                    {/* seacrh */}

                    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm ">
                      <div className="relative w-full">
                        <SearchIcon  className="absolute size-4 left-2.5 top-1/2  -translate-y-1/2 text-zinc-700" />
                        <input type="text"
                          placeholder="Search for groceries....."
                          // value={searchQuery}
                          // onChange={(e)=>setsearchQuery(e.target.value)}
                          className=" w-full pl-10 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange-/30"/>
                      </div>
                    </form>
                      
                      {/* right action */}
                      <div className="flex items-center gap-4">
                          {/* cart */}
                        <button className="relative p-3 rounded-xl" onClick={()=> setIsCartOpen(true)} >
                                <ShoppingCartIcon className="size-5 text-zinc-900 "/>
                                {cartCount > 0 && <span className="absolute top-1 right-1 
                                  rounded-full bg-app-orange size-3.5 text-white text-[10px]">{cartCount}</span>}
                          </button>
                          
                          {/* user */}
                          
                            <div onClick={()=>setUserMenuOpen(!userMenuOpen)} className="relative">
                              {user ?
                              (
                                  <button className="flex items-center gay-2 p-3">
                                    <div className="size-7 rounded-full bg-green-700 text-white flex-center">
                                      {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDownIcon className="size-3 text-zinc-800"/>
                                  </button>
                              ):
                              (
                                  <div className="flex-center gap-2">
                                      <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 tezt-sm font-medium text-white bg-green-900 rounded-full transition-colors hover:bg-green-800 transition-color">
                                      <UserIcon size={16}/>Sign In
                                      </Link>
                                      {userMenuOpen ? <XIcon className="md:hidden" onClick={()=>setUserMenuOpen(!userMenuOpen)}/> :
                                        <MenuIcon className="md:hidden " onClick={()=> setUserMenuOpen(!userMenuOpen)}/> } 
                                  </div>
                              )}
                              {userMenuOpen && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={()=> setUserMenuOpen(false)} />
                                    
                                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                                    {user && (
                                        <div className="px-4 py-2 border-b border-app-border">
                                            <p className="text-sm font-medium text-zinc-500">{user?.name}</p>
                                            <p className="text-xs text-zinc-800">{user?.email}</p>
                                        </div>
                                        )}
                                        <div onClick={()=>setUserMenuOpen(false)}>
                                            {!user && <Link to='/login' className="dropdown-link md:hidden"><UserIcon size={16}/>Sign In</Link> }
                                            
                                              {user && <Link to='/myorder' className="dropdown-link md:hidden"><PackageIcon size={16}/>My Order</Link> }


                                            <Link to='/products' className="dropdown-link md:hidden"><ArrowUpRightIcon size={16}/>Products</Link>
                                            
                                            <Link to='/deals' className="dropdown-link md:hidden"><ArrowUpRightIcon size={16}/>Deals</Link>

                                            {user && (
                                              <div className="border-t border-app-border pt-1"> 
                                                <button onClick={handleLogout} className="flex items-center gap-3 py-2.5 px-4 text-sm text-app-error hover:bg-red-50 w-full transition-colors ">
                                                    <LogOutIcon size={16} />Logout
                                                </button>
                                              </div>
                                            )}

                                        </div> 
                                    </div>                       
                                  </>
                              )}
                              
                            </div>
                      </div>
                  </div>
              </div>
            </nav>
      </>
    )
  }



  export default Navbar