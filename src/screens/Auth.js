import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ImageBackground, Text, StyleSheet, TextInput, Platform, Touchable, TouchableOpacity, Alert } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
import { signup, signin } from '../services/AuthService'
import { showError } from '../common'

const initialState = {
    name:  '',
    email:  '',
    password: '',
    confirmPassword: '',
    newStage: false
}

export default class Auth extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        ...initialState,

    }

    componentDidMount = async () => {
        const { getParam } = this.props.navigation
        this.setState({
            newStage: getParam('newStage')
        })
    }

    handleSignup = async () => {
        const { state, props } = this
        const { navigate } = props.navigation

        try {
            if (state.password !== state.confirmPassword) {
                throw new Error('As senhas não conferem')
            }

            signup({
                name: state.name,
                email: state.email,
                password: state.password,
            })

            navigate('Auth', { newStage: false })

            this.setState({ ...initialState })

        } catch (error) {
            showError(error)
        }
    }

    handleSignin = async () => {
        const { state, props } = this
        const { navigate } = props.navigation
        try {
            const response = await signin({
                email: state.email,
                password: state.password
            })
            this.setState({ ...initialState })
            navigate('Home', { user: response.data })
        } catch (error) {
            showError(error)
        }
    }

    signinOrSignup = async () => {
        if (this.state.newStage) {
            await this.handleSignup()
        } else {
            await this.handleSignin()
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Task Dev</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.newStage ? 'Registre-se' : 'Faça login'}
                    </Text>
                    {this.state.newStage &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name} onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon="at" autoComplete='email' keyboardType='email-address' placeholder='Email' value={this.state.email} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon="lock" secureTextEntry={true} placeholder='Password' value={this.state.password} onChangeText={password => this.setState({ password })} />
                    {this.state.newStage &&
                        <AuthInput icon="asterisk" secureTextEntry={true} placeholder='Confirmação de senha' value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>
                                {this.state.newStage ? 'Registre-se' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ newStage: !this.state.newStage })}>
                        <View style={[styles.buttonContainer, { marginTop: 10, backgroundColor: '#0E5066' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.newStage ? 'Possuo conta' : 'Registre-se'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
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