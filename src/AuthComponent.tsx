import React from 'react';
import { auth, provider } from './firebase';

const AuthComponent: React.FC = () => {
    const handleSignIn = async () => {
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            {auth.currentUser ? (
                <>
                    <p>Welcome, {auth.currentUser.displayName}!</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <button onClick={handleSignIn}>Sign In with Google</button>
            )}
        </div>
    );
};

export default AuthComponent;
