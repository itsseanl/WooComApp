/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Search from './components/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './components/Home';
import SideMenu from 'react-native-side-menu';

const App: () => React$Node = () => {
  const shoppingCart = <Icon name="shopping-cart" size={40} color="#1F72BD" />;
  const bars = <Icon name="bars" size={40} color="#1F72BD" />;
  const times = <Icon name="times" size={40} color="#1F72BD" />;

  const [openMenu, setOpenMenu] = useState(false);
  function menu() {}
  console.log(openMenu);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Animated.View style={openMenu ? styles.openMenu : styles.closedMenu}>
            <Text>Test Menu</Text>
            <TouchableOpacity
              onPress={() => setOpenMenu(!openMenu)}
              style={styles.headerIcons}>
              <Text>{times}</Text>
            </TouchableOpacity>
          </Animated.View>
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
    </>
  );
};

const styles = StyleSheet.create({
  openMenu: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    borderWidth: 5,
    borderColor: 'black',

    position: 'absolute',
    backgroundColor: 'white',
    height: 1000,
    width: 400,
    top: 0,
    left: 0,
    zIndex: 99,
    transform: [{translateX: -200}],
  },
  closedMenu: {
    display: 'flex',

    alignItems: 'flex-end',
    borderWidth: 5,
    borderColor: 'black',
    position: 'absolute',
    backgroundColor: 'red',
    height: 1000,
    width: 400,
    top: 0,
    left: 0,
    zIndex: 99,

    transform: [{translateX: -400}],
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    zIndex: 1,
    position: 'relative',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },

  header: {
    color: '#1F72BD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    height: 90,
    flexDirection: 'column',
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
