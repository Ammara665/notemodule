
// import { useRouter } from 'expo-router';
// import { useEffect } from 'react';
// import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useNotesStore } from '../store/notesStore';

// export default function NotesListScreen() {
//   const { notes, loading, init } = useNotesStore();
//   const router = useRouter();

//   useEffect(() => {
//     init(); // load all notes from SQLite
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.noteCard}>
//             {item.imageUri ? (
//               <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
//             ) : null}
//             <View style={{ flex: 1 }}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={<Text>No notes yet.</Text>}
//       />

//       {/* Floating + Button */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push('/notes/createnew')}
//       >
//         <Text style={{ fontSize: 28, color: 'white' }}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   noteCard: {
//     flexDirection: 'row',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   thumbnail: { width: 50, height: 50, marginRight: 12, borderRadius: 6 },
//   title: { fontWeight: 'bold', fontSize: 16 },
//   date: { fontSize: 12, color: '#666' },
//   fab: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
// });











// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useNotesStore } from '../store/notesStore';

// export default function NotesListScreen() {
//   const { notes, loading, init, deleteNote, updateNote } = useNotesStore();
//   const router = useRouter();

//   // For inline edit modal
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editNote, setEditNote] = useState(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editContent, setEditContent] = useState('');

//   useEffect(() => {
//     init(); // load all notes
//   }, []);

//   const handleEdit = (note) => {
//     setEditNote(note);
//     setEditTitle(note.title);
//     setEditContent(note.content);
//     setEditModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     if (!editNote) return;
//     await updateNote(editNote.id, { title: editTitle, content: editContent, imageUri: editNote.imageUri });
//     setEditModalVisible(false);
//     setEditNote(null);
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.noteCard}>
//             {item.imageUri ? <Image source={{ uri: item.imageUri }} style={styles.thumbnail} /> : null}
//             <View style={{ flex: 1 }}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text>{item.content}</Text>
//               <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
//             </View>

//             {/* Delete & Update Buttons */}
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.smallBtn} onPress={() => handleEdit(item)}>
//                 <Text style={styles.btnText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.smallBtn, { backgroundColor: 'red' }]} onPress={() => deleteNote(item.id)}>
//                 <Text style={styles.btnText}>Del</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={<Text>No notes yet.</Text>}
//       />

//       {/* Floating + Button */}
//       <TouchableOpacity style={styles.fab} onPress={() => router.push('/notes/createnew')}>
//         <Text style={{ fontSize: 28, color: 'white' }}>+</Text>
//       </TouchableOpacity>

//       {/* Edit Modal */}
//       <Modal visible={editModalVisible} transparent animationType="slide">
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Edit Note</Text>
//             <TextInput
//               placeholder="Title"
//               value={editTitle}
//               onChangeText={setEditTitle}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Content"
//               value={editContent}
//               onChangeText={setEditContent}
//               multiline
//               style={[styles.input, { height: 100 }]}
//             />
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
//               <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
//               <Button title="Update" onPress={handleUpdate} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   noteCard: {
//     flexDirection: 'row',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   thumbnail: { width: 50, height: 50, marginRight: 12, borderRadius: 6 },
//   title: { fontWeight: 'bold', fontSize: 16 },
//   date: { fontSize: 10, color: '#666' },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 8,
//     right: 8,
//     flexDirection: 'row',
//   },
//   smallBtn: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//     marginLeft: 6,
//   },
//   btnText: { color: 'white', fontSize: 12 },
//   fab: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 6,
//   },
// });

































import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNotesStore } from '../store/notesStore';

export default function NotesListScreen() {
  const { notes, loading, init, deleteNote, updateNote } = useNotesStore();
  const router = useRouter();

  // Inline edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    init(); // Load notes from SQLite
  }, []);

  const handleEdit = (note) => {
    setEditNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!editNote) return;
    await updateNote(editNote.id, { title: editTitle, content: editContent, imageUri: editNote.imageUri });
    setEditModalVisible(false);
    setEditNote(null);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>

            {/* Edit & Delete buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.smallBtn} onPress={() => handleEdit(item)}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallBtn, { backgroundColor: 'red' }]} onPress={() => deleteNote(item.id)}>
                <Text style={styles.btnText}>Del</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No notes yet.</Text>}
      />

      {/* Floating + Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/notes/createnew')}>
        <Text style={{ fontSize: 28, color: 'white' }}>+</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Edit Note</Text>
            <TextInput
              placeholder="Title"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Content"
              value={editContent}
              onChangeText={setEditContent}
              multiline
              style={[styles.input, { height: 100 }]}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
              <Button title="Update" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noteCard: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnail: { width: 50, height: 50, marginRight: 12, borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
  date: { fontSize: 10, color: '#666' },
  buttonContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
  },
  smallBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  btnText: { color: 'white', fontSize: 12 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
