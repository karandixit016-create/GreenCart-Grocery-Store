
import { MailIcon } from 'lucide-react';


const NewsLetter = () => {
  return (
    <section className=" max-w-6xl bg-white py-18 px-4 sm:px-8 rounded-3xl mx-auto shadow-xs mt-16 mb-20">
       <div className="max-w-2xl mx-auto text-center"> 
          <div className='size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow'>
            <MailIcon className='size-7 text-app-green' strokeWidth={1.5}/>
          </div>
          <h2 className='font-semibold text-app-green mb-4 text-3xl '>Subscribe to our Newsletter</h2>
          <p className='text-app-text-light mb-8 text-base'>Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your
            inbox.</p>
            
            <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
                <input type="email" placeholder='Enter your email address' className='flex-1 px-5 py-3.5 rounded-xl border border-app-border focus:border-app-green focus:ring text-sm transition-all'/>

                <button className='bg-app-green text-white px-8 py-3.5 font-semibold rounded-xl hover:bg-app-green-light transition-color shadow-sm whitespace-nowrap active:scale-[0.98]' type='submit'>Suscribe</button>
            </form>
       </div>
    </section>
  )
}

export default NewsLetter