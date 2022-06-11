import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';

const Tab = createBottomTabNavigator();
export default function MainTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerStyle: { backgroundColor: '#fff', elevation: 0 },
                    headerTitleStyle: { marginLeft: 10, fontSize: 16, fontWeight: "600", lineHeight: 24 },
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'All Cats') {
                            return <Svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <G clip-path="url(#clip0_1_487)">
                                    <Path d="M26.37 19.812L26.422 19.552L23.666 19.058C24.576 17.758 25.304 16.172 25.382 14.378C25.434 13 25.096 11.596 24.472 10.296C25.148 8.97002 26.058 6.60402 25.772 3.69202C25.642 2.41802 25.33 1.35202 24.992 0.52002C23.9 0.72802 22.314 1.17002 20.65 2.10602C19.454 2.75602 18.518 3.51002 17.842 4.16002C16.49 3.61402 15.034 3.30202 13.552 3.30202C12.044 3.30202 10.588 3.61402 9.262 4.16002C8.56 3.51002 7.624 2.78202 6.454 2.10602C4.686 1.17002 3.126 0.75402 2.034 0.52002C1.696 1.35202 1.358 2.41802 1.254 3.69202C0.968003 6.60402 1.878 8.97002 2.554 10.296C1.93 11.622 1.592 13.026 1.644 14.378C1.722 16.172 2.424 17.758 3.36 19.058L0.578003 19.578L0.630003 19.838L3.516 19.318C3.802 19.708 4.114 20.072 4.426 20.436L1.982 21.554L2.086 21.788L4.608 20.618C4.92 20.93 5.232 21.242 5.518 21.502L2.684 23.842L2.84 24.024L5.726 21.658C6.532 22.36 7.234 22.854 7.572 23.088C8.794 23.946 10.822 25.35 13.5 25.454C16.178 25.324 18.206 23.946 19.428 23.088C19.766 22.854 20.468 22.36 21.274 21.658L24.16 24.024L24.316 23.816L21.482 21.476C21.768 21.216 22.08 20.904 22.392 20.592L24.914 21.762L25.018 21.528L22.574 20.41C22.886 20.072 23.198 19.708 23.484 19.292L26.37 19.812ZM21.066 3.71802C22.106 3.17202 23.042 2.91202 23.718 2.80802C23.926 3.27602 24.134 3.90002 24.212 4.65402C24.394 6.37002 23.822 7.74802 23.406 8.50202C22.366 7.07202 20.988 5.82402 19.376 4.91402C19.792 4.52402 20.338 4.10802 21.066 3.71802ZM2.788 4.65402C2.866 3.92602 3.074 3.30202 3.282 2.80802C3.958 2.93802 4.92 3.17202 5.934 3.71802C6.662 4.10802 7.208 4.52402 7.624 4.88802C6.012 5.79802 4.634 7.07202 3.594 8.47602C3.178 7.74802 2.632 6.34402 2.788 4.65402ZM8.144 14.378C6.22 13.78 5.44 12.168 5.31 11.908C5.7 11.596 6.532 11.05 7.624 11.024C9.288 10.998 10.9 12.142 11.706 13.936C11.472 14.092 9.964 14.924 8.144 14.378ZM14.228 18.59C13.968 18.928 13.708 19.188 13.5 19.37C13.292 19.24 12.98 18.98 12.72 18.59C12.512 18.278 12.382 17.992 12.33 17.784C12.642 17.706 13.032 17.628 13.526 17.628C13.838 17.628 14.254 17.654 14.722 17.784C14.592 18.018 14.462 18.304 14.228 18.59ZM19.376 11.05C20.494 11.076 21.3 11.622 21.69 11.934C21.586 12.194 20.78 13.806 18.856 14.378C17.01 14.924 15.528 14.118 15.268 13.962C16.1 12.142 17.712 10.998 19.376 11.05Z" fill={focused ? '#212227' : '#d3d3d4'} />
                                </G>
                                <Defs>
                                    <ClipPath id="clip0_1_487">
                                        <Rect width="26" height="26" fill="white" transform="translate(0.5)" />
                                    </ClipPath>
                                </Defs>
                            </Svg>

                        } else if (route.name === 'Cats I Like') {
                            return <Svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M23.0767 4.99419C22.5233 4.44061 21.8664 4.00147 21.1433 3.70187C20.4202 3.40226 19.6452 3.24805 18.8625 3.24805C18.0798 3.24805 17.3048 3.40226 16.5817 3.70187C15.8586 4.00147 15.2016 4.44061 14.6483 4.99419L13.5 6.14252L12.3517 4.99419C11.234 3.87652 9.71812 3.24863 8.1375 3.24863C6.55688 3.24863 5.041 3.87652 3.92333 4.99419C2.80566 6.11186 2.17776 7.62774 2.17776 9.20836C2.17776 10.789 2.80566 12.3049 3.92333 13.4225L5.07166 14.5709L13.5 22.9992L21.9283 14.5709L23.0767 13.4225C23.6302 12.8692 24.0694 12.2122 24.369 11.4892C24.6686 10.7661 24.8228 9.99105 24.8228 9.20836C24.8228 8.42566 24.6686 7.65064 24.369 6.92756C24.0694 6.20448 23.6302 5.54751 23.0767 4.99419Z" fill={focused ? '#212227' : '#d3d3d4'} stroke={focused ? '#212227' : '#d3d3d4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>

                        }
                    },
                    tabBarActiveTintColor: '#212227',
                    tabBarInactiveTintColor: '#d3d3d4',
                    tabBarStyle: {
                        backgroundColor: '#F9F9F9',
                        height: 80,
                        elevation: 0
                    },
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarItemStyle: {
                        margin: 15
                    },
                })}
            >
                <Tab.Screen name="All Cats" component={Home} />
                <Tab.Screen name="Cats I Like" component={Favourites} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
