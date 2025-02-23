import { useState, useEffect} from 'react';

export type PropsType = {
    fontWeight: string | undefined
    textDecoration: string | undefined
    color: string | undefined
}

export type NavType = {
    showLinks: boolean
    setShowLinks: React.Dispatch<React.SetStateAction<boolean>>
}

export const useNavbar = () => {
    const [navBar, setNavBar] = useState<boolean>(false);

    useEffect(() => {
        const changeBackground = () => {
            if(window.scrollY >= 60) {
                setNavBar(true);
            } else {
                setNavBar(false);
            }
        };

        window.addEventListener('scroll', changeBackground);
        return () => window.removeEventListener('scroll', changeBackground);
    }, []);

    return { navBar };
};