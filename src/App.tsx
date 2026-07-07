import { lazy} from "react";

import {Toaster} from 'react-hot-toast'
import {Route,Routes} from 'react-router-dom'
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Productpage = lazy(() => import("./pages/Productpage"));
const Flashdeal = lazy(() => import("./pages/Flashdeal"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const Products = lazy(() => import("./pages/Products"));

const App = () => {
  return (
    <>
    <Toaster position="top-right" toastOptions={{duration: 3000,style: { background: '#183022' , color:'#fff',borderRadius: '8px',padding: '16px',fontSize: '14px',
    }}} />
      <Routes>
             {/* { Auth pages - no navbar/footer  } */}
             <Route path = "/login" element={<Login />}/>
             
             {/* main-pages with Navbar and footer  */}
             <Route path = "/" element ={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path ="/products" element={<Products />} />
                <Route path ="/products/:id" element={<Productpage />} />
                <Route path ="/deals" element={<Flashdeal />} />
                
                <Route path ="/myorder" element={<MyOrder />} />

             </Route>


      </Routes>
    </>
  )
}

export default App
