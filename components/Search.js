import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';

const Search = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={(text) => setText(text)}
        defaultValue={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 10,

    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: 300,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default Search;
