import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";

const Profile = () => {

    const navigate = useNavigate();

    useEffect( () => {
    
        async function fetchData() {
            const response = await APIInvoke.invokePOST(`/auth/verify`, {} );

            if( response.error !== undefined ){
                navigate('/login');
                return;
            }

            document.getElementById("user").innerHTML = response.data.name;
        }

        fetchData();

    }, []);


    return ( 
        <div>
            Hello <span id="user"></span>
        </div>
    );
}

export default Profile;
