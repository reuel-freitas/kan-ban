import React, { useContext, useState } from 'react'
import { View, ImageBackground, Text, StyleSheet, TextInput, Platform, Touchable, TouchableOpacity, Alert } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/core/AuthInput'
import { showError } from '../common'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default () => {

    const navigation = useNavigation();

    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [user, setUser] = useState(initialState)

    const handleRegisterUser = async () => {
        console.log(user)
        try {
            if (user.password !== user.confirmPassword) {
                throw new Error('As senhas não conferem')
            }

            await signup({
                name: user.name,
                email: user.email,
                password: user.password,
            })

            navigation.navigate('Login')

            setUser({ ...initialState })

        } catch (error) {
            showError(error)
        }
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <Text style={styles.title}>Task Dev</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                    Registre-se
                </Text>
                <AuthInput icon='user' placeholder='Nome' value={user.name} onChangeText={name => setUser({ ...user, name })} />
                <AuthInput icon="at" autoComplete='email' keyboardType='email-address' placeholder='Email' value={user.email} onChangeText={email => setUser({ ...user, email })} />
                <AuthInput icon="lock" secureTextEntry={true} placeholder='Password' value={user.password} onChangeText={password => setUser({ ...user, password })} />
                <AuthInput icon="asterisk" secureTextEntry={true} placeholder='Confirmação de senha' value={user.confirmPassword} onChangeText={confirmPassword => setUser({ ...user, confirmPassword })} />

                <TouchableOpacity onPress={() => handleRegisterUser(user)}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            Registre-se
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View style={[styles.buttonContainer, { marginTop: 10, backgroundColor: '#0E5066' }]}>
                        <Text style={styles.buttonText}>
                            Possuo conta
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#0B3C4D',
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#0B3C4D',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: '(0,0,0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        padding: Platform.OS == 'ios' ? 15 : 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 1,
        borderColor: '#127899',
        borderRadius: 4
    },
    buttonContainer: {
        backgroundColor: '#080',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 13
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20
    }
})