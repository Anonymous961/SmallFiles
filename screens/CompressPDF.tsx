import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {pick, types} from 'react-native-document-picker';

interface InputFile {
  name: string;
  size: number;
  type: string;
}

const CompressPDF = () => {
  const [selectedFile, setSelectedFile] = useState<InputFile | null>(null);
  return (
    <View style={styles.container}>
      {selectedFile && (
        <View style={styles.preview}>
          <Image source={require('../assests/images/pdf-icon.png')} />
          <Text style={[styles.field, styles.lightText]}>
            File Name:
            <Text style={styles.file}>{selectedFile.name}</Text>
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
        <TouchableOpacity style={[styles.customButton, styles.Button]}>
          <Text style={styles.buttonText}>Compress PDF</Text>
        </TouchableOpacity>
      )}
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

export default CompressPDF;
