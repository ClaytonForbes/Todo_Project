import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native"; // Use effect allows us to manage state of the component and any change in the componet
//import {Ionicons} from "@expo/vector-icons"// use to give the options and the delete icon
import Colors from "../constants/Colors";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import validator from "validator";
import { auth, firestore } from "firebase";
import * as ImagePicker from "expo-image-picker";

//validates that the email and passwords with certain rules are met using the validator libaray
const validateFeilds = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 5,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
  };
  return isValid;
};
const login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("You are Logged in Welcome!");
    });
};

const createAccount = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password) // this returns a promise
      .then(({ user }) => {
        console.log("Creating new user.....");
        firestore().collection("users").doc(user.uid).set({})// this is what we added for 4
      });
};

export default () => {
  const [image, setImage] = useState(null);
  const [isCreateMode, setCreateMode] = useState(false); // enables/disables  the create or log in for page for users
  const [emailField, setemailFeild] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordFeild] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryFeild] = useState({
    text: "",
    errorMessage: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>C_J_S_To_Do_App</Text>
      <View style={{ flex: 1 }}>
        <LabeledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setemailFeild({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyles={styles.label}
          autoCompleteType={"email"}
        />

        <LabeledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordFeild({ text });
          }}
          secureTextEntry={true} //makes it so that the text data is password secure
          errorMessage={passwordField.errorMessage}
          labelStyles={styles.label}
          autoCompleteType={"password"}
        />

        {isCreateMode && (
          <LabeledInput
            label="Re-enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryFeild({ text });
            }}
            secureTextEntry={true} //makes it so that the text data is password secure
            errorMessage={passwordReentryField.errorMessage}
            labelStyles={styles.label}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode
              ? "You already have an account?"
              : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={() => {
          const isValid = validateFeilds(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setemailFeild({ ...emailField }); // to not get rid of the text this is how it should be done.
            isAllValid = false;
          }
          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be atleast 5 long numbers, with uppercase, lowercase and a symbol character";
            setPasswordFeild({ ...passwordField });
            isAllValid = false;
          }

          if (isCreateMode && passwordReentryField.text != passwordField.text) {
            passwordReentryField.errorMessage = "Passwords do not match";
            setPasswordReentryFeild({ ...passwordReentryField });
            isAllValid = false;
          }
          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{ backgroundColor: Colors.red }}
        text={isCreateMode ? "Create Account" : "Login"}
      />

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
          <Image
            source={
              image === null ? require("../assets/default.jpg") : { uri: image }
            }
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: { fontSize: 20, fontWeight: "bold", color: Colors.black },
  header: { fontSize: 30, color: Colors.blue, alignSelf: "center" },
});
