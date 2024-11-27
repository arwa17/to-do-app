import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import colors from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tempData from "../../constants/tempData";
import TodoList from "@/components/TodoList";
import AddListModal from "@/components/AddListModal";

const Index: React.FC = () => {
  const [addTodoVisible, setAddTodoVisible] = useState<boolean>(false);
  const [lists, setLists] = useState(tempData);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const renderList = ({ item }: { item: any }) => {
    return <TodoList list={item} updateList={updateList} deleteList={deleteList} />;
  };

  const addList = (list: { name: string; color: string }) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list: any) => {
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  const deleteList = (id: number) => {
    setLists(lists.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleAddTodoModal}
      >
        <AddListModal onClose={toggleAddTodoModal} addList={addList} />
      </Modal>
      <View style={styles.row}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo
          <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.listsContainer}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderList}
          keyboardShouldPersistTaps="always"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
          <MaterialIcons name="add-circle" size={60} color={colors.blue} />
          <Text style={styles.addListText}>Add List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 30,
  },
  addList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  addListText: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
  },
  listsContainer: {
    height: "80%",
    alignItems: "center",
  },
});

export default Index;