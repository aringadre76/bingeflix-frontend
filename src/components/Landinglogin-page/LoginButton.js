import React from 'react';

function LoginButton() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("Backend URL:", backendUrl);
    
    const handleLogin = (e) => {
        if (!backendUrl) {
            e.preventDefault();
            console.error("Backend URL is not defined!");
            alert("Configuration error: Backend URL is not defined");
            return;
        }
        console.log("Attempting login with:", `${backendUrl}/auth/google`);
    };

    return (
        <a href={`${backendUrl}/auth/google`}
            onClick={handleLogin}
            className="fixed bg-transparent text-white text-xl font-bold top-4 right-7 rounded hover:bg-gray-400"
            style={{ zIndex: 30 }}>
            Login
        </a>
    );
}

export default LoginButton;
