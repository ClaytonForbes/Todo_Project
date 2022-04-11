import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Screens/Home";
import TodoList from './Screens/TodoList';
import EditList from './Screens/EditList';
import Colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="C_S_J ToDo" component={Home}/>
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
         <Stack.Screen name="Edit" component={EditList}
            options={({route})=>{
              return({
                title: route.params.title ? `Edit ${route.params.title} list` : "Create new list",
                headerStyle:{
                  backgroundColor:route.params.color || Colors.blue
                },
                backgroundTintColor: "white"
              })
            }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


