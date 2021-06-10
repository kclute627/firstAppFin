import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
const MarketsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Markets </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MarketsScreen
