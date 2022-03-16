import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from "../screens/Signup";
import Login from '../screens/Login';


const Stack = createNativeStackNavigator()

export default props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                options={{ headerShown: false }}
                children={() => <Login {...props} />}
            />
            <Stack.Screen
                name='Signup'
                options={{ headerShown: false }}
                children={() => <Signup {...props} />}
            />
        </Stack.Navigator>
    )
}

