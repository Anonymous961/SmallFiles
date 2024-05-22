import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import {styles} from '../styles/globalStyles';
import Loading from '../components/loading';
import {InputFile} from '../utils/types';
import PdfReview from '../components/pdfReview';

const PDFtoDoc = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<InputFile | null>(null);
  const handleConvert = async () => {
    try {
      setIsLoading(true);
      console.log(selectedFile);
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile?.uri,
        name: selectedFile?.name,
        type: selectedFile?.type,
      });
      const res = await axios.post(`${BACKEND_URL}/converttodoc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setIsLoading(false);
      navigation.push('Download', res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      {selectedFile && <PdfReview selectedFile={selectedFile} />}
      <TouchableOpacity
        style={[styles.selectButton, styles.Button]}
        onPress={() => {
          pick({
            mode: 'open',
            type: [types.pdf, types.docx],
          })
            .then(res => {
              setSelectedFile(res[0]);
            })
            .catch(err => {
              console.error(err);
            });
        }}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <TouchableOpacity
          style={[styles.customButton, styles.Button]}
          onPress={handleConvert}>
          <Text style={styles.buttonText}>Convert to Doc</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <Loading label="Converting" />
  );
};

export default PDFtoDoc;
