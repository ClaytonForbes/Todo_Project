import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList  } from 'react-native';// Use effect allows us to manage state of the component and any change in the componet
import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";

// Create the button for the list 
//instead of using props I looked up and did object deconstructing
//so instead of passing props into list i can call title directly 


const ListButton = ({title,color,onPress,onDelete,onOptions}) =>{
    return(
        <View style={styles.container}>
            <Text>This is the Task Manager Home Page</Text>
            <TouchableOpacity onPress={onPress} style={[styles.itemContainer,{backgroundColor:color}]}>
                <View><Text style={styles.itemTitle}>{title}</Text></View>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={onOptions}>
                    <Ionicons name="options-outline" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={24} color="white"/>
                </TouchableOpacity>
                </View> 
            </TouchableOpacity>
        </View>
    )
}
const renderAddListIcon= (navigation, addItemToList) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Edit", {saveChanges: addItemToList})}>
            <Text styles ={styles.icon}>Add </Text>
        </TouchableOpacity>
    )  
}
//Use a flat list to render the data list.
//return the list with useState
export default({navigation}) =>{
    const [lists, setList] = useState([
        {title:"School", color:Colors.red},{title:"Work", color:Colors.blue},{title:"Fun", color:Colors.purple}]
    )
    //const listData =[{title:"School", color:Colors.red},{title:"Work", color:Colors.blue},{title:"Fun", color:Colors.green}]
    const addItemToList = (item) => {
        lists.push(item);
        setList(...[lists]);
    }

    const removeItemFromLists = (index) =>{
        lists.splice(index , 1);
        setList([...lists])

    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() =>  renderAddListIcon(navigation, addItemToList)
        })
    })

    const updateItemFromLists = (index, item) => {
        lists[index] = item;
        setList([...lists])
    }

    return(
        <View style = {styles.container}>
        <FlatList
         data={lists}
         renderItem={({item:{title,color},index}) =>{
             return(
                 <ListButton title={title} 
                 color={color} 
                 navigation={navigation} 
                 onPress={()=>{navigation.navigate("TodoList",{title, color})}}
                 onOptions={()=>{
                     navigation.navigate(
                         "Edit",
                        {
                        title, color, saveChanges: (item) => updateItemFromLists(index, item)
                        }
                    )}
                }
                onDelete={()=> removeItemFromLists(index)}
                 />
             )
         }}
         />
        </View>
    );
   
}

  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
       // backgroundColor:Colors.blue
    },
    icon: {
        padding: 5,
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});