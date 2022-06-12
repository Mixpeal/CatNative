import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import EachCat from '../components/cats/EachCat';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';


export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [cats, setCats] = useState([]);
    const [page, setPage] = useState(0);
    const isFocused = useIsFocused();

    const handleResult = (result) => {
        setLoading(false);
        setPage(page + 1)
        setCats([...cats, ...result.data]);
        if (result.data && result.data.length == 0) {
            setLoaded(true)
            Toast.show('End of the line 🎉');
        }
    }
    const fetchData = async () => {
        if (!loading && !loaded) {
            setHasError(false)
            setLoading(true);
            await axios.get(`https://api.thecatapi.com/v1/breeds?limit=20&page=${page}`)
                .then(result => handleResult(result))
                .catch(error => setHasError(true))
        }
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(0)
        setLoaded(false)
        fetchData().then(() => setRefreshing(false));
    }, [isFocused]);


    useEffect(() => {
        fetchData();
    }, [isFocused])

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            {!hasError && cats.length > 0 ?
                <FlatList
                    initialNumToRender={20}
                    data={cats}
                    testID="cat-list"
                    renderItem={({ item }) => <EachCat item={item} />}
                    keyExtractor={(item) => "item_" + item['id']}
                    onEndReachedThreshold={0.01}
                    onEndReached={(info) => fetchData(info)}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                /> :

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {(loading || refreshing) && !hasError ? (
                        <View style={{ paddingVertical: 10 }}>
                            <ActivityIndicator testId="loading-indicator" size={40} color="red" />
                        </View>
                    ) : <View>
                        <Text style={{ color: '#d3d3d4', textAlign: 'center', marginBottom: 20 }}>Something went wrong</Text>
                        <TouchableWithoutFeedback onPress={onRefresh}>
                            <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }} testID="tapToRetry" >Tap to retry</Text>
                        </TouchableWithoutFeedback>
                    </View>}

                </View>
            }

            {(loading || refreshing) && !hasError && cats.length > 0 ? (
                <View style={{ paddingVertical: 10 }}>
                    <ActivityIndicator color="red" />
                </View>
            ) : null}
        </View >
    );
}

