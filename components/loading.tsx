import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from '../styles/globalStyles';

type loadingProps = {
  label: string;
};

const Loading = (props: loadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.lightText}>{props.label}...</Text>
    </View>
  );
};

export default Loading;
