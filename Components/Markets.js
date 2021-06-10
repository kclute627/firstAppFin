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
import MarketsBox from './MarketsBox';
import axios from 'axios';
import {dummyData} from '../Utils/data';
import {apiKey} from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Markets = () => {
  const [markets, marketsHandler] = useState([
    {
      name: 'Dow Jones',
      symbol: 'dji',
      values: [],
    },
    {
      name: 'S & P 500',
      symbol: 'GSPC',
      values: [],
    },
    {
      name: 'NASDAQ',
      symbol: 'IXIC',
      values: [],
    },
  ]);
  console.log(markets, 'markets');
  useEffect(() => {
    // get the current market data on refresh
    // getMarkets(markets);

    marketsHandler(dummyData);
    // console.log(markets);
  }, []);

  // function to call api and get market info once we get it set the state
  // on refresh

  // const getMarkets = async marketArr => {
  //   // set loading state?
  //   const marketData = marketArr.map(async cur => {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://twelve-data1.p.rapidapi.com/time_series',
  //       params: {
  //         symbol: cur.symbol,
  //         interval: '15min',
  //         outputsize: '35',
  //         format: 'json',
  //       },
  //       headers: {
  //         'x-rapidapi-key':
  //           '697b9cb54amshb10e0e02140e6e7p19880ejsna94d35833c95',
  //         'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
  //       },
  //     };
  //     try {
  //       const result = await axios.request(options);
  //       const newData = {
  //         name: cur.name,
  //         symbol: cur.symbol,
  //         values: [...result.data.values],
  //       };
  //       return newData;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   const PArr = Promise.all(marketData).then(value => value);
  //   Promise.resolve(PArr).then(value => marketsHandler(value));
  //   // placeholder so I do not use all my api requests
  //   // marketsHandler(marketArr)
  // };
  // make a dataHelper pulling out only the necessary items

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Markets</Text>
      <FlatList
        style={{flexDirection: 'row'}}
        horizontal={true}
        data={markets}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => <MarketsBox item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 22,
    borderRadius: 14,
    padding: 19,
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 19,
    textAlign: 'center'

  }
});

export default Markets;
