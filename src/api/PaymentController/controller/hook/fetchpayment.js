import React from "react";
import { useApi } from "./useApi";
const userPayments = () => {
    const { userData, error, loading,  } = useApi();


    return (
        <div>
            <p>Your reciepts</p>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching data: {error.message}</p>}
                {userData && userData(reciept => (
                    <div key={reciept.id} className="card">


                    </div>
                ))}
            </div>
        </div>
    );
};

export default userPayments;
