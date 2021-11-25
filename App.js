import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";

import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import ProfileSCreen from "./src/screens/ProfileSCreen";
import DetailScreen from "./src/screens/DetailScreen";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import OrderScreen from "./src/screens/OrderScreen";
import { Dada } from "./src/screens/Dada";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const Stackk = createNativeStackNavigator();

  const AuthScreen = () => {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  };

  const FeedScreen = () => {
    return (
      <Stackk.Navigator initialRouteName="HomeScreen">
        <Stackk.Screen name="HomeScreen" component={HomeScreen} />
        <Stackk.Screen name="DetailScreen" component={DetailScreen} />
        <Stackk.Screen name="OrderScreen" component={OrderScreen} />
      </Stackk.Navigator>
    );
  };

  const MyTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ffffff"
        labelStyle={{ fontSize: 12 }}
        barStyle={{ backgroundColor: "#694fad" }}
        style={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="Home"
          component={FeedScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Subscription"
          component={FavoriteScreen}
          options={{
            tabBarLabel: "Subscription",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="opencart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Dada}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const auth = getAuth();
  // Handle user state changes
  function onAuthState(user) {
    console.log("usrrrerrr", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log("userrr", user);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onAuthState(user);
      } else {
        onAuthState(null);
      }
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;
  else
    return (
      <NavigationContainer>
        {user ? <MyTabs /> : <AuthScreen />}
      </NavigationContainer>
    );
}
