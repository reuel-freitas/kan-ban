import axios from 'axios'
import { server } from '../common'

export const TaskService = {
    getTasks(statusTask) {
        return axios.get(`${server}/tasks`, { params: {status: statusTask} })
    },
    taskCreate(task) {
        return axios.post(`${server}/tasks`, task)
    },
    deleteTask(id) {
        console.log(id)
        return axios.delete(`${server}/tasks/${id}`)
    }
}