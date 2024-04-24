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
  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${output_file}`,
        path: `${dirs.DownloadDir}/${output_file}`,
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `${output_file}`,
      path: `${dirToSave}/${output_file}`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
      .fetch('GET', `${BACKEND_URL}/download/${output_file}`, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log('file downloaded');
        }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
      });
  };
  const getPermission = async () => {
    if (Platform.OS === 'ios') {
      actualDownload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload();
        } else {
          console.log('please grant permission');
        }
      } catch (err) {
        console.log('display error', err);
      }
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
