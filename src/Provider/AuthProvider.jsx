import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../Firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateUserProfile,
} from "firebase/auth";
import useAxios from "./../hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const [profileUpdating, setProfileUpdating] = useState(false);
  const githubProvider = new GithubAuthProvider();
  const axiosSecure = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const updateProfile = async (user, profileData) => {
    try {
      setProfileUpdating(true);
      await updateUserProfile(user, profileData);
      setProfileUpdating(false);
    } catch (error) {
      throw new Error("Failed to update profile: " + error.message);
    }
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const loggedUser = {
        email: currentUser?.email,
        username: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
      };
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axiosSecure
          .post("/jwt", loggedUser, { withCredentials: true })
          .then(() => {
            // console.log("Token:", res.data);
          });
      } else {
        axiosSecure
          .post("/logout", loggedUser, { withCredentials: true })
          .then(() => {
            // console.log("Token:", res.data);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosSecure]);
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    createUser,
    signInUser,
    loginWithGoogle,
    logOut,
    loading,
    updateProfile,
    loginWithGithub,
    profileUpdating,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
