import { useEffect, useRef } from "react"

type MessageHandler = (msg: any) => void

export function useMessage(handler: MessageHandler){
    const handles = useRef(handler)
    handles.current = handler

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            if (event.data.pluginMessage) handles.current(event.data.pluginMessage)
        }

    
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener)
    }, [])

}