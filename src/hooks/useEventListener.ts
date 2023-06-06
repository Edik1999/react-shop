import {useEffect} from 'react';

export function useEventListener(event: string, cb: (arg0: any) => void, isOpen: boolean, el = window) {
    useEffect(() => {
        const handle = (e: any) => cb(e)

        if (isOpen) el.addEventListener(event, handle)

        return () => el.removeEventListener(event, handle)

    }, [event, cb, isOpen, el])
}