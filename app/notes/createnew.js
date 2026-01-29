import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useNotesStore } from '../store/notesStore';

export default function CreateNew() {
  const { addNote } = useNotesStore();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Request media library permissions
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your media library to select images.');
      }
    })();
  }, []);

  // Pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Expo SDK 49+
    }
  };

  const handleSave = async () => {
    if (!title) {
      Alert.alert('Title required', 'Please enter a title');
      return;
    }
    await addNote({ title, content, imageUri });
    router.back(); // Go back to Notes List
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, { height: 100 }]}
      />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 150, height: 150, marginBottom: 12, borderRadius: 8 }}
        />
      )}
      <Button title="Pick Image" onPress={pickImage} />
      <View style={{ height: 12 }} />
      <Button title="Save Note" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
