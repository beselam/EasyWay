import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import ProfileSCreen from "./src/screens/ProfileSCreen";
import DetailScreen from "./src/screens/DetailScreen";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

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

function FeedScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function AuthScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const Tab = createMaterialBottomTabNavigator();

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
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileSCreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}