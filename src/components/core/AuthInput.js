import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return(
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#127899',
        borderRadius: 4,
        marginTop: 10
    },
    icon:{
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%',
        color: '#0B3C4D'
    }
})