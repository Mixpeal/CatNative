import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Svg, { Path, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

export default function EachCat({ item }) {
    const [adding, setAdding] = useState(false);
    const storageKey = '@favs';
    const getFavs = async () => {
        const favs = await AsyncStorage.getItem(storageKey)
        return favs != null ? JSON.parse(favs) : []
    }
    const storeFavs = async (fav) => {
        try {
            if (!adding) {
                setAdding(true)
                let parsedFavs = await getFavs();
                if (parsedFavs.some(pf => pf['id'] == fav['id'])) {
                    Toast.show('Already added to favorite');
                    setAdding(false)
                }
                else {
                    const newFavs = [fav, ...parsedFavs]
                    const holder = JSON.stringify(newFavs);
                    try {
                        await AsyncStorage.setItem(storageKey, holder)
                        setAdding(false)
                        Toast.show('Cat added to favorite');
                    } catch (e) {
                        setAdding(false)
                        console.warn(e);
                    }
                }
            }
        } catch (e) {
            console.warn(e);
        }
    };
    return (

        <View style={styles.eachItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={styles.catPhoto}
                    source={{
                        uri: `${item['image'] ? item['image']['url'] : 'https://reactnative.dev/img/tiny_logo.png'}`,
                    }}
                />
                <Text style={styles.catName}>{item['name']}</Text>
            </View>
            <TouchableWithoutFeedback
                onPress={() => storeFavs(item)}>
                <View style={{paddingLeft: 25, paddingVertical: 10}}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G opacity="0.3">
                            <Path d="M15.63 3.45753C15.2469 3.07428 14.7921 2.77026 14.2915 2.56284C13.7909 2.35542 13.2544 2.24866 12.7125 2.24866C12.1706 2.24866 11.6341 2.35542 11.1335 2.56284C10.6329 2.77026 10.1781 3.07428 9.795 3.45753L9 4.25253L8.205 3.45753C7.43123 2.68376 6.38177 2.24906 5.2875 2.24906C4.19322 2.24906 3.14377 2.68376 2.37 3.45753C1.59623 4.23129 1.16153 5.28075 1.16153 6.37502C1.16153 7.4693 1.59623 8.51876 2.37 9.29252L3.165 10.0875L9 15.9225L14.835 10.0875L15.63 9.29252C16.0132 8.90946 16.3173 8.45463 16.5247 7.95404C16.7321 7.45345 16.8389 6.91689 16.8389 6.37502C16.8389 5.83316 16.7321 5.2966 16.5247 4.79601C16.3173 4.29542 16.0132 3.84059 15.63 3.45753V3.45753Z" stroke="#212227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </G>
                    </Svg>
                </View>
            </TouchableWithoutFeedback>
        </View>

    )
}


const styles = StyleSheet.create({
    eachItem: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    catPhoto: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 15
    },
    catName: {
        color: '#212227',
        fontSize: 16,
        fontFamily: 'SF Pro Display'
    }
});