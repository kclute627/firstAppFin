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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../Components/Searchbar';
import Markets from '../Components/Markets';

const HomeScreen = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar navigate={navigate} />

      <View style={styles.middle}>
        <TouchableOpacity onPress={() => navigate('Search Modal')}>
          <Text>My Stocks</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Markets navigate={navigate} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  middle: {
    flex: 10,
  },
});

export default HomeScreen;
