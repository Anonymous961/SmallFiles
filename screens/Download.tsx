import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import {BACKEND_URL} from '@env';
import axios from 'axios';

const Download = ({route, navigation}) => {
  const {message, output_file} = route.params;
  console.log(message, output_file);
  const handleDownload = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/download/${output_file}`, {
        responseType: 'blob',
      });
      //   console.log(res.data);
      const downloadUri = URL.createObjectURL(res.data);
      Linking.openURL(downloadUri);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.field}>
          File Name:
          <Text style={styles.file}>{output_file}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  file: {
    color: 'red',
    fontSize: 20,
  },
  customButton: {
    width: '80%',
    backgroundColor: '#3498DB',
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  field: {
    fontSize: 20,
    color: '#000000',
  },
});

export default Download;
