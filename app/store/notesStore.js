// import { create } from 'zustand';
// import {
//     createNote,
//     deleteNote,
//     getAllNotes,
//     initDB,
//     updateNote
// } from '../db/notesDB';

// export const useNotesStore = create((set, get) => ({
//   notes: [],
//   currentNote: null,
//   loading: false,

//   /**
//    * Initialize DB & load notes
//    */
//   init: async () => {
//     set({ loading: true });
//     await initDB();
//     const notes = await getAllNotes();
//     set({ notes, loading: false });
//   },

//   /**
//    * Add new note
//    */
//   addNote: async (note) => {
//     set({ loading: true });
//     await createNote(note);
//     const notes = await getAllNotes();
//     set({ notes, loading: false });
//   },

//   /**
//    * Update existing note
//    */
//   editNote: async (id, data) => {
//     set({ loading: true });
//     await updateNote(id, data);
//     const notes = await getAllNotes();
//     set({ notes, loading: false });
//   },

//   /**
//    * Delete note
//    */
//   removeNote: async (id) => {
//     set({ loading: true });
//     await deleteNote(id);
//     const notes = await getAllNotes();
//     set({ notes, loading: false });
//   },

//   /**
//    * Set current note (for edit screen)
//    */
//   setCurrentNote: (note) => {
//     set({ currentNote: note });
//   },
// }));









import { create } from 'zustand';
import { createNote, deleteNote, getAllNotes, initDB, updateNote } from '../db/notesDB';

export const useNotesStore = create((set, get) => ({
  notes: [],
  currentNote: null,
  loading: false,

  // Initialize DB and load notes
  init: async () => {
    set({ loading: true });
    try {
      await initDB();
      const notes = await getAllNotes();
      console.log('🟢 Init finished, notes:', notes);
      set({ notes, loading: false });
    } catch (err) {
      console.log('❌ Init Error:', err);
      set({ notes: [], loading: false });
    }
  },

  addNote: async (note) => {
    set({ loading: true });
    try {
      await createNote(note);
      const notes = await getAllNotes();
      set({ notes, loading: false });
    } catch (err) {
      console.log('❌ Add note error:', err);
      set({ loading: false });
    }
  },

  updateNote: async (id, note) => {
    set({ loading: true });
    try {
      await updateNote(id, note);
      const notes = await getAllNotes();
      set({ notes, loading: false });
    } catch (err) {
      console.log('❌ Update note error:', err);
      set({ loading: false });
    }
  },

  deleteNote: async (id) => {
    set({ loading: true });
    try {
      await deleteNote(id);
      const notes = await getAllNotes();
      set({ notes, loading: false });
    } catch (err) {
      console.log('❌ Delete note error:', err);
      set({ loading: false });
    }
  },

  setCurrentNote: (note) => set({ currentNote: note }),
}));
