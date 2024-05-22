import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import {BACKEND_URL} from '@env';
import axios from 'axios';
import {styles} from '../styles/globalStyles';
import Loading from '../components/loading';
import {ImageType} from '../utils/types';

const CompressImg = ({navigation}) => {
  const [image, setImage] = useState<ImageType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState<string>('');
  const checkQuality = () => {
    if (quality !== '') {
      let value = parseFloat(quality);
      if (!(value >= 20 && value <= 90)) {
        Alert.alert('Invalid quality entered');
        return false;
      }
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
      setQuality(text);
    }
    if (parsedNumber === 0 || text === '') {
      setQuality('');
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
          value={quality}
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
    <Loading label="Compressing" />
  );
};

export default CompressImg;
