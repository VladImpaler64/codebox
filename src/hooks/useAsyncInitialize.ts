import { useEffect, useState } from "react";
// This will update contract if change is made

export function useAsyncInitialize<T>(func: ()=> Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
    useEffect(()=>{
        (async ()=> {
            setState(await func())
        })()
    }, deps)

    return state
}
