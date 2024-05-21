import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {S3_BUCKET_URL} from '@env';
import RNFS from 'react-native-fs';

const Download = ({route}) => {
  const {message, output_file, uploaded_file} = route.params;
  const [percentage, setPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(message, output_file, uploaded_file);
  console.log(`${S3_BUCKET_URL}/${uploaded_file}`);

  const downloadFileBegin = () => {
    console.log('Download Begin');
  };

  const downloadFileProgress = (data: any) => {
    console.log('data', data, (100 * data.bytesWritten) / data.contentLength);
    setPercentage(((100 * data.bytesWritten) / data.contentLength) | 0);
    console.log('$$$$$$$$$$', percentage);
  };
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const downloadPath = RNFS.DownloadDirectoryPath + `/${output_file}`;

      RNFS.downloadFile({
        begin: downloadFileBegin,
        progress: downloadFileProgress,
        fromUrl: `${S3_BUCKET_URL}/${uploaded_file}`,
        toFile: downloadPath,
      })
        .promise.then(result => {
          console.log('Download successful:', result);
          setIsLoading(false);
          setPercentage(100);
          Alert.alert('File downloaded successfully');
        })
        .catch(error => {
          setIsLoading(false);
          console.log('Failed to download file:', error);
          Alert.alert('File download failed');
        });
    } catch (error) {
      console.log('FILE DOWNLOAD FAILED:', error);
      Alert.alert(
        'Download failed',
        'There was an error while downloading the image.',
      );
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Text style={styles.field}>
          File Name:
          <Text style={styles.file}>{output_file}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={handleDownload}>
        <Text style={[styles.buttonText, styles.darkText]}>Download</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.lightText}>Downloading...</Text>
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
    margin: 5,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  field: {
    fontSize: 20,
    maxWidth: '80%',
    color: '#000000',
  },
});

export default Download;
