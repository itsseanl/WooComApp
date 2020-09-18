import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

const Search = ({customData}) => {
  const [text, setText] = useState('');
  const [gotResults, setGotResults] = useState(false);
  const [products, setProducts] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  var myHeaders = new Headers();

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
        setProducts(JSON.parse(result));
        setGotResults(true);
      })
      .catch((error) => console.log('error', error));
  }, []);

  function handleTextUpdate(text) {
    let results = [];

    products.map((product) => {
      if (
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.categories[0].name.toLowerCase().includes(text.toLowerCase())
      ) {
        // console.log(product);
        results.push(product);
      }
    });
    setSearchResults(results);
  }

  return (
    <>
      <View style={styles.search}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => handleTextUpdate(text)}
          onBlur={() => setSearchResults([])}
          defaultValue={text}
        />
      </View>
      <View style={styles.searchResults}>
        {searchResults.map((result) => {
          return (
            <View key={result.name} style={styles.result}>
              <Image
                key={result.images[0].src}
                source={{uri: result.images[0].src}}
                style={styles.image}
              />
              <Text key={result.id} style={styles.resultText}>
                {result.name}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  search: {
    padding: 10,

    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: 250,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white',
  },
  searchResults: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
  },
  result: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  resultText: {
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Search;
