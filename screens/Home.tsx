import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ItemData {
  id: number;
  name: string;
}

type ItemProps = {
  item: ItemData;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, backgroundColor, textColor}: ItemProps) => {
  return (
    <TouchableOpacity style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
      <Text>
        <AntDesign name="right" size={30} color={textColor} />
      </Text>
    </TouchableOpacity>
  );
};

const features = [
  {id: 1, name: 'Compress PDF', route: 'CompressPDF'},
  {id: 2, name: 'Compress Image', route: 'CompressPDF'},
  {id: 3, name: 'Convert pdf to word', route: 'CompressPDF'},
];
const Home = () => {
  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = '#2475B0';
    const textColor = '#ffffff';
    return (
      <Item
        item={item}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    );
  };
  return (
    <SafeAreaView>
      <FlatList data={features} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default Home;
