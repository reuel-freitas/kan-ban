import React from "react"
import { FlatList, Text } from "react-native"
import Task from "../core/Task"

export default props => {
    const { onDelete, onChangeStatus, tasks } = props
    return (
        <FlatList
            data={tasks}
            keyExtractor={task => `${task._id}`}
            renderItem={({ item }) =>
                <Task {...item}
                    onDelete={onDelete}
                    onChangeStatus={onChangeStatus}
                />
            }
        />
    )
}