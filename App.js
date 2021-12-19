
import React from 'react';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screen/LandingPage';
import SignUp from './screen/SignUp';
import SignIn from './screen/SignIn';
import NeedyDashboard from './screen/NeedyDashboard';
import firebase from 'firebase'
import AddDetails from './screen/NeedyDetails';
import BranchMap from './screen/map'
const Stack = createStackNavigator();



export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCb_gZ3vGC3q6MrAIi7UOL6NKRVGwvlrv4",
    authDomain: "khana-app-caba0.firebaseapp.com",
    projectId: "khana-app-caba0",
    storageBucket: "khana-app-caba0.appspot.com",
    messagingSenderId: "92778289260",
    appId: "1:92778289260:web:7fd699a0d638ed16972049"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

    
      
        <Stack.Screen name="landingPage" component={LandingPage}
          options={{
            headerShown: false
          }}

        />
  <Stack.Screen name="NeedyDashboard" component={NeedyDashboard}
          options={{
            headerShown: false
          }}

        />
<Stack.Screen name="AddDetails" component={AddDetails}
          options={{
            headerShown: false
          }}

        />




        <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerShown: false
          }}

        />


        <Stack.Screen name="SignIn" component={SignIn}
          options={{
            headerShown: false
          }}

        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

