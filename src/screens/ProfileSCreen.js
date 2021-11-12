import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Icon from "./../components/icon";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { db } from "../firebase/config";

const menuItems = [
  {
    title: "My Subscription",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: "#fc5c65",
    },
    targetScreen: "",
  },
  {
    title: "setting",
    icon: {
      name: "card-bulleted-settings-outline",
      backgroundColor: "#4ecdc4",
    },
    targetScreen: "",
  },
];

function ProfileSCreen({ navigation }) {
  const [fullName, setFullName] = useState("name");
  const [email, setEmail] = useState("email");

  const auth = getAuth();
  const citiesRef = collection(db, "users");

  const getUser = async () => {
    const q = query(
      collection(db, "users"),
      where("id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().email);
      setEmail(doc.data().email);
      setFullName(doc.data().fullName);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <ListItem
          onPress={() => console.log("s")}
          title={"      " + fullName}
          subTitle={"      " + email}
          chevron={false}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => {
                Alert.alert("work on progress", "will be functional soon", {
                  cancelable: true,
                });
              }}
            />
          )}
        />
      </View>
      <View style={{ marginVertical: 40 }}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => auth.signOut()}
          chevron={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {},
  container2: {
    marginVertical: 20,
  },
});

export default ProfileSCreen;
