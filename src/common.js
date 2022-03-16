import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://10.0.0.115:3000' : 'http://10.0.0.115:3000'

function showError(err) {
    Alert.alert('Erro', `Ocorreu um erro: ${err}`)
}

function showSuccess(msg) {
    Alert.alert('Sucesso', `${msg}`)
}

export { server, showError, showSuccess }