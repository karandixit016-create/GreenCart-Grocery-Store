
import { Link } from 'react-router-dom';
import { BikeIcon } from 'lucide-react';
import { footerData } from '../assets/assets';



const Footer = () => {
  return (
    <footer className="bg-app-green text-white">
       <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8 py-12">
         {/* top */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15">
          {/* brand */}
          <div>
            <Link to='./' className='flex items-center font-semibold text-[28px] gap-2 mb-4'>
             <BikeIcon className='size-8' />
             <span>GreenCart</span>            
            </Link>
            
          <p>{footerData.brand.description}</p>
          <div className='flex gap-6 py-5'>
                {footerData.brand.socials.map((social,i)=>(
                    <a key={i} href={social.link} className='size-9 rounded-lg bg-white/10 flex-center hover:bg/white/2 '><social.icon className='size-5'/></a>
                ))}
          </div>
          </div>

           {/* dynamic setion */}
           {footerData.sections.map((section , i)=>(
            <div key={i}>
               <h3>{section.title}</h3>
               <ul className='space-y-2.5'>
                  {section.links.map((link,i)=>(
                      <li key={i}>
                         {link.to ? (
                            <Link to={link.to} className='text-sm text-white/70 hover:text-white'>
                                {link.label}
                            </Link>
                         ):(
                            <a href="link.href" className='text-sm text-white/70 hover:text-white'>{link.label}</a>
                         )}
                      </li>
                  ))}
               </ul>
            </div>
           ))}
           
           {/* contact */}
           <div className="text-sm font-semibold uppercase mb-4 gap-5">
            <h3>Contact Us</h3>
            <ul className='space-y-3'>
               {footerData.contact.map((item,i)=>{
                const Icon = item.icon;
                return(
                    <li key={i} className='flex gap-3 text-sm text-white/70'>
                       <Icon className='size-4 text-white'/> {item.text}
                    </li>
                )
               })}
            </ul>
           </div>

         </div>
         {/* bottom */}
         <div className='border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center'>
           <p className='text-md text-white/50'>{footerData.bottom.copyright}</p>
           <div className=' flex gap-4 '>
                {footerData.bottom.links.map((link,i)=>(
               <a href={link.href} key={i} className='text-md text-white/50 hover:text-white/90'>{link.label}</a>
             ))}
           </div>
         </div>
       </div>
    </footer>
  )
}

export default Footer