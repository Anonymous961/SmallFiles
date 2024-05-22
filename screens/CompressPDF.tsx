import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import {styles} from '../styles/globalStyles';
import Loading from '../components/loading';
import {InputFile} from '../utils/types';
import PdfReview from '../components/pdfReview';

const compressType = [
  {name: 'screen', value: 'screen', id: 'screen'},
  {name: 'ebook', value: 'ebook', id: 'ebook'},
  {name: 'printer', value: 'printer', id: 'printer'},
  {name: 'prepress', value: 'prepress', id: 'prepress'},
];

const CompressPDF = ({navigation}) => {
  const [selectedFile, setSelectedFile] = useState<InputFile | null>(null);
  const [pdfType, setPdfType] = useState('screen');
  const [isLoading, setIsLoading] = useState(false);
  const handleCompress = async () => {
    console.log('Compress clicked');
    console.log('file is ', selectedFile, ' and type is ', pdfType);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile?.uri,
        name: selectedFile?.name,
        type: selectedFile?.type,
      });
      formData.append('quality', pdfType);
      const res = await axios.post(`${BACKEND_URL}/compresspdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setIsLoading(false);
      navigation.push('Download', res.data);
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
              console.log(res[0]);
              setSelectedFile(res[0]);
            })
            .catch(err => {
              console.error(err);
            });
        }}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Picker
          style={styles.picker}
          selectedValue={pdfType}
          onValueChange={itemValue => setPdfType(itemValue)}>
          {compressType.map(type => (
            <Picker.Item key={type.id} label={type.name} value={type.value} />
          ))}
        </Picker>
      )}
      {selectedFile && (
        <TouchableOpacity
          style={[styles.customButton, styles.Button]}
          onPress={handleCompress}>
          <Text style={styles.buttonText}>Compress PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <Loading label="Compressing" />
  );
};

export default CompressPDF;
