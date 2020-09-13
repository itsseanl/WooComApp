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
import MenuCats from './MenuCats';

const Menu = ({openMenu, handleOpenMenu, handleSearchType, customData}) => {
  //fontawesome icons
  const times = <Icon name="times" size={30} color="#1F72BD" />;

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
      duration: 200,
      useNativeDriver: true, // <-- Add this
    }).start();
  }, [openMenu]);

  console.log(openMenu);

  const [categories, setCategories] = useState('');
  const [gotResults, setGotResults] = useState(false);
  var myHeaders = new Headers();
  useEffect(() => {
    myHeaders.append('Authorization', `Basic ${customData.API[0].basicAuth}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://baseecom.sparkrefinery.com/wp-json/wc/v3/products/categories',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        setCategories(result);
        setGotResults(true);
        console.log(categories);
      })
      .catch((error) => console.log('error', error));
  }, []);

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
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Categories</Text>
          <TouchableOpacity
            onPress={() => handleOpenMenu(!openMenu)}
            style={styles.closeMenu}>
            <Text>{times}</Text>
          </TouchableOpacity>
        </View>
        {gotResults && categories != '' ? (
          <MenuCats
            categories={categories}
            handleSearchType={handleSearchType}
          />
        ) : (
          <Image
            source={require('../public/loading.gif')}
            style={{width: 100, height: 100}}
          />
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width / 2,
    top: 0,
    left: 0,
    zIndex: 9999999,
    elevation: 10,
    overflow: 'visible',
    flex: 1,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  menuTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F72BD',
  },
  menuHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.lighter,
    height: 118,
  },
  closeMenu: {
    height: 50,
    width: 50,
    zIndex: 9999999999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
