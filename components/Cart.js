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
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
import CartItem from './CartItem';
const Cart = ({
  customData,
  cartContents,
  handleOpenCart,
  handleRemoveFromCart,
  openCart,
}) => {
  //fontawesome icons
  const times = <Icon name="times" size={30} color="#1F72BD" />;

  //menu vars
  const [animValue, setAnimValue] = useState(Dimensions.get('window').width);
  const slideAnim = useRef(new Animated.Value(animValue)).current;

  //slideout effect
  useEffect(() => {
    if (animValue == Dimensions.get('window').width) {
      setAnimValue(0);
    } else {
      setAnimValue(Dimensions.get('window').width);
    }
    Animated.timing(slideAnim, {
      toValue: animValue,
      duration: 200,
      useNativeDriver: true, // <-- Add this
    }).start();
  }, [openCart]);

  console.log(openCart);

  let findDuplicates = (cartContents) =>
    cartContents.filter((item, index) => cartContents.indexOf(item) != index);

  let duplicates = findDuplicates(cartContents); // All duplicates

  console.log(duplicates);
  return (
    <>
      <Animated.View
        style={[styles.cart, {transform: [{translateX: slideAnim}]}]}>
        <TouchableOpacity
          onPress={() => handleOpenCart()}
          style={styles.closeMenu}>
          <Text>{times}</Text>
        </TouchableOpacity>
        {cartContents ? (
          cartContents.map((product) => {
            return (
              <CartItem
                key={product}
                product={product}
                customData={customData}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            );
          })
        ) : (
          <></>
        )}
      </Animated.View>
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

export default Cart;
