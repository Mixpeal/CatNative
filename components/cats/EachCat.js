import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Svg, { Path, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

export default function EachCat({ item }) {
    const [adding, setAdding] = useState(false);
    const [faved, setFaved] = useState(false);
    const storageKey = '@favs';
    const getFavs = async () => {
        const favs = await AsyncStorage.getItem(storageKey)
        return favs != null ? JSON.parse(favs) : []
    }
    const isFaved = async () => {
        const storageKey = '@favs';
        const favs = await AsyncStorage.getItem(storageKey)
        let favList = favs != null ? JSON.parse(favs) : []
        setFaved(favList.some(fav => fav['id'] === item['id']));
    }
    useEffect(() => {
        isFaved();
    }, [adding])
    const toggleFavs = async (fav) => {
        try {
            if (!adding) {
                setAdding(true)
                let parsedFavs = await getFavs();
                let holder;
                let msg;
                if (parsedFavs.some(pf => pf['id'] == fav['id'])) {
                    holder = JSON.stringify(parsedFavs.filter(pf => pf['id'] != fav['id']));
                    msg = "Cat removed from favorites"
                }
                else {
                    const newFavs = [fav, ...parsedFavs]
                    holder = JSON.stringify(newFavs);
                    msg = "Cat added to favorites"
                }
                try {
                    await AsyncStorage.setItem(storageKey, holder)
                    setAdding(false)
                    Toast.show(msg);
                } catch (e) {
                    setAdding(false)
                    console.warn(e);
                }
            }
        } catch (e) {
            console.warn(e);
        }
    };
    return (

        <View style={styles.eachItem} testID="cat-item">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={styles.catPhoto}
                    source={{
                        uri: `${item['image'] ? item['image']['url'] : 'https://reactnative.dev/img/tiny_logo.png'}`,
                    }}
                />
                <Text style={styles.catName} testID="cat-name">{item['name']}</Text>
            </View>
            <TouchableWithoutFeedback
                onPress={() => toggleFavs(item)}>
                <View style={{ paddingLeft: 25, paddingVertical: 10 }}>
                    {faved ?
                        <Svg width="18" height="16" TouchableWithoutFeedbackBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M15.63 2.45753C15.247 2.07428 14.7921 1.77026 14.2915 1.56284C13.7909 1.35542 13.2544 1.24866 12.7125 1.24866C12.1707 1.24866 11.6341 1.35542 11.1335 1.56284C10.6329 1.77026 10.1781 2.07428 9.79503 2.45753L9.00003 3.25253L8.20503 2.45753C7.43126 1.68376 6.3818 1.24906 5.28753 1.24906C4.19325 1.24906 3.1438 1.68376 2.37003 2.45753C1.59626 3.23129 1.16156 4.28075 1.16156 5.37502C1.16156 6.4693 1.59626 7.51876 2.37003 8.29252L3.16503 9.08752L9.00003 14.9225L14.835 9.08752L15.63 8.29252C16.0133 7.90946 16.3173 7.45464 16.5247 6.95404C16.7321 6.45345 16.8389 5.91689 16.8389 5.37502C16.8389 4.83316 16.7321 4.2966 16.5247 3.79601C16.3173 3.29542 16.0133 2.84059 15.63 2.45753Z" fill="#DE0202" stroke="#DE0202" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg> :
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <G opacity="0.3">
                                <Path d="M15.63 3.45753C15.2469 3.07428 14.7921 2.77026 14.2915 2.56284C13.7909 2.35542 13.2544 2.24866 12.7125 2.24866C12.1706 2.24866 11.6341 2.35542 11.1335 2.56284C10.6329 2.77026 10.1781 3.07428 9.795 3.45753L9 4.25253L8.205 3.45753C7.43123 2.68376 6.38177 2.24906 5.2875 2.24906C4.19322 2.24906 3.14377 2.68376 2.37 3.45753C1.59623 4.23129 1.16153 5.28075 1.16153 6.37502C1.16153 7.4693 1.59623 8.51876 2.37 9.29252L3.165 10.0875L9 15.9225L14.835 10.0875L15.63 9.29252C16.0132 8.90946 16.3173 8.45463 16.5247 7.95404C16.7321 7.45345 16.8389 6.91689 16.8389 6.37502C16.8389 5.83316 16.7321 5.2966 16.5247 4.79601C16.3173 4.29542 16.0132 3.84059 15.63 3.45753V3.45753Z" stroke="#212227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </G>
                        </Svg>}
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
