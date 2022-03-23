import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";

export default() => {
    return(<View style={style.container}></View>)
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