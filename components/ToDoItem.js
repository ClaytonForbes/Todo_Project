import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // use to give the options and the delete icon
import Colors from "../constants/Colors";
import CheckBox from "./CheckBox";

const EditableText = ({ isChecked, onChangeText, text, isNewItem }) => {
  const [isEditMode, setEditMode] = useState(isNewItem);
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => !isChecked && setEditMode(true)}
    >
      {isEditMode ? (
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={text}
          onChangeText={onChangeText}
          placeholder={"Add new item here"}
          onSubmitEditing={() => {}}
          maxLength={30}
          style={[styles.input]}
          onBlur={() => setEditMode(false)}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: isChecked ? Colors.lightGray : Colors.black,
              textDecorationLine: isChecked ? "line-through" : "none",
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ({
  text,
  isChecked,
  onChecked,
  onChangeText,
  onDelete,
  isNewItem,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <CheckBox isChecked={isChecked} onChecked={onChecked} />
        <EditableText
          text={text}
          onChangeText={onChangeText}
          isChecked={isChecked}
          isNewItem={isNewItem}
        />
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={[styles.icon, { color: Colors.red }]}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 16,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 25,
    fontSize: 16,
  },
  text: {
    padding: 3,
    fontSize: 16,
    color: Colors.black,
  },
});
