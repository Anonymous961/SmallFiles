import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import {BACKEND_URL} from '@env';
import axios from 'axios';

interface Image {
  name: string;
  uri: string;
}

const CompressImg = ({navigation}) => {
  const [image, setImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState<number>(60);
  const checkQuality = () => {
    if (!(quality >= 10 && quality <= 90)) {
      Alert.alert('Invalid quality entered');
      return false;
    }
    return true;
  };
  const handleCompress = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', image);
      formData.append('quality', quality);

      const response = await axios.post(
        `${BACKEND_URL}/compressimage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setIsLoading(false);
      navigation.push('Download', response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleTextChange = (text: string) => {
    const parsedNumber = parseFloat(text);
    if (!isNaN(parsedNumber)) {
      setQuality(parsedNumber);
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      {image && (
        <View style={styles.preview}>
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
              setImage(res[0]);
            })
            .catch(err => {
              console.error(err);
            });
        }}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>
      {image && (
        <TextInput
          style={[styles.quality]}
          onChangeText={handleTextChange}
          value={quality.toString()}
          placeholder="Enter between 20-80"
          keyboardType="numeric"
        />
      )}
      {image && (
        <TouchableOpacity
          style={[styles.customButton, styles.Button]}
          onPress={() => {
            if (checkQuality()) handleCompress();
          }}>
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
  preview: {
    margin: 10,
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
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
  quality: {
    borderWidth: 1,
    borderRadius: 3,
    width: '80%',
    marginBottom: 5,
    fontSize: 18,
  },
});

export default CompressImg;
