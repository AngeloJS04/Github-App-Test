
import { useEffect, useState } from 'react'

// Custom hook for debouncing a value
export function useDebounce<T>(value: T, delay?: number): T {
        // State to hold the debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // Set a timer to update the debounced value after the specified delay
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        // Clear the timer if the effect is cleaned up before the delay elapses
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue // Return the debounced value
}