'use client'
import { useOnScreen } from '@/hooks/useOnScreen';
import useWindowPosition from '@/hooks/useWindowPositon';
import React, { MutableRefObject, useRef } from 'react'
import Navbar from './navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
// Create a ref to the loading element to check if it's visible
    const loadingRef = useRef<HTMLElement>(null);

     // Use custom hook to determine if an element is visible on the screen
    const isElementVisible = useOnScreen(loadingRef as MutableRefObject<HTMLElement>);

      // Get the window scroll position
    const position = useWindowPosition();
    
    const [offset, setOffset] = React.useState(1);

  // Increase offset on initial mount
    React.useEffect(() => {
        setOffset(prev => prev + 1);
    }, []);

    // Increase offset when loading element becomes visible
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