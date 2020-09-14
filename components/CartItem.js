/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const CartItem = ({product}) => {
  var myHeaders = new Headers();
  useEffect(() => {
    if (product) {
      myHeaders.append('Authorization', `Basic ${customData.API[0].basicAuth}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch(
        `https://baseecom.sparkrefinery.com/wp-json/wc/v3/products/${product}`,
        requestOptions,
      )
        .then((response) => response.text())
        .then((result) => {
          setProducts(...result);
          setGotResults(true);
          console.log(products);
        })
        .catch((error) => console.log('error', error));
    }
  }, []);
  return (
    <>
      {product ? (
        product.map((product) => {
          return <Text>{product.name}</Text>;
        })
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cart: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    top: 0,
    right: 0,
    zIndex: 99999,
    elevation: 1111,
    overflow: 'visible',
    flex: 1,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
});

export default CartItem;
