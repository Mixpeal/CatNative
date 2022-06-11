import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import EachFav from '../components/favs/EachFav';
import { FlatGrid } from 'react-native-super-grid';
import Toast from 'react-native-simple-toast';


export default function Favourites() {
    const [favs, setFavs] = useState([]);
    const storageKey = '@favs';
    const isFocused = useIsFocused();

    const fetchFavs = async () => {
        try {
            const favs = await AsyncStorage.getItem(storageKey)
            const parsedFavs = JSON.parse(favs != null ? favs : "[]");
            setFavs(parsedFavs)
        } catch (e) {
            console.warn(e);
        }
    }

    const removeFav = async (id) => {
        try {
            const favs = await AsyncStorage.getItem(storageKey)
            const parsedFavs = JSON.parse(favs != null ? favs : "[]");
            const result = parsedFavs.filter(pf => pf['id'] != id);
            try {
                await AsyncStorage.setItem(storageKey, JSON.stringify(result))
                setFavs(result)
                Toast.show('Removed from the Cats you like');
            } catch (e) {
                console.warn(e);
            }
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        fetchFavs();
    }, [isFocused])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 25 / 2 }}>
            {favs.length > 0 ?
                <FlatGrid
                maxItemsPerRow={4}
                    itemDimension={150}
                    spacing={0}
                    data={favs}
                    renderItem={({ item }) =>
                        <EachFav item={item} removeFav={removeFav} />}
                    keyExtractor={(item) => "item_" + item['id']}

                /> : <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#d3d3d4'}}>Nothing is added here yet</Text></View>}
        </View>
    )
}
