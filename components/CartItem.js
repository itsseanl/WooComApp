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
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const CartItem = ({product, customData}) => {
  var myHeaders = new Headers();

  const [item, setItem] = useState('');
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
          setItem(JSON.parse(result));
          console.log(result.name);
        })
        .catch((error) => console.log('error', error));
    }
  }, []);
  console.log(item.name);
  return (
    <>
      {item ? (
        <View>
          <Image source={{uri: item.images[0].src}} style={styles.image} />
          <Text>{item.name}</Text>
          <View style={styles.qty}>
            <Text>Qty:</Text>
            <TextInput style={styles.textInput}>1</TextInput>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  qty: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'gray',
    width: 40,
    padding: 0,
    paddingLeft: 5,
    height: 20,
  },
  btn: {
    backgroundColor: '#1F72BD',
    width: 100,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
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
