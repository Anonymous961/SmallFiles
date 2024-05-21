import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import {BACKEND_URL} from '@env';
import axios from 'axios';

const CompressImg = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(BACKEND_URL);
  const handleCompress = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', image);
      formData.append('quality', '65');

      const response = await axios.post(
        `${BACKEND_URL}/compressimage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      setIsLoading(false);
      navigation.push('Download', response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      {image && (
        <View>
          <Image source={{uri: image.uri}} style={{height: 250, width: 300}} />
          <Text style={[styles.field, styles.lightText]}>
            File Name:
            <Text style={styles.file}>{image.name}</Text>
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.selectButton, styles.Button]}
        onPress={() => {
          pick({
            mode: 'open',
            type: [types.images],
          })
            .then(res => {
              console.log(res[0]);
              setImage(res[0]);
            })
            .catch(err => {
              console.error(err);
            });
        }}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>
      {image && (
        <TouchableOpacity
          style={[styles.customButton, styles.Button]}
          onPress={handleCompress}>
          <Text style={styles.buttonText}>Compress Image</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.lightText}>Compressing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  file: {
    color: '#EA425C',
  },
  lightText: {
    color: '#000000',
  },
  Button: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 3,
    width: '80%',
  },
  customButton: {
    backgroundColor: '#487EB0',
  },
  selectButton: {
    backgroundColor: '#3498DB',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  preview: {
    margin: 10,
  },
});

export default CompressImg;
