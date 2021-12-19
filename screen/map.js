

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import haversine from "haversine";
import { ActivityIndicator } from "react-native-paper";
import { AsyncStorage } from "react-native";
import { useNavigation } from '@react-navigation/native';

const BranchMap = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [branchName, setBranchName] = useState(null);

  const [shortestDistance, setshortestDistance] = useState(null);

  let distanceKM = [];
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const start = {
    latitude: location !== null ? location.latitude : 24.8607,
    longitude: location !== null ? location.longitude : 67.0011,
  };

  let branches = [
    {
      branch_name: "Aliabad",
      latitude: 24.9200172,
      longitude: 67.0612345,
    },
    {
      branch_name: "Numaish chowrangi",
      latitude: 24.8732834,
      longitude: 67.0337457,
    },
    {
      branch_name: "Saylani house phase 2",
      latitude: 24.8278999,
      longitude: 67.0688257,
    },
    {
      branch_name: "Touheed commercial",
      latitude: 24.8073692,
      longitude: 67.0357446,
    },
    {
      branch_name: "Sehar Commercial",
      latitude: 24.8138924,
      longitude: 67.0677652,
    },
    {
      branch_name: "Jinnah avenue",
      latitude: 24.8949528,
      longitude: 67.1767206,
    },
    {
      branch_name: "Johar chowrangi",
      latitude: 24.9132328,
      longitude: 67.1246195,
    },
    {
      branch_name: "Johar chowrangi 2",
      latitude: 24.9100704,
      longitude: 67.1208811,
    },
    {
      branch_name: "Hill park",
      latitude: 24.8673515,
      longitude: 67.0724497,
    },
  ];

  branches.map((data, index) => {
    distanceKM.push(haversine(start, data));
  });
  console.log("distance km ", distanceKM);
  useEffect(() => {
    if (
      distanceKM[0] < distanceKM[1] &&
      distanceKM[0] < distanceKM[2] &&
      distanceKM[0] < distanceKM[3] &&
      distanceKM[0] < distanceKM[4] &&
      distanceKM[0] < distanceKM[5] &&
      distanceKM[0] < distanceKM[6] &&
      distanceKM[0] < distanceKM[7] &&
      distanceKM[0] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[0]);
      setshortestDistance({ val1: distanceKM[0], val2: branches[0] });

    } else if (
      distanceKM[1] < distanceKM[0] &&
      distanceKM[1] < distanceKM[2] &&
      distanceKM[1] < distanceKM[3] &&
      distanceKM[1] < distanceKM[4] &&
      distanceKM[1] < distanceKM[5] &&
      distanceKM[1] < distanceKM[6] &&
      distanceKM[1] < distanceKM[7] &&
      distanceKM[1] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[1]);
      setshortestDistance({ val1: distanceKM[1], val2: branches[1] });
    } else if (
      distanceKM[2] < distanceKM[0] &&
      distanceKM[2] < distanceKM[1] &&
      distanceKM[2] < distanceKM[3] &&
      distanceKM[2] < distanceKM[4] &&
      distanceKM[2] < distanceKM[5] &&
      distanceKM[2] < distanceKM[6] &&
      distanceKM[2] < distanceKM[7] &&
      distanceKM[2] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[2]);
      setshortestDistance({ val1: distanceKM[2], val2: branches[2] });
    } else if (
      distanceKM[3] < distanceKM[0] &&
      distanceKM[3] < distanceKM[1] &&
      distanceKM[3] < distanceKM[2] &&
      distanceKM[3] < distanceKM[4] &&
      distanceKM[3] < distanceKM[5] &&
      distanceKM[3] < distanceKM[6] &&
      distanceKM[3] < distanceKM[7] &&
      distanceKM[3] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[1]);
      setshortestDistance({ val1: distanceKM[3], val2: branches[3] });
    } else if (
      distanceKM[4] < distanceKM[0] &&
      distanceKM[4] < distanceKM[1] &&
      distanceKM[4] < distanceKM[2] &&
      distanceKM[4] < distanceKM[3] &&
      distanceKM[4] < distanceKM[5] &&
      distanceKM[4] < distanceKM[6] &&
      distanceKM[4] < distanceKM[7] &&
      distanceKM[4] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[2]);
      setshortestDistance({ val1: distanceKM[4], val2: branches[4] });
    } else if (
      distanceKM[5] < distanceKM[0] &&
      distanceKM[5] < distanceKM[1] &&
      distanceKM[5] < distanceKM[2] &&
      distanceKM[5] < distanceKM[3] &&
      distanceKM[5] < distanceKM[4] &&
      distanceKM[5] < distanceKM[6] &&
      distanceKM[5] < distanceKM[7] &&
      distanceKM[5] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[1]);
      setshortestDistance({ val1: distanceKM[5], val2: branches[5] });
    } else if (
      distanceKM[6] < distanceKM[0] &&
      distanceKM[6] < distanceKM[1] &&
      distanceKM[6] < distanceKM[2] &&
      distanceKM[6] < distanceKM[3] &&
      distanceKM[6] < distanceKM[4] &&
      distanceKM[6] < distanceKM[5] &&
      distanceKM[6] < distanceKM[7] &&
      distanceKM[6] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[2]);
      setshortestDistance({ val1: distanceKM[6], val2: branches[6] });
    } else if (
      distanceKM[7] < distanceKM[0] &&
      distanceKM[7] < distanceKM[1] &&
      distanceKM[7] < distanceKM[2] &&
      distanceKM[7] < distanceKM[3] &&
      distanceKM[7] < distanceKM[4] &&
      distanceKM[7] < distanceKM[5] &&
      distanceKM[7] < distanceKM[6] &&
      distanceKM[7] < distanceKM[8]
    ) {
      console.log("shortest distance is", distanceKM[1]);
      setshortestDistance({ val1: distanceKM[7], val2: branches[7] });
    } else if (
      distanceKM[8] < distanceKM[0] &&
      distanceKM[8] < distanceKM[1] &&
      distanceKM[8] < distanceKM[2] &&
      distanceKM[8] < distanceKM[3] &&
      distanceKM[8] < distanceKM[4] &&
      distanceKM[8] < distanceKM[5] &&
      distanceKM[8] < distanceKM[6] &&
      distanceKM[8] < distanceKM[7]
    ) {
      console.log("shortest distance is", distanceKM[2]);
      setshortestDistance({ val1: distanceKM[8], val2: branches[8] });
      //   setBranchName(shortestDistance())
      //   console.log("setBranchName" ,setshortestDistance)4
    } else {
      console.log("error found...");
    }


  }, []);
  const selectLocation = async (location, data) => {
    // console.log('location', location, data)

    if (location.val2.latitude == data.latitude &&
      location.val2.longitude == data.longitude) {

        try {
          const jsonValue = JSON.stringify(location)
          await AsyncStorage.setItem("nearLocation", jsonValue)
          navigation.navigate("AddDetails")
          // console.log("hello location" , location, jsonValue)
      } catch (e) {
          console.log(e)
          // saving error
      }
      console.log('-=-=-=->location', location)

    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      {location !== null ? (
        <MapView
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            image={require("../assets/house.png")}
            style={{ width: 10, height: 10 }}
          />
          {branches.map((data, index) => {
            console.log("checking data", data);
            return (
              <Marker
                onPress={() => selectLocation(shortestDistance, data)}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
                key={index + 1}
                pinColor={
                  shortestDistance !== null &&
                    shortestDistance.val2.latitude == data.latitude &&
                    shortestDistance.val2.longitude == data.longitude
                    ? "green"
                    : "blue"
                }


              >

                <Callout><Text>{
                  shortestDistance !== null &&
                    shortestDistance.val2.latitude == data.latitude &&
                    shortestDistance.val2.longitude == data.longitude
                    ? data.branch_name
                    : "blue"
                }</Text></Callout>

              </Marker>
            );
          })}
        </MapView>
      ) : (
        <ActivityIndicator
          animating={true}
          color="green"
          size="large"
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      )}
    </View>
  );
};

export default BranchMap;

const styles = StyleSheet.create({});