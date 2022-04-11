import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";

export default ({isChecked, onChecked, ...props}) =>{
    return(
        <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
            <Text style={{color: "#aaa"}}>{isChecked ? "√" : ""}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox:{
        width: 20,
        height: 20, 
        margin: 5,
        backgroundColor: "#fff0",
        color: "#aaa",
        borderWidth: 1,
        borderWidth: 3,
        borderColor: "#aaa",
        alignItems: "center",
        justifyContent: "center",
    },
});