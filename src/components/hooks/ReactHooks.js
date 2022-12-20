import {useEffect, useRef, useState} from "react";

export function useEffectNoFirstRender(effect, deps) {
    const initialRender = useRef(true)
    const f = () => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        return effect()
    }

    return useEffect(f, deps)
}

export const useDebounced = (value, ms) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, ms)

        return () => {
            clearTimeout(timer)
        }
    }, [value, ms])

    return debouncedValue
}