import React, { useEffect } from 'react';

function Logout() {
    useEffect(() => {
        localStorage.clear()
    })

    return (
        <div>
            
        </div>
    );
}

export default Logout;