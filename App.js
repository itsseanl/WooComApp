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

const App: () => React$Node = () => {
  //API data
  const customData = require('./API.json');

  //fontawesome icons
  const shoppingCart = <Icon name="shopping-cart" size={40} color="#1F72BD" />;
  const bars = <Icon name="bars" size={40} color="#1F72BD" />;

  //menu vars
  const [openMenu, setOpenMenu] = useState(false);

  //searchType -- changing will change fetch request on homepage
  const [searchType, setSearchType] = useState(
    'https://baseecom.sparkrefinery.com/wp-json/wc/v3/products',
  );

  function handleOpenMenu() {
    setOpenMenu(!openMenu);
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
              <Text>{shoppingCart}</Text>
            </View>
          </View>

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <Home customData={customData} searchType={searchType} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Menu
        handleOpenMenu={handleOpenMenu}
        openMenu={openMenu}
        customData={customData}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default App;
