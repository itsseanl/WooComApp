import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const MenuCats = ({categories}) => {
  //   console.log(typeof results);
  categories = JSON.parse(categories);
  return (
    <>
      {categories.map((category, index) => {
        return <Text key={category.name}>{category.name}</Text>;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: '#1E73BE',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default MenuCats;
