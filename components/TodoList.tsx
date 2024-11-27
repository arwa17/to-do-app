import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import colors from "@/constants/Colors";
import TodoModal from "./TodoModal";

interface TodoListProps {
  list: { name: string; color: string; todos: { title: string; completed: boolean }[]; id: number };
  updateList: (list: any) => void;
  deleteList: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ list, updateList, deleteList }) => {
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  const [showListVisible, setShowListVisible] = useState<boolean>(false);
  const toggleListModal = () => {
    setShowListVisible(!showListVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={toggleListModal}
      >
        <TodoModal list={list} closeModal={toggleListModal} updateList={updateList} />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={toggleListModal}
      >
        <Text style={styles.listTitle}>{list.name}</Text>

        <View style={styles.listItemsContainer}>
          <View style={[styles.listItems, { backgroundColor: "#A1EEBD" }]}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={[styles.listItems, { backgroundColor: "#F6F7C4" }]}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteList(list.id)}>
        <Text style={styles.deleteListButton}>Delete List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: 350,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    height: 100,
    borderRadius: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    paddingBottom: 10,
    width: 180,
    flexWrap: "nowrap",
  },
  listItemsContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
  },
  listItems: {
    alignItems: "flex-end",
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#F5F7F8",
    marginTop: 5,
    padding: 3,
  },
  count: {
    fontSize: 15,
    fontWeight: "800",
    color: "#45474B",
    marginHorizontal: 10,
    borderRadius: 100,
    paddingHorizontal: 5,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#45474B",
    paddingEnd: 5,
  },
  deleteListButton: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default TodoList;