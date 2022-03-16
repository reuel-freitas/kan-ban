import React, { Component } from 'react'
import { Platform, Modal, StyleSheet, View, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../../commonStyles'
import moment from 'moment'

const initialState = {
    description: '',
    details: '',
    estimateTo: new Date(),
    showDatePicker: false
}

export default class TaskCreate extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        ...initialState
    }

    getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={this.state.estimateTo}
            onChange={(_, estimateTo) => this.setState({ estimateTo, showDatePicker: false })}
            mode='date'
        />

        let dateString = moment(this.state.estimateTo).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    AreaOnCancel = () => {
        return (
            <TouchableWithoutFeedback onPress={this.props.onCancel} >
                <View style={styles.background} />
            </TouchableWithoutFeedback>
        )
    }

    save = () => {
        const newTask = {
            description: this.state.description,
            details: this.state.details,
            estimateTo: this.state.estimateTo
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
    }

    render() {

        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType="slide">
                <this.AreaOnCancel />
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder="Título da Tarefa" onChangeText={description => this.setState({ description })} value={this.state.description} />
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        style={[styles.input, { maxHeight: 70, height: 70, marginTop: 5, textAlignVertical: 'top' }]}
                        placeholder="Detalhes da Tarefa"
                        onChangeText={details => this.setState({ details })} value={this.state.details}
                    />
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <this.AreaOnCancel />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    container: {
        // flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#127899',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 20,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#127899',
        borderRadius: 4,
        padding: 5
    }
})