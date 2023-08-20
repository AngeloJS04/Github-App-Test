import React, { useState } from 'react';

// Custom hook to track the current window scroll position
export default function useWindowPosition() {
    const [scrollPosition, setPosition] = useState(0);

    
    // Use an effect hook based on the environment (client or server)
    useIsomorphicLayoutEffect(() => {
              // Update scroll position when the user scrolls
        function updatePosition() {
            setPosition(window.pageYOffset);
        }

         // Attach scroll event listener and initial update
        window.addEventListener('scroll', updatePosition);
        updatePosition();

        // Remove the event listener when the component unmounts
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);  // Empty dependency array ensures effect only runs once
    return scrollPosition; // Return the current scroll position
}

import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;