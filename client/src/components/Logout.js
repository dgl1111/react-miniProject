import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     localStorage.clear();
    //     navigate("/main");
    // })

   function fnLogout(){
        localStorage.clear();
        navigate("/main");
    }

    return (
        <div>
            <button onClick={fnLogout}></button>
        </div>
    );
}

export default Logout;