import React, { useState } from 'react';
import { auth, provider } from './firebase';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            await auth.signInWithPopup(provider);
            navigate('/photo-list');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setError('Error signing in with Google. Please try again.');
        }
    };

    const handleEmailSignIn = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/photo-list');
        } catch (error) {
            console.error('Email Sign-In Error:', error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        // <div>
        //     <h2>Login</h2>
        //     <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        //     <br />
        //     <br />
        //     <div>
        //         <label>Email:</label>
        //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     </div>
        //     <div>
        //         <label>Password:</label>
        //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     </div>
        //     <button onClick={handleEmailSignIn}>Sign In with Email</button>
        // </div>
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col bg-white w-full max-w-sm p-6 rounded-md shadow-md items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <div className="flex items-center mb-4">
                    <div className="flex-1 border-t-2 border-gray-300"></div>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                        <button
                            className="w-full bg-green-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={handleEmailSignIn}
                        >
                            Log In
                        </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
