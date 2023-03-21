import { useState, useEffect } from 'react';

function useAnimationState (){
    const [animationState, setAnimationState] = useState(false);

    useEffect(() => {
        setAnimationState(true)
        return () => {
            setAnimationState(false)
        };
    }, []);

    return animationState;
}

export default useAnimationState;