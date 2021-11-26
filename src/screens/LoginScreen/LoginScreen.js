import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("d@d.com");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState({"name":"matti"})
  const auth = getAuth();
  /* signOut(auth).then(() => {
    console.log(" user is logged out");
  }); */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("use hhh rrr", user);
      }
    });
    return unsubscribe;
  }, []);

  const onFooterLinkPress = () => {
    navigation.navigate("RegistrationScreen");
  };

  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // console.log(" user is logged in ", response);
        console.log(" user is logged in ");
        // navigation.replace("HomeScreen");
      })
      .catch((error) => {
        console.log(" user is logged in ", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../../assets/vehoWallpaper2.jpg")} style={{width: "100%", height: "100%"}}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/VehoLogoWhite.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
}
