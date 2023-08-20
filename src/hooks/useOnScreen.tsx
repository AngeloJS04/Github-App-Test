import { useState, useEffect, MutableRefObject } from "react";


export const useOnScreen = (ref: MutableRefObject<HTMLElement>) => {

    const [isIntersecting, setIntersecting] = useState(false)

    if (typeof window === "undefined" || IntersectionObserver === undefined) return;
    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        observer?.observe(ref?.current!)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
}