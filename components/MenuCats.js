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

const MenuCats = ({categories, handleSearchType}) => {
  //   console.log(typeof results);
  categories = JSON.parse(categories);
  return (
    <View style={styles.menu}>
      <TouchableOpacity
        key="All"
        onPress={() =>
          handleSearchType(
            'https://baseecom.sparkrefinery.com/wp-json/wc/v3/products/',
          )
        }>
        <Text style={styles.menuItem}>All</Text>
      </TouchableOpacity>
      {categories.map((category, index) => {
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() =>
              handleSearchType(
                `https://baseecom.sparkrefinery.com/wp-json/wc/v3/products/?category=${category.id}`,
              )
            }>
            <Text style={styles.menuItem}>{category.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
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
  menuItem: {
    padding: 10,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  menu: {
    marginTop: 50,
  },
});
export default MenuCats;
