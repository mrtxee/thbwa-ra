import {useEffect, useRef} from "react";

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