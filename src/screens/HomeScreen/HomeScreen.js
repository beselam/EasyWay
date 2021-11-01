import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const handleClick = async () => {
    navigation.navigate("DetailScreen");
  };
  const handleLogoutClick = () => {
    signOut(auth)
      .then(() => {
        // navigation.navigate("DetailScreen");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <View>
      <TouchableOpacity onPress={() => handleClick()}>
        <Text
          style={{
            padding: 20,
            backgroundColor: "gray",
            margin: 50,
            fontSize: 30,
          }}
        >
          go to detail screen
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogoutClick()}>
        <Text
          style={{
            padding: 10,
            backgroundColor: "yellow",
            margin: 50,
            fontSize: 15,
            alignSelf: "center",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
