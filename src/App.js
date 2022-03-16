import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext, { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./Navigators";


// const Tab = createBottomTabNavigator();

export default props => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
        </NavigationContainer>
    )
}