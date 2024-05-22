import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    fontSize: 20,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
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
    maxWidth: '80%',
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
  quality: {
    borderWidth: 1,
    borderRadius: 3,
    width: '80%',
    marginBottom: 5,
    fontSize: 18,
  },
  downloadButton: {
    width: '80%',
    backgroundColor: '#3498DB',
    padding: 8,
    margin: 5,
  },
});
