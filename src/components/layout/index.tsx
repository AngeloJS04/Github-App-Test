'use client'
import { useOnScreen } from '@/hooks/useOnScreen';
import useWindowPosition from '@/hooks/useWindowPositon';
import React, { MutableRefObject, useRef } from 'react'
import Navbar from './navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {

    const loadingRef = useRef<HTMLElement>(null);
    const isElementVisible = useOnScreen(loadingRef as MutableRefObject<HTMLElement>);
    const position = useWindowPosition();
    
    const [offset, setOffset] = React.useState(1);

    React.useEffect(() => {
        setOffset(prev => prev + 1);
    }, []);
    React.useEffect(() => {
        if (isElementVisible && position > 0) {
     
            setOffset(prev => prev + 1);
        }
    }, [isElementVisible]);

    return (
        <div>
            <Navbar offset={offset} />
            <div  className='m-10 md:m-20'>
                {children}
                <span ref={loadingRef}></span>
            </div>
        </div>
    )
}

export default Layout