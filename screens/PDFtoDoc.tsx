import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';

interface InputFile {
  name: string;
  size: number;
  type: string;
}

const PDFtoDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<InputFile | null>(null);
  const handleConvert = () => {
    try {
      setIsLoading(true);
      console.log(selectedFile);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      {selectedFile && (
        <View style={styles.preview}>
          <Image source={require('../assests/images/pdf-icon.png')} />
          <Text style={[styles.field, styles.lightText]}>
            File Name:
            <Text style={styles.file}>{selectedFile.name}</Text>
          </Text>
          <Text style={[styles.field, styles.lightText]}>
            File Size:
            <Text style={styles.file}>{selectedFile.size / 1000} kb</Text>
          </Text>
        </View>
      )}
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
        <TouchableOpacity
          style={[styles.customButton, styles.Button]}
          onPress={handleConvert}>
          <Text style={styles.buttonText}>Compress PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <ActivityIndicator size={'large'} />
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
  picker: {
    borderWidth: 2,
    margin: 5,
    width: '80%',
    borderColor: 'gray',
    color: 'white',
    backgroundColor: '#616C6F',
    borderRadius: 5,
  },
});

export default PDFtoDoc;
