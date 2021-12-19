
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import firebase from 'firebase'

export default function SignIn() {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    
    const register = () => {

        console.log('email', email)
        console.log('password', password)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                alert('Sign  In suucessfully!!')
                 navigation.navigate("NeedyDashboard")

                console.log("auth done")
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                alert('Error' , errorCode , errorMessage)

            });

        setEmail('')
        setPassword('')
        

    }
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.signinContainer}>
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
            <View style={styles.ForgetPasswordContainer}>
                <Text style={styles.ForgetPassword}>Forget your password? </Text>
            </View>
            <View style={styles.btnContainer}>

                <TouchableOpacity style={styles.btn} onPress={register}>
                    <Text style={styles.btnText} >
                        Sign In 
                    </Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.redirect}>Don't have an account ? <Text style={styles.redirectLink} onPress={() => navigation.navigate("SignUp") }>Sign Up</Text></Text>
        </View>
            </ScrollView>
        </SafeAreaView>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    signinContainer: {
        // backgroundColor: 'black',
        height: Dimensions.get('window').height / 1,
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
    },

    Form: {
        width: "100%",
        height: 150,
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
       width:350
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
        color: "gray",
        alignSelf:"center"
    },
    redirectLink: {
        color: "green"
    }


});
