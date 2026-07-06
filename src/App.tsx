import {Toaster} from 'react-hot-toast'
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AppLayout from './pages/AppLayout'
import Productpage from './pages/Productpage'
import Flashdeal from './pages/Flashdeal'

import MyOrder from './pages/MyOrder'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/Products'

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
                <Route element={< ProtectedRoute />}>
                  <Route path ="/myorder" element={<MyOrder />} />
                </Route>

             </Route>


      </Routes>
    </>
  )
}

export default App
