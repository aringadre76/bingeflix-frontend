import React from 'react';

function LoginButton() {
    return (
        <a href="http://localhost:4000/auth/google"
           className="fixed bg-transparent text-white text-xl font-bold top-4 right-7 rounded hover:bg-gray-400"
           style={{ zIndex: 30 }}>
            Login
        </a>
    );
}

export default LoginButton;
