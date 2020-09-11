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
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = ({openMenu, handleOpenMenu, customData}) => {
  //fontawesome icons
  const times = <Icon name="times" size={40} color="#1F72BD" />;

  //menu vars
  //   const [openMenu, setOpenMenu] = useState(false);
  const [animValue, setAnimValue] = useState(
    -(Dimensions.get('window').width / 2),
  );
  const slideAnim = useRef(new Animated.Value(animValue)).current;

  //slideout effect
  useEffect(() => {
    if (animValue == -(Dimensions.get('window').width / 2)) {
      setAnimValue(0);
    } else {
      setAnimValue(-(Dimensions.get('window').width / 2));
    }
    Animated.timing(slideAnim, {
      toValue: animValue,
      duration: 500,
      useNativeDriver: true, // <-- Add this
    }).start();
  }, [openMenu]);

  console.log(openMenu);

  return (
    <>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{translateX: slideAnim}],
          },
        ]}
        onPress={(e) => stopPropagation()}>
        {/* //openMenu ? styles.openMenu : styles.closedMenu */}
        <Text>Test Menu</Text>
        <TouchableOpacity
          onPress={() => handleOpenMenu(!openMenu)}
          style={styles.closeMenu}>
          <Text>{times}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'white',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width / 2,
    top: 0,
    left: 0,
    zIndex: 9999999,
    elevation: 999,
    overflow: 'visible',
    flex: 1,
  },
  closeMenu: {
    height: 50,
    width: 50,
    flex: 1,
    borderWidth: 2,
    borderColor: 'green',
    elevation: 11,
    position: 'absolute',
    zIndex: 9999999999,
  },
});

export default Menu;
