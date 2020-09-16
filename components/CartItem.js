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

const CartItem = ({product, customData, handleRemoveFromCart}) => {
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
    <View style={styles.cart}>
      {item ? (
        <View key={item.id + item.name} style={styles.cartItem}>
          <Image
            key={item.images[0].src}
            source={{uri: item.images[0].src}}
            style={styles.image}
          />
          <View key={item.id + item.images[0].src} style={styles.details}>
            <Text key={item.name} style={styles.itemTitle}>
              {item.name}
            </Text>
            <View key={'qtyview' + item.id} style={styles.qty}>
              <Text key={'qty' + item.id}>Qty:</Text>
              <TextInput key={'textInput' + item.id} style={styles.textInput}>
                1
              </TextInput>
            </View>
          </View>

          <View key={'btnWrapper' + item.id} style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.btn} key={'modify' + item.id}>
              <Text key={'editText' + item.id} style={styles.btnText}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleRemoveFromCart(item.id)}
              key={'remove' + item.id}>
              <Text key={'removeText' + item.id} style={styles.btnText}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    width: Dimensions.get('window').width - 20,
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 150,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
  },
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
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 2,
  },
  cart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartItem;
