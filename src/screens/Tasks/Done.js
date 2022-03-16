import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { showError } from "../../common"
import commonStyles from "../../commonStyles"
import { TaskService } from "../../services/TaskService"
import TaskList from "../../components/patterns/TaskList"
import api from "../../services/api"
import Header from "../../components/layout/Header"

export const Done = ({user}) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    }, [])


    const loadTasks = async () => {
        try {
            const response = await TaskService.getTasks('Done')
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

    const handleUndoFinishTask = async (taskId) => {
        let date = new Date()
        try {
            await api.patch(`/tasks/${taskId}`, {
                status: 'Doing',
                finishedAt: date
            })
            loadTasks()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Header title="Tarefas Finalizadas" name={user.name} />
            <View style={styles.taskList}>
                <TaskList tasks={tasks} onDelete={handleDeleteTask} onChangeStatus={handleUndoFinishTask} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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