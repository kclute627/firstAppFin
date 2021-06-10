import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {xapi} from '../config'
import axios from 'axios';

const StockScreen = ({route}) => {
  const [loading, loadingHandler] = useState(false);
  const [currentStockInfo, updateStockInfo] = useState([])

console.log(route.params['1. symbol'], 'route')

const symbol = route.params['1. symbol']
const shortname = route.params['2. name']

  // useEffect(() => {
  //   getStockInfo(symbol);
    
  // }, []);

  const getStockInfo = async ticker => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
      params: {region: 'US', symbols: ticker},
      headers: {
        'x-rapidapi-key': xapi,
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    };

    try {
      const data = await axios.request(options);
      const {
        data: {
          quoteResponse: {result},
        },
      } = data;
      
      updateStockInfo(result)
      console.log(currentStockInfo)
      loadingHandler(false);
    } catch (error) {
      console.log(error);
    }  
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {!loading && (
        <Text>
          {shortname} {symbol}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StockScreen;
