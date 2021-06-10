import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {apiKey} from '../config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Searchbar = ({navigate}) => {
  const [input, inputHandler] = useState('');
  const [loading, loadingHandler] = useState(false);
  const [searchArr, searchArrHandler] = useState([]);

  useEffect(() => {
    if (input.length > 1) {
      auto(input);
    }
    if (input.length <= 1) {
      searchArrHandler([]);
    }
  }, [input]);

  const auto = async sym => {
    const options = {
      method: 'GET',
      url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${sym}&apikey=${apiKey}`,
      

    };
    try {
      loadingHandler(true);
      const result = await axios.request(options);
      
      const {data} = result;


 
      const quoteArr = data.bestMatches.filter(
        cur =>
          cur['4. region'] === "United States" && cur['3. type'] === 'Equity' && parseFloat(cur['9. matchScore']) >= .6
          
      );
      
      searchArrHandler(quoteArr);
      loadingHandler(false);
    } catch (error) {
      loadingHandler(false);
    }
  };
  return (
    <View >
      <View style={styles.containerTop}>
        <Icon style={styles.mag} name="magnify" color="gray" size={30} />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Search Start Typing"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={inputHandler}
          value={input}
          selectionColor="black"
        />
      </View>
      {input.length > 1 && !loading && (
        <FlatList
          data={searchArr}
          keyExtractor={item => item['1. symbol']}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigate('Stock', item)}>
              <Text style={styles.items}>
                {item['2. name']} - {item['1. symbol']}
              </Text>
              <Icon name="star-circle-outline" color="gray" size={30} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No Results</Text>}
        />
      )}
      {loading && <ActivityIndicator size="large" color="blue" />}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 40,
    width: 325,
    fontSize: 20,
    paddingVertical: 10,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    marginTop: 26,
    position: 'relative',
    textAlign: 'left',
  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  mag: {
    paddingTop: 25,
    position: 'absolute',
    left: 40,
  },
  item: {
    paddingVertical: 5,
    fontSize: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 34,
  },
  items: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default Searchbar;
