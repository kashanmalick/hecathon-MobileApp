import React from "react";
// import { TouchableOpacity,Text,Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screen/Login'
import Register from'../../screen/Register'
import UserScreen from "../../screen/UserScreen";
import Card from "../../screen/Card";
import Map from "../../screen/Map";
import BMLogin from "../../screen/BMLogin";
import BMPage from "../../screen/BMPage";
import QR from "../../screen/QR";
import Search from "../../screen/Search";


const Stack = createNativeStackNavigator();

export default Navigation = () =>{
  return(
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
              <Stack.Screen options={{headerShown:false}} name="Map" component={Map} />
              <Stack.Screen options={{headerShown:false}} name="Register" component={Register}/>
              <Stack.Screen options={{headerShown:false}} name="BMLogin" component={BMLogin}/>
              <Stack.Screen  name="BMPage" component={BMPage}/>
              <Stack.Screen name="UserScreen" component={UserScreen} />
              <Stack.Screen name="Card" component={Card} />
              <Stack.Screen name="QR" component={QR} />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
          </NavigationContainer>
  )
}