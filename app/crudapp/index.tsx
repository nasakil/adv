import React from "react";
import { NotesProvider } from "./NotesContext";
import NotesScreen from "./NotesScreen";

const Index = () => {
  return (
    <NotesProvider>
      <NotesScreen />
    </NotesProvider>
  );
};

export default Index;
