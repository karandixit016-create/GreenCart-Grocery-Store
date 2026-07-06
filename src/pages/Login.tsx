import {useState} from 'react'
import { herosectionData} from '../assets/assets'
import { Link } from 
'react-router-dom'
import { BikeIcon , Loader2Icon, LockIcon , MailIcon, UserIcon } from 'lucide-react'


const Login = () => {
  const [login , setLogin] = useState(true)
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [loading , setLoading] = useState(false)

   const handelLogin = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault()
         setLoading(true)
         setTimeout(() => window.location.href = "/", 1000)
   }

  return (
    <>
          <div className = "min-h-screen flex">
             {/* left side */}
             <div className ="hidden lg:flex w-1/2
              bg-green-900 relative items-center justify-center">
                <img src={herosectionData.hero_image} alt="" className = "w-full h-full opacity-12 "/>
                <div className = "absolute text-center px-12">
                  <h2 className = "text-4xl font-semibold text-white mb-4">Welcome back to GreenCart </h2>
                  <p className = " text-lg text-gray-300">Fresh groceries and organic products,delivered to your door</p>
                </div>
             </div>

              {/* right side */}
              <div className =" flex-1 flex-center align-middle px-4 py-12 bg-cream-400">
                <div className ="w-full max-w-md">
                  {/* form header message  */}
                   <div className = "text-center mb-5">
                     <Link to = "/" className = "inline-flex items-center gap-2 mb-5" >
                      <BikeIcon className = "size-8 text-green-800"/>
                      <span className="text-2xl font-semibold text-green-900"> GreenCart </span>
                     </Link>

                      <h2 className = "text-2xl font-semibold text-gray-900 ">{login ? "Sign in to your account" : "Sign up for an account"}</h2>

                        <p className="text-sm text-app-text-light">
                          {login ? "Don't have an account?" : "Already have an account?"}
                           <button onClick={() => setLogin(!login)} className="text-orange-600 font-semibold ml-2 hover:text-orange-800 transition-colors">
                          {login ? "Create one" : "Sign up"}
                        </button>
                        </p>

                   </div>
                  {/* login / register form */}

                   <form onSubmit={handelLogin} className="space-y-4">
                     {!login && (
                      <label className="text-sm flex flex-col gap-1 mb-5">
                        Name
                        <div className="relative">
                          <UserIcon className='absolute left-3.5 top-1/8 translate-y-1/3 size-5 text-app-text-light'/>
                          <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Enter your name"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl  border not-focus:border-app-border transition-all " 
                          />
                        </div>
                      </label>
                      
                     )}
                      <label className="text-sm flex flex-col gap-1 mb-5">
                        Email
                        <div className="relative">
                          <MailIcon className='absolute left-3.5 top-1/8 translate-y-1/3 size-5 text-app-text-light'/>
                          <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter your Email"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl  border not-focus:border-app-border transition-all " 
                          />
                        </div>
                      </label>
                       <label className="text-sm flex flex-col gap-1 mb-5">
                        Password
                        <div className="relative">
                          <LockIcon className='absolute left-3.5 top-1/8 translate-y-1/3 size-5 text-app-text-light'/>
                          <input
                          type="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••••"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl  border not-focus:border-app-border transition-all " 
                          />
                        </div>
                      </label>
                      
                      <button type="submit" disabled={loading} className='w-full text-white bg-green-700 py-4 rounded-xl
                      font-semibold hover:bg-green-7900 transition-color disabled:opacity-50'>
                        {loading ? <Loader2Icon className="animate-spin"/> :
                        login ? "Sign In":"Sign Up"}
                      </button>

                    </form>

                </div>
              </div>

          </div>
    </>
  )
}

export default Login