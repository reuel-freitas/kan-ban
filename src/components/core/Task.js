import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import "moment/locale/pt-br"
import commonStyles from '../../commonStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { ListItem } from 'react-native-elements'

export default props => {

    const [expanded, setExpanded] = useState(false)

    const date = props.finishedAt ? props.finishedAt : props.estimateTo
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM')


    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props._id)}>
                <Icon name="trash-can-outline" size={20} color="#FFF" />
            </TouchableOpacity>
        )
    }

    let iconName = props.status === 'To Do' ? "transfer-right" : props.status === 'Doing' ? "check" : 'check-outline'
    let statusAction = props.status === 'To Do' ? "Iniciar Tarefa" : props.status === 'Doing' ? "Finalizar Tarefa" : 'Ainda não terminei'
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name={iconName} size={20} color={commonStyles.colors.secondary} />
                <Text style={styles.nextStatus}>{statusAction}</Text>
            </View>
        )
    }

    return (
        <Swipeable
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            // onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props._id)}
            onSwipeableLeftOpen={() => props.onChangeStatus && props.onChangeStatus(props._id)}
        >
            <View style={styles.container}>
                {/* <TouchableWithoutFeedback>
                    <View style={styles.checkContainer}>
                        {getCheckView(props)}
                    </View>
                </TouchableWithoutFeedback> */}
                <ListItem.Accordion
                    content={
                        <>
                            {getCheckView(props)}
                            <ListItem.Content>
                                <ListItem.Title style={{ marginLeft: 10 }}>{props.description}</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                        setExpanded(!expanded);
                    }}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: ['#187da0', '#dff3fa'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={LinearGradient}
                >
                    <ListItem
                        onPress={() => console.log('aqui')}
                        bottomDivider
                    >
                        <ListItem.Content style={{paddingVertical: 0}}>
                            {props.details &&
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="contain" size={20} color={commonStyles.colors.mainText} style={{ marginHorizontal: 5, marginRight: 12 }} />
                                    <ListItem.Title>{props.details}</ListItem.Title>
                                </View>
                            }
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Icon name="calendar" size={20} color={commonStyles.colors.mainText} style={{ marginHorizontal: 5, marginRight: 12 }} />
                                <ListItem.Subtitle>{formatedDate}</ListItem.Subtitle>
                            </View>
                        </ListItem.Content>
                    </ListItem>

                </ListItem.Accordion>
                {/* <View style={{ }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{props.description}</Text>
                    <Text style={styles.date}>{formatedDate}</Text>
                </View> */}
            </View>
        </Swipeable>
    )
}

const getCheckView = (props) => {
    let iconName = props.status === 'To Do' ? "format-list-bulleted" : props.status === 'Doing' ? "progress-check" : 'check-all'
    return (
        <View style={styles.finished}>
            <Icon name={iconName} size={20} color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'space-evenly',
        // borderColor: "#127899",
        // borderBottomWidth: 1,
        // alignItems: 'center',
        // paddingVertical: 10,
        width: '100%',
        // paddingHorizontal: 10,
    },
    checkContainer: {
        width: '100%',
        maxWidth: 26,
        alignItems: 'center',
        justifyContent: 'center'
    },
    finished: {
        height: 26,
        width: '100%',
        maxWidth: 26,
        borderRadius: 13,
        backgroundColor: '#04756F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: commonStyles.colors.mainText,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25
    },
    nextStatus: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        margin: 10,
    },
    deleteIcon: {
        marginLeft: 20
    }
})