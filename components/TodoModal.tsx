import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from "../constants/Colors";
import Feather from '@expo/vector-icons/Feather';

interface TodoModalProps {
  list: { name: string; todos: { title: string; completed: boolean }[]; color: string };
  closeModal: () => void;
  updateList: (list: any) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ list, closeModal, updateList }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [editableTodoIndex, setEditableTodoIndex] = useState<number | null>(null);
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter(todo => todo.completed).length;

  const handleClose = () => {
    closeModal();
  };

  const toggleCompleted = (index: number) => {
    const updatedList = { ...list };
    updatedList.todos[index].completed = !updatedList.todos[index].completed;
    updateList(updatedList);
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const updatedList = { ...list };

    if (editableTodoIndex !== null && editableTodoIndex >= 0 && editableTodoIndex < updatedList.todos.length) {
      updatedList.todos[editableTodoIndex].title = newTodo;
      setEditableTodoIndex(null);
    } else {
      updatedList.todos.push({ title: newTodo, completed: false });
    }

    updateList(updatedList);
    setNewTodo("");
    Keyboard.dismiss();
  };

  const deleteTodo = (index: number) => {
    const updatedList = { ...list };
    updatedList.todos.splice(index, 1);
    updateList(updatedList);
  };

  const renderTodo = ({ item, index }: { item: { title: string; completed: boolean }; index: number }) => {
    return (
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => toggleCompleted(index)}>
          <Feather name={item.completed ? "check-square" : "square"} size={26} color="gray" />
        </TouchableOpacity>
        <Text style={[styles.todoTitle, { textDecorationLine: item.completed ? "line-through" : "none", color: item.completed ? "gray" : "black" }]}>{item.title}</Text>
        <TouchableOpacity onPress={() => { setEditableTodoIndex(index); setNewTodo(item.title); }}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Fontisto name="close-a" size={24} color="black" />
        </TouchableOpacity>

        <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={list.todos}
            renderItem={renderTodo}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: list.color }]}
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={addTodo}>
            <FontAwesome6 name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 64,
    right: 32,
    zIndex: 10,
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: 'lightgray',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoTitle: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap', 
  },
  editButton: {
    color: "black",
    marginLeft: 10,
  },
  deleteButton: {
    color: "red",
    marginLeft: 10,
  },
});

export default TodoModal;