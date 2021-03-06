import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';

import Products from './Products';
const Home = ({customData, searchType, handleAddToCart}) => {
  // const customData = require('../API.json');
  console.log('home.js: ' + searchType);
  const [gotResults, setGotResults] = useState(false);
  const [products, setProducts] = useState('');

  var myHeaders = new Headers();

  useEffect(() => {
    myHeaders.append('Authorization', `Basic ${customData.API[0].basicAuth}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${searchType}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setProducts(result);
        setGotResults(true);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <View style={styles.search}>
      {gotResults && products != '' ? (
        <Products
          key={products}
          results={products}
          handleAddToCart={handleAddToCart}
        />
      ) : (
        <Image
          source={require('../public/loading.gif')}
          style={{width: 100, height: 100}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 10,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  searchBar: {
    width: 300,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default Home;
