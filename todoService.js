// todoService.js
import { db } from './firebaseConfig'; // Import Firestore database
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";

// Reference to the "todos" collection in Firestore
const todosCollection = collection(db, "todos");

// Function to add a todo to Firestore
export const addTodo = async (todo) => {
  await addDoc(todosCollection, todo);
};

// Function to delete a todo from Firestore
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};

// Function to edit a todo in Firestore
export const editTodo = async (id, updatedTodo) => {
  await updateDoc(doc(db, "todos", id), updatedTodo);
};

// Function to fetch all todos from Firestore
export const getTodos = async () => {
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};