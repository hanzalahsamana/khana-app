import * as React from 'react';
import { View, Text , StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements';
import AddDetails from './NeedyDetails';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import BranchMap from './map';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

function AddScreen() {

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </View>
    );
}

function OrderScreen() {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <AddDetails /> */}
            <BranchMap />

        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function NeedyDashboard() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState('')

    const CheckUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user)
            if (user) {

                setUserName(user.displayName)
                // ...
            } else {

                // User is signed out
                // ...
            }
        });
    }
    useEffect(() => {
        CheckUser()
    }, []);
    const LogOut = () => {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            navigation.navigate("SignIn")

        }).catch((error) => {
            // An error happened.
            console.log("erroe", error)
        })

    }

    return (

        <React.Fragment>
            <View style={{ width: "100%", height: 120, backgroundColor: "green", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <Text style={{ fontSize: 20, color: "white" }}>{userName}</Text>
                <TouchableOpacity style={styles.btn}  onPress={LogOut}>
                    <Text style={styles.btnText}>
                        log out
                    </Text>
                </TouchableOpacity>
            </View>
           
            <Tab.Navigator>




                <Tab.Screen name="Near By" component={OrderScreen}

                    options={{
                        headerShown: false,

                        tabBarIcon: () => (
                            <Icon
                                name='map'
                                color="green"
                                size={28}
                            />

                        )
                    }}
                />

                <Tab.Screen name="Status" component={AddScreen}
                    options={{
                        headerShown: false,

                        tabBarIcon: () => (
                            <Icon
                                name='list-alt'
                                color="green"
                                size={28}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'blue',
        height: 40,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 100
    
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textTransform: "capitalize"
    },


});

