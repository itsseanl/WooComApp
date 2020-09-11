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

const App: () => React$Node = () => {
  //fontawesome icons
  const shoppingCart = <Icon name="shopping-cart" size={40} color="#1F72BD" />;
  const bars = <Icon name="bars" size={40} color="#1F72BD" />;
  const times = <Icon name="times" size={40} color="#1F72BD" />;

  //menu vars
  const [openMenu, setOpenMenu] = useState(false);
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
            <Home />
          </View>
        </ScrollView>
      </SafeAreaView>

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
          onPress={() => setOpenMenu(!openMenu)}
          style={styles.closeMenu}>
          <Text>{times}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    overflow: 'visible',
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
  menuView: {
    flex: 1,
    elevation: 9999,
    // overflow: 'visible',
    display: 'flex',
    borderWidth: 5,
    borderColor: 'black',
    position: 'absolute',
    height: 150,
    width: 500,
    backgroundColor: 'red',

    zIndex: 9999,
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
});

export default App;
