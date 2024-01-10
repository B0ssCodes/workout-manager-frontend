
import { WorkoutsContext } from '../context/WorkoutsContext';
import { useContext, useState } from 'react';

export const useWorkoutsContext = () => {
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(WorkoutsContext)

    if (!context){
        throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider')
    }

    // Wrap your context calls in a function that sets and clears the loading state
    const wrappedContext = {
        ...context,
        getWorkouts: async () => {
            setIsLoading(true);
            try {
                await context.getWorkouts();
            } finally {
                setIsLoading(false);
            }
        },
        // Repeat for other context functions as needed
    }

    return { ...wrappedContext, isLoading };
}