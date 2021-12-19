
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import firebase from 'firebase'

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');

    const register = (e) => {

        // console.log('email', email)
        // console.log('password', password)

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                alert("Congratulation you have suucessfully login as buyer!")
                  navigation.navigate("NeedyDashboard")
                // console.log("auth done")

                user.updateProfile({
                    displayName: name
      
                  }).then(() => {
                    // Update successful
                    // console.log("profile updated")
                    // ...
                  }).catch((error) => {
                    // An error occurred
                console.log("error"  ,  error)
                alert("error" , error)

                    // ...
                  });


                firebase.firestore().collection(`user`).doc(user.uid).set({
                    name,
                    email,
                    country,
                    isAdmin: false,
                    userUID: user.uid
                })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        alert("Error writing document: ", error.message);
                    });

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("error" , errorMessage)
                // ..
            });


            setEmail('');
            setName('');
            setCountry('');
            setPassword('')
        e.preventDefault();
    }
    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.signupContainer}>
                    <View style={styles.ImageContainer}>
                        <Image
                            style={styles.Image}
                            source={require('../assets/logo.png')}
                            resizeMode="contain"
                        />
                    </View>


                    <Text style={styles.Headings}>Welcome to KhanaApp!</Text>

                    <View style={styles.Form}>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER YOUR NAME'
                                value={name}
                                onChangeText={(text)=> setName(text)}
                
                                leftIcon={
                                    <Icon
                                        style={styles.icon}

                                        name='user'
                                        size={24}
                                        color='green'
                                    />

                                }

                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER YOUR EMAIL '
                                value={email}
                                onChangeText={(text)=> setEmail(text)}
                
                                leftIcon={
                                    <Icon
                                        style={styles.icon}

                                        name='envelope'
                                        size={16}
                                        color='green'
                                    />

                                }

                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER YOUR COUNTRY '
                                value={country}
                                onChangeText={(text)=> setCountry(text)}
                
                                leftIcon={
                                    <Icon
                                        style={styles.icon}

                                        name='flag'
                                        size={16}
                                        color='green'
                                    />

                                }

                            />
                        </View>
     
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER YOUR PASSWORD'
                                value={password}
                                onChangeText={(text)=> setPassword(text)}

                
                                leftIcon={
                                    <Icon
                                        style={styles.icon}

                                        name='lock'
                                        size={24}
                                        color='green'
                                    />
                                }

                            />
                        </View>

                    </View>

                    <View style={styles.btnContainer}>

                        <TouchableOpacity style={styles.btn}onPress={register} >
                            <Text style={styles.btnText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', minHeight: 40, height: 40 }}>
                        <Text style={styles.redirect}>Already have an account?</Text>
                        <Pressable style={{ height: '100%', justifyContent: 'center', marginLeft: 5 }} onPress={() => navigation.navigate("SignIn")}>
                        
                            <Text style={styles.redirectLink}>Sign In</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    signupContainer: {
        // backgroundColor: 'black',
        height: Dimensions.get('window').height / 0.9,
        justifyContent: 'center'
    },
    ImageContainer: {
        height: 100,
        width: "100%"

    },
    Image: {
        height: "100%",
        width: "100%",
        borderRadius: 20

    },
    Headings: {
        color: "green",
        fontSize: 20,
        lineHeight: 50,
        alignSelf: 'center'
        // marginBottom: 20,

    },

    Form: {
        width: "100%",
        // height: 200,
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center",

    },
    feilds: {
        width: 320,
    },
    input: {
        fontSize: 15,
    },
    icon: {
        marginRight: 10
    },
    ForgetPasswordContainer: {
        width: 350
    },
    ForgetPassword: {
        textAlign: "right",
        color: "green",
        marginBottom: 30,
        marginRight: 30
    },

    btnContainer: {
        width: '100%',
        alignItems: 'center',
        maxHeight: 80,
        height: 80,
    },

    btn: {
        flex: 1,
        width: 300,
        backgroundColor: 'green',
        height: 50,
        maxHeight: 50,
        lineHeight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginBottom: 20

    },
    btnText: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 3,
        textTransform: "uppercase"
    },
    redirect: {
        fontSize: 15,
        color: "gray"
    },
    redirectLink: {
        color: "green"
    }


});
