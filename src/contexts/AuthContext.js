import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signin, signup, recoverUserInformation, signWithToken } from '../services/AuthService'
import api from "../services/api";

const AuthContext = createContext({}); //quem (qual componente) executa a tarefa do reducer ?

const initialState = { user: null }


const actions = {
    createUser: (state, action) => {
        const user = action.payload;
        return { ...state, user: user }
    },
    getUser: (state, action) => {
        const user = action.payload;
        return { ...state, user: user }
    },
    // updateUser: (state, action) => {
    //     const user = action.payload;
    //     return { ...state, user: user }
    // },
    login: (state, action) => {
        const user = action.payload
        return { ...state, user: user }
    },
    signout: (state, action) => {
        const user = action.payload
        return { ...state, user: user }
    }
}

export const AuthProvider = ({ children }) => {

    function reducer(state, action) {
        switch (action.type) {
            case 'list_user':
                return actions.getUser(state, action);
            case 'create_user':
                return actions.createUser(state, action);
            // case 'update_user':
            //     return actions.updateUser(state, action);
            case 'login':
                return actions.login(state, action);
            case 'signout':
                return actions.signout(state, action);
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState); // o que será feito ?

    const getUser = async () => {
        const response = await recoverUserInformation()
        dispatch({
            type: 'list_user',
            payload: response.user
        })
    }

    const createUser = async (user) => {
        const response = await signup(user);
        dispatch({
            type: 'create_user',
            payload: response.data
        })
    }

    // const updateUser = async (id, user) => {
    //     console.log(id, user)
    //     const response = await api.patch(`/user/${id}`, { user })
    //     dispatch({
    //         type: 'update_user',
    //         payload: response.data
    //     })
    // }

    const login = async userData => {
        const data = await signin(userData)
        const { user, token } = data
        const jsonValues = JSON.stringify({ user, token })
        await AsyncStorage.setItem('userToken', jsonValues)
        dispatch({
            type: 'login',
            payload: { user, token }
        })
        return true
    }


    const signout = async () => {
        await AsyncStorage.removeItem('userToken')
        console.log('aqui')
        dispatch({
            type: 'signout',
            payload: { user: null }
        })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ signed: !!state.user, user: state.user, getUser, login, signout, dispatch, createUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;