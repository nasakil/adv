// NotesContext.tsx

import React, { createContext, useReducer, ReactNode } from "react";

// Define Note Type
export type Note = {
  id: string;
  text: string;
  isEditing: boolean; // ✅ ADD THIS
};

// Define State Type
type State = {
  notes: Note[];
};

// Define Action Types
type Action =
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: { id: string; text: string; isEditing: boolean } }
  | { type: "DELETE_NOTE"; payload: string };

// Initial State
const initialState: State = {
  notes: [],
};

// Reducer Function
const notesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    default:
      return state;
  }
};

// Create Context
export const NotesContext = createContext<{ notes: Note[]; dispatch: React.Dispatch<Action> } | undefined>(
  undefined
);

// Provider Component
export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ notes: state.notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
