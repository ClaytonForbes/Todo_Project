import React, {useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";
import ToDoItem from '../components/ToDoItem';
const renderAddListIcon= (addItem) => {
    return(
        <TouchableOpacity onPress={() => addItem({text: "", isChecked: false, isNewItem: true})}>
            <Text style ={style.icon}>Add </Text>
        </TouchableOpacity>
    )
}

export default({navigation}) => {
    const [toDoItems, setToDoItems] = useState([{text: "hello", isChecked: false}])
    const addItemToList = (item) => {
        toDoItems.push(item);
        setToDoItems(...[toDoItems]);
    }
    const removeItemFromLists = (index) =>{
        toDoItems.splice(index , 1);
        setToDoItems([...toDoItems])

    }

    const updateItem = (index, item) => {
        toDoItems[index] = item;
        setToDoItems([...toDoItems])
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() => renderAddListIcon(addItemToList)
        })
    })
    return(
    <View style={style.container}>
        <FlatList
        data={toDoItems}
        renderItem={({item: {text, isChecked, isNewItem}, index}) => {
            return <ToDoItem 
            text={text} 
            isChecked={isChecked} 
            isNewItem={isNewItem}
            onChecked={() => {
                const toDoItem = toDoItems[index]
                toDoItem.isChecked = !isChecked
                updateItem(index, toDoItem)
            }}
            onChangeText={(newText) => {
                const toDoItem = toDoItems[index]
                toDoItem.text = newText;
                updateItem(index, toDoItem)
            }}
            onDelete={() => {
                removeItemFromLists(index)
            }}
            />
        }}
        />
    </View>);

    
}

const style =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    icon:{
        padding:5,
        fontSize:32,
        color:"white",
    }
})