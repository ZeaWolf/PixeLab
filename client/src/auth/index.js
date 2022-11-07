import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    ERROR_MODAL: "ERROR_MODAL",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    FORGOT_PASSWORD: "FORGET_PASSWORD",
    RESET_PASSWORD: "RESET_PASSWORD",
    CONTINUE_AS_GUEST: "CONTINUE_AS_GUEST",
    GUEST_MODAL: "GUEST_MODAL",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        message: "",
        currentScreen: "welcomeScreen",
        guestModal: false,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: auth.currentScreen,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: "weclomeScreen",
                })
            }
            // part 1
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: "homeScreen",
                })
            }
            // part 2
            case AuthActionType.ERROR_MODAL:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    message: payload.message,
                    currentScreen: auth.currentScreen,
                })
            }
            // part 4
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: "welcomeScreen",
                })
            }
            case AuthActionType.FORGOT_PASSWORD:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    message: payload.message,
                    currentScreen: auth.currentScreen,
                })
            }
            case AuthActionType.RESET_PASSWORD:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    message: payload.message,
                    currentScreen: auth.currentScreen,
                })
            }

            // change screen
            case AuthActionType.CHANGE_SCREEN:{
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: payload.screen,
                })
            }

            case AuthActionType.CONTINUE_AS_GUEST:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: payload.screen,
                })
            }

            case AuthActionType.GUEST_MODAL:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: auth.error,
                    message: auth.message,
                    currentScreen: auth.currentScreen,
                    guestModal: payload.guestModal
                })
            }

            default:
                return auth;
        }
    }

    //change screen depending on the navigation button
    auth.changeScreen = function (screen, store){
        authReducer({
            type: AuthActionType.CHANGE_SCREEN,
            payload:{
                screen: screen,
            }
        })
        // store.loadIdNamePairs({screen: screen});
    }


    // part 1
    auth.loginUser = async function (userData, store){
        try{
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                console.log(response);
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: response.data.loggedIn
                    }
                })
                history.push("/home/");
                store.loadTilesets();
                // store.loadMaps();
            }
        }catch(err){
            // part 2
            const message = err.response.data.errorMessage;
            auth.showErrorModal(message);
        }
    }

    auth.showErrorModal = async function(message) {
        authReducer({
            type: AuthActionType.ERROR_MODAL,
            payload: {
                error: true,
                message: message
            }
        })
    }
    auth.closeErrorModal = async function() {
        authReducer({
            type: AuthActionType.ERROR_MODAL,
            payload: {
                error: false,
                message: null
            }
        })
    }

    // part 4
    auth.logoutUser = async function(store){
        try{
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload:{
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                })
            }
            history.push("/");
            // store.closeCurrentList();
        }catch(err){
            console.log(err);
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                console.log(response);
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }catch(err){
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    user: null,
                    loggedIn: false
                }
            })
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/login/");
            }
        }catch(err){
            // part 2
            const message = err.response.data.errorMessage;
            auth.showErrorModal(message);
        }
    }

    auth.forgotPassword = async function(userData){
        try{
            const response = await api.forgotPassword(userData);   
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.FORGOT_PASSWORD,
                    payload: {
                    }
                })
                auth.showErrorModal("Password reset link is sent to your email!");
            }
        }catch(err){
            const message = err.response.data.errorMessage;
            auth.showErrorModal(message);
        }
    }

    auth.resetPassword = async function(userData){
        //try{
            console.log("LOVE") 
            let queryString = window.location.search;
            queryString = queryString.replace('?','');
            let queryParam = new URLSearchParams(queryString);
            const token = queryParam.get('token');
            const id = queryParam.get('id');
            const query = {token:token, id:id};
            const response = await api.resetPassword(userData, query);  
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.RESET_PASSWORD,
                    payload: {
                    }
                })
                auth.showErrorModal("Password has been reset!");
            }
        // }catch(err){
        //     const message = err.response.data.errorMessage;
        //     auth.showErrorModal(message);
        // }
    }

    auth.OpenGuestModal = function() {
        console.log("Nihao!!");
        authReducer({
            type: AuthActionType.GUEST_MODAL,
            payload: {
                guestModal: true,
            }
        })
        console.log("Nihao!! "+ auth.guestModal);
    } 

    auth.closeGuestModal = function() {
        authReducer({
            type: AuthActionType.GUEST_MODAL,
            payload: {
                guestModal: false,
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };