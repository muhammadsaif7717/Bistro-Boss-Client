import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from '../Firebase/firebase.config'

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create new user
    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update profile
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:photo
        })
    }

    // logout user
    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    //observe user 
    useEffect(() => {
       const unsubscribe= onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
           console.log('Current User', currentUser)
           setLoading(false)
       })
       return () => unsubscribe();
    },[])

    const authInfo = {
        user,
        loading,
        createNewUser,
        loginUser,
        updateUserProfile,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;