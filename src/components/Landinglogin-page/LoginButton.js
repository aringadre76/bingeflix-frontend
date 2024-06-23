import React from 'react';

function LoginButton() {
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL); // Check if this logs correctly
    return (
        <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
            className="fixed bg-transparent text-white text-xl font-bold top-4 right-7 rounded hover:bg-gray-400"
            style={{ zIndex: 30 }}>
            Login 2
        </a>
    );
}

export default LoginButton;
