/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Search from './components/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
const App: () => React$Node = () => {
  //API data
  const customData = require('./API.json');

  //fontawesome icons
  const shoppingCart = <Icon name="shopping-cart" size={40} color="#1F72BD" />;
  const bars = <Icon name="bars" size={40} color="#1F72BD" />;

  //menu vars
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  //cart count
  const [addToCart, setAddToCart] = useState(0);
  //cart contents
  const [cartContents, setCartContents] = useState([]);
  //searchType -- changing will change fetch request on homepage
  const [searchType, setSearchType] = useState(
    'https://baseecom.sparkrefinery.com/wp-json/wc/v3/products',
  );

  //function to allow updating cart count
  function handleAddToCart(id) {
    console.log(addToCart);
    let theCart = cartContents;
    theCart.push(id);
    setCartContents(theCart);
    console.log(theCart);
    setAddToCart(addToCart + 1);
  }
  //menu to allow Menu.js to update searchType
  function handleSearchType(newSearch) {
    console.log(newSearch);
    setOpenMenu(!openMenu);
    setSearchType(newSearch);
  }

  //function to allow Menu.js to update menu position
  function handleOpenMenu() {
    setOpenMenu(!openMenu);
  }

  function handleOpenCart() {
    setOpenCart(!openCart);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setOpenMenu(!openMenu)}
              style={styles.headerIcons}>
              <Text>{bars}</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.titleText}>BaseEcom</Text>
              <Search />
            </View>
            <View style={styles.headerIcons} size={30}>
              <Text key={addToCart} style={styles.cartNum}>
                {addToCart}
              </Text>
              <TouchableOpacity
                onPress={() => setOpenCart(!openCart)}
                style={styles.headerIcons}>
                <Text>{shoppingCart}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <Home
              key={searchType}
              customData={customData}
              searchType={searchType}
              handleAddToCart={handleAddToCart}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Menu
        handleOpenMenu={handleOpenMenu}
        handleSearchType={handleSearchType}
        openMenu={openMenu}
        customData={customData}
      />
      <Cart
        customData={customData}
        handleOpenCart={handleOpenCart}
        openCart={openCart}
        cartContents={cartContents}
      />
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
    width: Dimensions.get('window').width / 2,
    top: 0,
    right: 0,
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
  scrollView: {
    backgroundColor: Colors.lighter,
    zIndex: 1,
  },
  engine: {
    right: 0,
  },
  header: {
    color: '#1F72BD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerIcons: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 90,
    width: 50,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    elevation: 1,
  },
  titleText: {
    color: '#1F72BD',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  body: {
    backgroundColor: Colors.white,
    color: 'red',
  },
  cartNum: {
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    height: 25,
    width: 25,
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 3,
    zIndex: 99,
    top: 42,
    right: 10,
  },
});

export default App;
