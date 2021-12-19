
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, Alert , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { AsyncStorage } from 'react-native';


export default function AddDetails() {


    const [userName, setUserName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [cnicNum, setCnicNum] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [familyMember, setFamilyMember] = useState(null);
    const [uid, setUid] = useState("")
    const [image, setImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
    const [monthelyIncome, setMonthelyIncome] = useState(null);
    const [secondimage, setSecondImage] = useState(null);
    const [applicationImgs, setApplicationImgs] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const getData = async () => {

        try {
          const jsonValue = await AsyncStorage.getItem('nearLocation')
          setSelectedLocation(JSON.parse(jsonValue))
        //  setSelectedLocation(data.val2)
        } catch(e) {
          // error reading value
        }

      }
      
    useEffect(() => {
        getData()
        
    }, []);
    console.log("check" , selectedLocation)


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });

        // console.log('result asd', result);

        if (!result.cancelled) {
            setImage(result.uri);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            setApplicationImgs(applicationImgs => [...applicationImgs, { uri: blob, name: 'initial' }]);
        }
    }

    const pickImageCnic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSecondImage(result.uri);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            setApplicationImgs(applicationImgs => [...applicationImgs, { uri: blob, name: 'cnicFront' }]);

        }
    };

    const pickImageThird = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setThirdImage(result.uri);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            setApplicationImgs(applicationImgs => [...applicationImgs, { uri: blob, name: 'cnicBack' }]);
        }
    };



    const CheckUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user)
            if (user) {

                setUid(user.uid)
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
    
    const resetForm = () => {
        setApplicationImgs([]);
        setUserName('');
        setFatherName('');
        setCnicNum('');
        setDateOfBirth('');
        setFamilyMember('');
        setImage(null);
        setThirdImage(null);
        setMonthelyIncome(null);
        setSecondImage(null);
    }
    const addApplication = async (e) => {
        
        
        // console.log('applicationImgs', JSON.stringify(applicationImgs))
        let uploadedImages = [];
        if (userName === " " || fatherName === " " || monthelyIncome === " " || cnicNum === "" || image === "") {
            Alert.alert("Error", "please fill all the feild")
        } else {
              
            setIsLoading(true)




            applicationImgs.map((blob, index) => {
                firebase.storage().ref().child(`images/${uid}/${new Date().getMilliseconds()}/${blob.name}`)
                    .put(blob.uri).then((snap) => {

                        snap.ref.getDownloadURL().then((url) => {
                            uploadedImages.push(url)
                            if (uploadedImages.length === 3) {
                                firebase.firestore().collection('user').doc(uid).collection('details').add({

                                    fatherName,
                                    userName,
                                    cnicNum,
                                    dateOfBirth,
                                    familyMember,
                                    monthelyIncome,
                                    // image: url,
                                    userUID: uid,
                                    images: uploadedImages,
                                    branchName : selectedLocation?.val2?.branch_name,
                                    isApproved : false,
                                    date: new Date().toLocaleDateString()
                                })
                                    .then(() => {
                                        uploadedImages = []
                                        resetForm();
                                        setIsLoading(false)
                                        console.log("Document successfully written!");
                                        alert("Product added succesfully!!")
                                    })
                                    .catch((error) => {
                                        console.error("Error writing document: ", error);
                                    });
                            }
                            console.log('uploaded url', url)


                        }).catch(error => console.log('DownloadURL error', error))

                    }).catch(error => console.log('Image couldnt upload', error))

            });
            console.log('asdasd', uploadedImages)

        }

    }

    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView >
                <View style={styles.Productcontainer}>

                    <View style={styles.Form}>
                        <View ><Text  style={styles.title}> Sylani {selectedLocation?.val2?.branch_name}</Text></View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER YOUR NAME'
                                value={userName}
                                onChangeText={(text) => setUserName(text)}

                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='user'
                                        size={20}
                                        color='green'
                                    />

                                }
                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER FATHER NAME '
                                value={fatherName}
                                onChangeText={(text) => setFatherName(text)}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='user'
                                        size={20}
                                        color='green'
                                    />

                                }

                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='ENTER CNIC NUM'
                                value={cnicNum}
                                onChangeText={(text) => setCnicNum(text)}
                                keyboardType="numeric"
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='id-card'
                                        size={20}
                                        color='green'
                                    />

                                }

                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='DATE OF BIRTH'
                                value={dateOfBirth}
                                onChangeText={(text) => setDateOfBirth(text)}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='child'
                                        size={24}
                                        color='green'
                                    />

                                }

                            />
                        </View>
                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='NUM OF FAMILY MEMBER'
                                value={familyMember}
                                onChangeText={(text) => setFamilyMember(text)}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='users'
                                        size={20}
                                        color='green'
                                    />

                                }

                            />
                        </View>

                        <View style={styles.feilds}>
                            <Input
                                style={styles.input}
                                placeholder='MONTHLY INCOME'
                                value={monthelyIncome}
                                keyboardType="numeric"
                                onChangeText={(text) => setMonthelyIncome(text)}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name='dollar'
                                        size={20}
                                        color='green'
                                    />

                                }

                            />
                        </View>


                    </View>
                    <View style={styles.AddImage}>
                        <View >
                            <View style={styles.ImagebtnContainer}>

                                <TouchableOpacity style={styles.Imagebtn} >
                                    <Text style={styles.ImageText} onPress={pickImage} >
                                        ADD IMAGE
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>

                    <View style={styles.AddImage}>
                        <View >
                            <View style={styles.ImagebtnContainer}>

                                <TouchableOpacity style={styles.Imagebtn} >
                                    <Text style={styles.ImageText} onPress={pickImageCnic} >
                                        Front Cnic Image
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>
                    <View style={styles.AddImage}>
                        <View >
                            <View style={styles.ImagebtnContainer}>

                                <TouchableOpacity style={styles.Imagebtn} >
                                    <Text style={styles.ImageText} onPress={pickImageThird} >
                                        BaCK Cnic Image

                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 20 }}>

                        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}

                        {secondimage && <Image source={{ uri: secondimage }} style={{ width: 100, height: 100 }} />}

                        {thirdImage && <Image source={{ uri: thirdImage }} style={{ width: 100, height: 100 }} />}

                    </View>

                    <View style={styles.btnContainer}>
                        {
                            isLoading === true?
                            <ActivityIndicator size="large" color="#00ff00" />
                            :
                            <TouchableOpacity style={styles.btn} onPress={addApplication} >
                            
                            <Text style={styles.btnText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        }
                       

                    </View>

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
        width: "100%",
        height: "100%"
    },
    title:{
        color: "green",
        fontSize: 25,
        height:40
    },
    Productcontainer: {
        height: Dimensions.get('window').height / 0.7,
        alignItems: "center",
        justifyContent: 'center'
    },
    ImageContainer: {
        height: 80,
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
        marginBottom: 20
    },

    Form: {
        width: "100%",
        height: 460,
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
    },

    btn: {
        flex: 1,
        width: 120,
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
    },
    AddImage: {
        marginBottom: 5
    },
    ImagebtnContainer: {
        width: '100%',
        alignItems: 'center',
        maxHeight: 80,
    },

    Imagebtn: {
        flex: 1,
        width: 300,
        backgroundColor: 'white',
        height: 40,
        maxHeight: 50,
        lineHeight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginBottom: 20,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "green"

    },
    ImageText: {
        color: 'green',
        fontSize: 15,
        letterSpacing: 3,
        textTransform: "uppercase"
    },


});


