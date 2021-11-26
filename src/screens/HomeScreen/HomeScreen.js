import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Card } from "react-native-paper";
import { firebase } from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ListItem from "./../../components/ListItem";
import ImageList from "../../components/ImageList";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const handleClick = async () => {
    //  navigation.navigate("DetailScreen");
    const car = {
      available: true,
      brand: "Mercedes-Benz",
      modelSerous: "EQC",
      model: "Mercedes-Benz EQC 400 4Matic Business AMG",
      modelYear: 2020,
      transmission: "automatic",
      type: "SUV",
      image: "ss",
      color: "polar white",
      fuel: "electric",
      fuelConsumption: "2.6",
      CO2: "0",
      housePower: "300",
      maxSpeed: "190 km/h",
      location: "espoo",
      price: 25,
    };

    try {
      const docRef = await addDoc(collection(db, "cars"), car);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

  const handleSearch = () => {};

  const handler = async () => {
    let newList = [];
    const querySnapshot = await getDocs(collection(db, "cars"));
    querySnapshot.forEach((doc) => {
      console.log(` ${doc.data().model}`);
      newList.push(doc.data());
    });
    await setCars(newList);
    console.log(` ${cars.length}`);
    console.log(` ${cars.length}`);
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <View>
      <Card style={styles.textInputCard}>
        <View style={styles.textInputInner}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="searchengin" size={20} color="gray" />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="search"
            clearButtonMode="while-editing"
            placeholderTextColor="gray"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(item) => handleSearch(item)}
          />
          <View style={{ alignSelf: "center" }}>
            <Ionicons name="filter" size={24} color="black" />
          </View>
        </View>
      </Card>

      {cars?.length > 0 ? (
        <FlatList
        style={{marginBottom: 100}}
          data={cars}
          showsVerticalScrollIndicator={false}
          keyExtractor={(list) => list.image + list.color + Math.random()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <ImageList
                title={item.model}
                fuel={item.fuel}
                price={item.price}
                image={item.image}
                onPress={() =>
                  navigation.navigate("DetailScreen", { id: item.id })
                }
              />
            </View>
          )}
        />
      ) : (
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={console.log("")}
        >
          <MaterialCommunityIcons name="refresh" size={40} color="white" />
          <Text>Please press to refresh your page</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10
  },
  textInputCard: {
    elevation: 2,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  textInputInner: { flexDirection: "row", width: "100%" },
  ll: {
    width: "100%",
  },
  iconContainer: {
    width: "20%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: { width: "70%", height: 50 },
});
