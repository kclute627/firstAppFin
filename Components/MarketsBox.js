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
import {Svg} from 'react-native-svg';
import {LineChart, Grid} from 'react-native-svg-charts';

const MarketsBox = ({item}) => {
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);

  // make a dataHelper pulling out only the necessary items

  const dataHelper = value => {
    const price = parseFloat(parseFloat(value.high).toFixed(2));
    return price;
  };
  const dataHelper2 = value => {
    const price = parseFloat(value).toFixed(2);
    var nf = Intl.NumberFormat();
    return nf.format(price);
  };

  if (
    item.values.length > 1 &&
    (high !== item.values[item.values.length - 1].high ||
      low !== item.values[0].high)
  ) {
    setHigh(item.values[item.values.length - 1].high);
    setLow(item.values[0].high);
  }

  var nf = Intl.NumberFormat();

  const newValuesArr = item.values.map(cur => dataHelper(cur));
  return (
    <View style={styles.container}>
      <LineChart
        style={{height: 110, width: 110}}
        data={newValuesArr}
        svg={
          high < low ? {stroke: 'rgb(227, 5, 16)'} : {stroke: 'rgb(2, 181, 20)'}
        }
        contentInset={{top: 20, bottom: 20}}>
        <Grid />
      </LineChart>
      <View
        style={[
          styles.header,
          high > low ? styles.backgroundGreen : styles.backgroundRed,
        ]}>
        <Text style={[styles.text, styles.bold]}>{item.name}</Text>
        <Text style={[styles.text]}>{dataHelper2(high)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,

    borderRadius: 14,

    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    marginBottom: 7,

    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    shadowOpacity: 0.4,
    shadowRadius: 0,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    marginBottom: 3,
    textAlign: 'center',
    fontSize: 18,
  },
  backgroundGreen: {
    backgroundColor: 'green',
    color: 'white',
  },
  backgroundRed: {
    backgroundColor: 'red',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 19,
  }
});

export default MarketsBox;
