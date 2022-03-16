import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';


// import Auth from "./screens/Auth";
import Login from "../screens/Login";
import { Doing } from "../screens/Tasks/Doing";
import { Done } from "../screens/Tasks/Done";
import { Todo } from "../screens/Tasks/Todo";
import AuthContext, { AuthProvider } from "../contexts/AuthContext";
import { AppProvider } from "../contexts/AppContext";
import AuthStack from './AuthStack'
import Profile from "../screens/User/Profile";


const Tab = createBottomTabNavigator();

export default props => {

    const {user} = useContext(AuthContext)

    return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Todo':
                            iconName = focused
                                ? 'md-code'
                                : 'md-code-outline'
                            break;

                        case 'Doing':
                            iconName = focused
                                ? 'md-code-working'
                                : 'md-code-working-outline'
                            break;

                        case 'Done':
                            iconName = focused
                                ? 'md-code-slash'
                                : 'md-code-slash-outline'
                            break;

                        case 'Profile':
                            iconName = focused
                                ? 'md-person'
                                : 'md-person-outline'
                            break;


                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0B3C4D',
                tabBarInactiveTintColor: '#8d8d91',
                tabBarShowLabel: true,
                headerStyle: { backgroundColor: 'lightgray' }

            })} initialRouteName="Todo">
                <Tab.Screen options={{ headerShown: false }} name="Todo" children={() => <Todo {...props} user={user} />} />
                <Tab.Screen options={{ headerShown: false }} name="Doing" children={() => <Doing {...props} user={user} />} />
                <Tab.Screen options={{ headerShown: false }} name="Done" children={() => <Done {...props} user={user} />} />
                <Tab.Screen options={{ headerShown: false }} name="Profile" children={() => <Profile {...props} user={user} />} />
            </Tab.Navigator>
    )
}