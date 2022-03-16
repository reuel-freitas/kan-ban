import React, { useEffect, useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { showError } from "../../common"
import Task from "../../components/core/Task"
import commonStyles from "../../commonStyles"
import { TaskService } from "../../services/TaskService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TaskList from "../../components/patterns/TaskList"
import api from "../../services/api"
import cabecalho2 from '../../../assets/imgs/cabecalho2.png'
import cabecalho3 from '../../../assets/imgs/cabecalho3.png'
import cabecalho from '../../../assets/imgs/cabecalho.png'
import Header from "../../components/layout/Header"

export const Doing = ({ user }) => {
    const [tasks, setTasks] = useState([])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        loadTasks()
    }, [])


    const loadTasks = async () => {
        try {
            const response = await TaskService.getTasks('Doing')
            setTasks(response.data.tasks)
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

    const handleFinishTask = async (taskId) => {
        let date = new Date()
        try {
            await api.patch(`/tasks/${taskId}`, {
                status: 'Done',
                finishedAt: date
            })
            loadTasks()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Header title="Tarefas em andamento" name={user.name} />
            <View style={styles.taskList}>
                <TaskList tasks={tasks} onDelete={handleDeleteTask} onChangeStatus={handleFinishTask} />
            </View>
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
        flex: 7
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