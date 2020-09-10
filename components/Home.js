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
const Home = () => {
  const customData = require('../API.json');

  const [gotResults, setGotResults] = useState(false);
  var myHeaders = new Headers();
  const [products, setProducts] = useState('');

  useEffect(() => {
    myHeaders.append('Authorization', `Basic ${customData.API[0].basicAuth}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://baseecom.sparkrefinery.com/wp-json/wc/v3/products',
      requestOptions,
    )
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
        <Products results={products} />
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
