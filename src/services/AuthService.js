import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export async function signin(user) {
    try {
        const res = await api.post('/signin', user);
        const { token } = res.data;
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        AsyncStorage.setItem('userToken', JSON.stringify(token))
        return res.data;
    } catch (err) {
        console.log(err);
        return { error: "Error" };
    }
}

export async function signup(user) {
    try {
        const res = await api.post('/signup', user);
    } catch (err) {
        const { errors } = err.response.data;
        return { errors };
    }
}

export async function signinWithToken(token) {
    return api.post(`/signin`, { token }).then(res => {
        const { data, token } = res.data;
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        return { user: data, token };
    }).catch(err => {
        return { error: "Error" }
    })
}

export async function recoverUserInformation() {

    const userData = await AsyncStorage.getItem('userToken')
    console.log(userData)
    if (!userData) return {};

    if (userData) {
        const { token, user } = JSON.parse(userData)

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return api.get(`/loggeduser`).then(res => {

            const { token, data } = res.data

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            return { user: data, token };

        }).catch(err => {
            if (user)
                return { user, needAuth: true }
            if (!user) {
                return {}
            }
        })
    }

    if (!userData)
        return {}

}