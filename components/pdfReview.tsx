import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from '../styles/globalStyles';
import {InputFile} from '../utils/types';

interface propTypes {
  selectedFile: InputFile;
}

const PdfReview = (props: propTypes) => {
  const {selectedFile} = props;
  return (
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
  );
};

export default PdfReview;
