import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Svg, { Path } from 'react-native-svg';


export default function EachFav({ item, removeFav }) {
    
    return (
        <View style={{marginBottom: 25, marginHorizontal: 25/2}}>
            <Image
                style={{ width: '100%', height: 150, borderRadius: 10, marginBottom: 10 }}
                source={{
                    uri: `${item['image'] ? item['image']['url'] : 'https://reactnative.dev/img/tiny_logo.png'}`,
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#212227', fontSize: 16, width: '80%' }} numberOfLines={1}>{item['name']}</Text>
                <TouchableWithoutFeedback onPress={() => removeFav(item['id'])}>
                    <Svg width="18" height="16" TouchableWithoutFeedbackBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.63 2.45753C15.247 2.07428 14.7921 1.77026 14.2915 1.56284C13.7909 1.35542 13.2544 1.24866 12.7125 1.24866C12.1707 1.24866 11.6341 1.35542 11.1335 1.56284C10.6329 1.77026 10.1781 2.07428 9.79503 2.45753L9.00003 3.25253L8.20503 2.45753C7.43126 1.68376 6.3818 1.24906 5.28753 1.24906C4.19325 1.24906 3.1438 1.68376 2.37003 2.45753C1.59626 3.23129 1.16156 4.28075 1.16156 5.37502C1.16156 6.4693 1.59626 7.51876 2.37003 8.29252L3.16503 9.08752L9.00003 14.9225L14.835 9.08752L15.63 8.29252C16.0133 7.90946 16.3173 7.45464 16.5247 6.95404C16.7321 6.45345 16.8389 5.91689 16.8389 5.37502C16.8389 4.83316 16.7321 4.2966 16.5247 3.79601C16.3173 3.29542 16.0133 2.84059 15.63 2.45753Z" fill="#DE0202" stroke="#DE0202" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
