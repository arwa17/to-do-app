import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

const backgroundColors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#800000", "#008000", "#000080", "#808000", "#000000", "#FFD1DC",
  "#DFF0D8", "#D0DFF5", "#FFF0D0", "#FFD0FF", "#D0FFFF", "#F5D0D0",
  "#D0F5D0", "#D0D0F5", "#F5F5D0", "#D0D0D0",
];

interface AddListModalProps {
  onClose: () => void;
  addList: (list: { name: string; color: string }) => void;
}

const AddListModal: React.FC<AddListModalProps> = ({ onClose, addList }) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>(backgroundColors[0]);

  const createTodo = () => {
    if (name.trim() === "") {
      alert("Please enter a list name.");
      return;
    }
    const list = { name, color };
    addList(list);
    setName("");
    onClose();
  };

  const renderColors = () => {
    return backgroundColors.map((color) => (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, { backgroundColor: color }]}
        onPress={() => setColor(color)}
      />
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Fontisto name="close-a" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.createContainer}>
        <Text style={styles.createTitle}>Create Todo List</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter a name for your new list"
          onChangeText={setName}
        />
        <View style={styles.colorSelectContainer}>{renderColors()}</View>

        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: color }]}
          onPress={createTodo}
        >
          <Text style={styles.createButtonText}>Create!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    position: "absolute",
    top: 64,
    right: 32,
  },
  createContainer: {
    alignSelf: "center",
    marginHorizontal: 32,
  },
  createTitle: {
    fontSize: 35,
    fontWeight: "800",
    color: "black",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "blue",
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 30,
    fontSize: 18,
  },
  createButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  colorSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddListModal;