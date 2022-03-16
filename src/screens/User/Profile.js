import axios from 'axios'
import React, { useContext, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import defaultUser from '../../../assets/imgs/user.png'
import commonStyles from '../../commonStyles'
import AuthContext from '../../contexts/AuthContext'
import api from '../../services/api'

export default ({ user, signout }) => {

    console.log('usuario', user.user)

    const { name, nick, email, _id, avatar, repositories, followers, following } = user.user

    const { getUser } = useContext(AuthContext)

    const [userGit, setUserGit] = useState({
        nick: '',
        repositories: null,
        followers: null,
        following: null,
        avatar: ''
    })


    const handleGetGithub = async () => {
        const response = await axios.get(`https://api.github.com/users/${userGit.nick}`)
        const { avatar_url, followers, following, public_repos } = response.data
        setUserGit({
            ...userGit,
            avatar: avatar_url,
            repositories: public_repos,
            followers: followers,
            following: following
        })
    }

    const handleSave = async () => {
        try {
            await api.patch(`/user/${_id}`, {
                nick: userGit.nick,
                avatar: userGit.avatar,
                repositories: userGit.repositories,
                followers: userGit.followers,
                following: userGit.following
            })
            await getUser()
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Perfil do Desenvolvedor</Text>
                {/* <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontSize: 20, textAlign: 'center', marginTop: 10 }}>Insira seu nick do Github, com ele você consegue carregar seu avatar</Text> */}
            </View> 


            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                <Image source={avatar ? { uri: avatar } : userGit.avatar !== '' ? { uri: userGit.avatar } : defaultUser} style={{ width: 80, height: 80, borderRadius: 40 }} />
                <View style={{ flexDirection: 'row', marginTop: 20, width: '50%' }}>
                    <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontWeight: 'bold' }}>Followers: {followers}</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontWeight: 'bold' }}>Following: {following}</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                    <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontWeight: 'bold' }}>Repositórios públicos: {repositories}</Text>
                </View>
            </View>


            <View style={{ flex: 3 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ textAlign: 'center', padding: 10 }}>https://github.com/{nick || userGit.nick}</Text>
                    <TextInput
                        value={nick ? nick : userGit.nick}
                        placeholder="Nickname Github"
                        onChangeText={nick => setUserGit({ ...userGit, nick })}
                        style={{ width: '100%', padding: 5, borderRadius: 4, backgroundColor: '#dad9db', color: commonStyles.colors.mainText }}
                    />
                    <TextInput
                        value={name}
                        placeholder="Nome"
                        autoCapitalize='words'
                        style={{ width: '100%', padding: 5, borderRadius: 4, backgroundColor: '#dad9db', marginTop: 10, color: commonStyles.colors.mainText }}
                    />
                    <TextInput
                        value={email}
                        placeholder="E-mail"
                        autoCapitalize='none'
                        autoComplete='email'
                        style={{ width: '100%', padding: 5, borderRadius: 4, backgroundColor: '#dad9db', marginTop: 10, color: commonStyles.colors.mainText }}
                    />
                </View>
            </View>


            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, flex: 2 }}>
                <TouchableOpacity
                    onPress={handleGetGithub}
                    style={{ borderWidth: 1, borderColor: '#0B3C4D', borderRadius: 8, padding: 10, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontSize: 16, textAlign: 'center', marginRight: 10 }}>Carregar do Github</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="cycle" size={20} color="#0B3C4D" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSave}
                    style={{ borderWidth: 1, borderColor: '#0B3C4D', borderRadius: 8, padding: 10, marginTop: 20, width: '100%' }}>
                    <View style={{}}>
                        <Text style={{ fontFamily: commonStyles.fontFamily, color: commonStyles.colors.mainText, fontSize: 16, textAlign: 'center' }}>Salvar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
