import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity  } from 'react-native';// Use effect allows us to manage state of the component and any change in the componet
//import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";
import Button from '../components/Button';
import LabeledInput from '../components/LabeledInput';
import validator from "validator";
import {auth} from "firebase";





//validates that the email and passwords with certain rules are met using the validator libaray 
const validateFeilds = (email,password) =>{
    const isValid = {
        email:validator.isEmail(email),
        password:validator.isStrongPassword(password, {
            minLength:5,
            minNumbers:1,
            minUppercase:1,
            minSymbols:1
        })

    }
    return isValid
};
const login = (email,password) =>{};
const createAccount = (email,password) =>{
    auth().createUserWithEmailAndPassword(email,password)// this returns a promise 
    .then(({user})=>{
        console.log("Creating new user.....");
    })
}  



export default () =>{
    const [isCreateMode, setCreateMode] = useState(false);// enables/disables  the create or log in for page for users
    const [emailField,setemailFeild] = useState({
        text:"",
        errorMessage:""
    })
    const [passwordField,setPasswordFeild] = useState({
        text:"",
        errorMessage:""
    })
    const [passwordReentryField,setPasswordReentryFeild] = useState({
        text:"",
        errorMessage:""
    })
    return <View style ={styles.container}>
        <Text style ={styles.header}>C_J_S_TODO</Text>
        <View style={{flex:1}}>

        <LabeledInput label="Email"text={emailField.text} onChangeText={(text) => {setemailFeild({text});}} 
        errorMessage={emailField.errorMessage} labelStyles={styles.label}
        autoCompleteType={"email"}/>

        <LabeledInput label="Password"text={passwordField.text} onChangeText={(text) => {setPasswordFeild({text});}}
        secureTextEntry={true} //makes it so that the text data is password secure
        errorMessage={passwordField.errorMessage} labelStyles={styles.label}
        autoCompleteType={"password"}/>

        {isCreateMode &&(<LabeledInput label="Re-enter Password"text={passwordReentryField.text} onChangeText={(text) => {setPasswordReentryFeild({text});}} 
        secureTextEntry={true} //makes it so that the text data is password secure
        errorMessage={passwordReentryField.errorMessage} labelStyles={styles.label}
        
     />)}

        
     <TouchableOpacity onPress={() =>{setCreateMode(!isCreateMode)}}>
            <Text style={{alignSelf:"center",color:Colors.blue,fontSize:16,margin:4}}>
                {isCreateMode ? "You already have an account?": "Create new account"}
            </Text>
        </TouchableOpacity>
        </View>
      
        <Button onPress={() => {
            const isValid = validateFeilds(emailField.text,passwordField.text);
            let isAllValid = true;
            if(!isValid.email){
                emailField.errorMessage = "Please enter a valid email";
                setemailFeild({...emailField})// to not get rid of the text this is how it should be done.
                isAllValid=false;
            }
            if (!isValid.password){
                passwordField.errorMessage="Password must be atleast 5 long numbers, with uppercase, lowercase and a symbol character";
                setPasswordFeild({...passwordField});
                isAllValid = false;
            }

            if(isCreateMode && passwordReentryField.text != passwordField.text){
                passwordReentryField.errorMessage="Passwords do not match"
                setPasswordReentryFeild({...passwordReentryField});
                isAllValid=false;
            }
            if(isAllValid){
                isCreateMode ? createAccount(emailField.text, passwordField.text): login();
            }
        }} buttonStyle={{backgroundColor: Colors.red }}text={isCreateMode ? "Create Account":"Login"}/>        
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    label: { fontSize: 20, fontWeight: "bold", color: Colors.black },
    header: { fontSize: 72, color: Colors.red, alignSelf: "center" },
});