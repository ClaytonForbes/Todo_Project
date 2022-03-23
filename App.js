import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Screens/Home";
import TodoList from './Screens/TodoList';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Clayton ToDo" component={Home}/>
        <Stack.Screen name="TodoList"
         component={TodoList}  
         options={({route})=>{
           return({
             title:route.params.title,
             headerStyle:{
               backgroundColor:route.params.color
             }
           })
         }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


