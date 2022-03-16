import React, { useContext } from "react";
import TaskStack from "./TaskStack";
import AuthStack from "./AuthStack";
import AuthContext from "../contexts/AuthContext";

const Navigation = () => {
    const { signed } = useContext(AuthContext)
    return signed ? <TaskStack /> : <AuthStack />
}

export default Navigation