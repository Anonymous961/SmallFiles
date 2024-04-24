import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import {BACKEND_URL} from '@env';
// import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const Download = ({route, navigation}) => {
  const {message, output_file} = route.params;
  console.log(message, output_file);
  const handleDownload = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', `${BACKEND_URL}/download/${output_file}`)
        .then(res => {
          console.log(res);
          console.log('file downloaded');
        })
        .catch(e => {
          console.log('invoice download ==>', e);
        });

      // Get the file path where the file is saved
      const filePath = response.path();
      console.log(filePath);
      // Open the file using a file manager
      if (Platform.OS === 'android') {
        await RNFetchBlob.android.actionViewIntent(filePath, 'application/pdf');
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
      navigation.goBack();
    }
  };
  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        handleDownload();
      } else {
        console.log('Storage permission denied');
        // Optionally, you can inform the user about the importance of the permission
        // and prompt them to grant it again in the future if needed.
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      // Handle permission request error
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
      <TouchableOpacity style={styles.customButton} onPress={getPermission}>
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
