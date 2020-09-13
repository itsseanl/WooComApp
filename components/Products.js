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

const Products = ({results, handleAddToCart}) => {
  //   console.log(typeof results);
  // console.log(results);
  results = JSON.parse(results);
  // console.log('Products: ' + typeof results);
  return (
    <>
      {results.map((product, index) => {
        return (
          <View key={product + index} style={styles.productsList}>
            <Image
              key={product.name + index}
              source={{uri: product.images[0].src}}
              style={styles.image}
            />
            <Text>{product.name}</Text>
            <Text>${product.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddToCart(product.id)}>
              <Text style={styles.buttonText}>Quick Add</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  productsList: {
    margin: 15,
    padding: 5,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    zIndex: 1,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 5,
  },
  button: {
    padding: 5,
    backgroundColor: '#1E73BE',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default Products;
