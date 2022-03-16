import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import cabecalho2 from '../../../assets/imgs/cabecalho2.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'moment/locale/pt-br'
import { showSuccess, showError } from '../../common'
import TaskCreate from '../../components/patterns/TaskCreate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TaskService } from '../../services/TaskService'
import api from '../../services/api'
import commonStyles from '../../commonStyles'
import TaskList from '../../components/patterns/TaskList'
import Header from '../../components/layout/Header'

export const Todo = ({ user }) => {

    const [tasks, setTasks] = useState([])
    const [showTaskCreate, setShowTaskCreate] = useState(false)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            const response = await TaskService.getTasks('To Do')
            setTasks(response.data.tasks)
        } catch (error) {
            showError(error)
        }
    }

    const handleNewTask = async newTask => {
        try {
            if (!newTask.description || !newTask.description.trim()) {
                throw Error('Dados inválidos', 'Descrição da tarefa não informada.')
            }
            await TaskService.taskCreate({
                description: newTask.description,
                estimateTo: newTask.estimateTo,
                details: newTask.details,
                userId: user.user._id
            })
            setShowTaskCreate(false)
            loadTasks()

        } catch (error) {
            showError(error)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await TaskService.deleteTask(taskId)
            loadTasks()
        } catch (error) {
            showError(error)
        }
    }

    const handleStartTask = async (taskId) => {
        try {
            await api.patch(`/tasks/${taskId}`, {
                status: 'Doing'
            })
            loadTasks()
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <Header bg="#136480" title="To do" name={user.user.name} />
            {showTaskCreate &&
                <TaskCreate
                    onSave={handleNewTask}
                    onCancel={() => setShowTaskCreate(false)}
                />
            }
            <View style={styles.taskList}>
                <TaskList
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                    onChangeStatus={handleStartTask}
                />
            </View>
            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => setShowTaskCreate({ showTaskCreate: true })}
            >
                <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 8
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 20,

    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})