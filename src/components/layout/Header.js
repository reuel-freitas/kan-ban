import React from "react";
import moment from "moment";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import commonStyles from "../../commonStyles";
import cabecalho3 from '../../../assets/imgs/cabecalho2.png'
import header from '../../../assets/imgs/header.png'
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default ({ bg, title, name }) => {

    const today = moment().format('ddd, D/MM');

    return (
        <Header backgroundColor={bg} style={{ width: '100%', flex: 2 }}
            leftComponent={
                <View style={{width: 125, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
            }
            rightComponent={
                <View style={{ width: 220, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Text style={styles.name}>Olá, {name}!</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({
    titleBar: { flexDirection: 'row', width: 220, alignItems: 'center' },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        textAlign: 'left',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.55)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    name: {
        fontSize: 16,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
})