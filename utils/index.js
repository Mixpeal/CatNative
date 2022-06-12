import AsyncStorage from '@react-native-async-storage/async-storage';

export const isFaved = async (id) => {
    const storageKey = '@favs';
    const favs = await AsyncStorage.getItem(storageKey)
    let favList = favs != null ? JSON.parse(favs) : []
    console.log(favList.some(fav => fav['id'] === id))
    return favList.some(fav => fav['id'] === id);
}