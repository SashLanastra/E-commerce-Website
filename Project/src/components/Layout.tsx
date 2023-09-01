import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useState } from 'react'

const Layout = () => {
  const[showLinks, setShowLinks] = useState<boolean>(false)
  

  showLinks ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  return (
    <div className='site-wrapper'>
        <Header showLinks={showLinks} setShowLinks={setShowLinks}/>
        <main className={showLinks ? 'responsive-nav-active': ''}>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout