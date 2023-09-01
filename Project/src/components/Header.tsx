import {useCart} from '../hooks/useCart'
import { NavLink } from 'react-router-dom'
import { AiFillHeart } from "react-icons/ai";
import { ImCart } from "react-icons/im";
import { useState, useEffect, useRef } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

type PropsType = {
    fontWeight: string | undefined
    textDecoration: string | undefined
    color: string | undefined
}

type NavType = {
    showLinks: boolean
    setShowLinks: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({showLinks, setShowLinks}: NavType) => {
    const[navbar, setNavBar] = useState<boolean>(false)
    

    const menuRef = useRef<HTMLUListElement>(null)
    useEffect(() => {
        let handleClickOutsideDropDown = (e:MouseEvent | any) => {
            if(!menuRef.current?.contains(e.target)) {
                setShowLinks(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutsideDropDown)

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropDown)
        }
    },[]);

    const activeStyle: PropsType = {
        fontWeight: "bold",
        textDecoration: "none",
        color: "#A44849"
    }

    const handleResponsiveMenu = () => {
        setShowLinks(!showLinks)
    }

    const closeResponsiveMenu = () => {
        setShowLinks(false)
    }

    const menuIcon = !showLinks ? <RxHamburgerMenu/> : <RxCross2/>

    const{totalItems} = useCart()
    
    const changeBackground = () => {
        if(window.scrollY >= 60) {
            setNavBar(true)
        } else {
            setNavBar(false)
        }
    };

    window.addEventListener('scroll', changeBackground)

  return (
    <header 
        className={navbar ? 'nav-bar active': 'nav-bar'}
        id={showLinks ? 'responsive-nav' : ''}
        >
        <div  className='nav-responsive-btn' onClick={handleResponsiveMenu}>{menuIcon}</div>
        <div className='nav-logo'>
            <NavLink to="/">
                <h1>Shopping<span className='logo-span'>Spree</span></h1>
            </NavLink>
        </div>
        <div className='nav-links-cart'>
            <ul ref={menuRef} className='nav-items' id={showLinks ? 'hidden-nav' : 'hidden-nav-inactive'}>
                <li>
                    <NavLink 
                        to="/about"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                        className='nav-link'
                        onClick={closeResponsiveMenu}
                    >About</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                        className='nav-link'
                        onClick={closeResponsiveMenu}
                    >Contact</NavLink>
                </li>
                <li>
                    {
                        !showLinks
                        ?<NavLink to="/likes">
                        <button
                            className='nav-like-button'><AiFillHeart/>
                        </button>
                        </NavLink>
                        :<NavLink 
                            to="/likes" 
                            className='nav-link'
                            style={({isActive}) => isActive ? activeStyle : undefined}
                            onClick={closeResponsiveMenu}
                        >
                            Likes
                        </NavLink>
                    } 
                </li>
                <li>
                    {
                        showLinks && <NavLink 
                        to="/"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                        className='nav-link'
                        onClick={closeResponsiveMenu}
                    >Home</NavLink>
                    }
                </li>   
            </ul>
            <NavLink to="/cart">
                <div className='nav-cart-div'>
                    <div className='nav-cart-counter-div'>
                        <i><ImCart/></i>
                        <span className='total-items'>{totalItems}</span>
                    </div>
                </div>   
            </NavLink>
        </div>
        
        
    </header>
  )
}

export default Header