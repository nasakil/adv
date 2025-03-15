import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NotesContext } from "./NotesContext";
import { AntDesign } from "@expo/vector-icons"; 


type Note = {
  id: string;
  text: string;
  isEditing: boolean;
};

const NotesScreen: React.FC = () => {
  const notesContext = useContext(NotesContext);

  if (!notesContext) {
    throw new Error("NotesContext must be used within a NotesProvider");
  }

  const { notes, dispatch } = notesContext;

  const addNote = (): void => {
    const newNote: Note = { id: Date.now().toString(), text: "", isEditing: true };
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };

  
  const toggleEdit = (id: string, text: string): void => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, text, isEditing: !notes.find(note => note.id === id)?.isEditing } });
  };

  const updateText = (id: string, newText: string): void => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, text: newText, isEditing: true } });
  };

  const deleteNote = (id: string): void => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notes</Text>
      
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            {item.isEditing ? (
              <TextInput
              style={styles.input}
              value={item.text}
              onChangeText={(text) => updateText(item.id, text)}
              autoFocus
              returnKeyType="done" 
              onSubmitEditing={() => toggleEdit(item.id, item.text)} 
            />
            
            ) : (
              <Text style={styles.noteText}>{item.text}</Text>
            )}
            
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => toggleEdit(item.id, item.text)}>
                <Text style={styles.edit}>{item.isEditing ? "💾" : "✏️"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={addNote}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    elevation: 2,
  },
  buttons: { flexDirection: "row" },
  edit: { marginRight: 10, fontSize: 18, color: "blue" },
  delete: { fontSize: 18, color: "red" },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginRight: 10,
  },
  noteText: { flex: 1, fontSize: 16 },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default NotesScreen;
