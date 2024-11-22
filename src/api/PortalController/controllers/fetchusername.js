// import React from 'react';
// import {useApi} from "./hook/useApi";

// const User = () => {
//     const { userData, error, loading } = useApi();

//     // Function to determine the available name
//     const getAvailableName = () => {
//         if (!userData || !userData.name) return null;
//         return userData.name;
//     };

//     // Get the available name
//     const availableName = getAvailableName();

//     const getTimeOfDay = () => {
//         const hour = new Date().getHours();
//         if (hour < 12) {
//             return "morning";

            
//         } else if (hour < 18) {
//             return "afternoon";
//         } else {
//             return "evening";
//         }
//     };

//     // Get the greeting based on the time of the day
//     const greeting = getTimeOfDay();


//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching data: {error.message}</p>}
//             {availableName && (
//                 <div>
//                     <p> Good {greeting}, {availableName}!</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export { User };

import React from 'react';
import { useApi } from './hook/useApi';

const User = () => {
    const { userData, error, loading } = useApi();

    // Use username as the available name
    const availableName = userData ? userData.username : null;

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "morning";
        if (hour < 18) return "afternoon";
        return "evening";
    };

    // Get the greeting based on the time of day
    const greeting = getTimeOfDay();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {availableName && (
                <div>
                    <p>Good {greeting}, {availableName}!</p>
                </div>
            )}
        </div>
    );
};

export { User };
