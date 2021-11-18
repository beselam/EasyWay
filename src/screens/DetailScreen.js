import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ImageList from "../components/ImageList";

function DetailScreen({ navigation, route }) {
  const [car, setCar] = useState({});

  const { id } = route.params;

  const handler = async (id) => {
    let newList = [];
    const querySnapshot = await getDocs(
      collection(db, "cars"),
      where("id", "==", id)
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().id == id) {
        newList.push(doc.data());
      }
    });
    await setCar(newList[0]);
    console.log(` ${car}`);
  };

  useEffect(() => {
    console.log(id);
    handler(id);
  }, []);

  return (
    <View style={styles.container}>
      {car != null && car != undefined ? (
        <View style={{ flexDirection: "column" }}>
          <View style={styles.imageContainer}>
            <ImageList image={car.image} />
          </View>
          <Text style={{ alignSelf: "center", padding: 10 }}>{car.model}</Text>
          <Text style={{ alignSelf: "center", padding: 10 }}>{car.type}</Text>
          <Text style={{ alignSelf: "center", padding: 10 }}>{car.brand}</Text>
          <Text style={{ alignSelf: "center", padding: 10 }}>
            {car.location}
          </Text>
          <Text style={{ alignSelf: "center", padding: 10 }}>
            {car.modelYear}
          </Text>
          <Text style={{ alignSelf: "center", padding: 10 }}>
            {car.transmission}
          </Text>
        </View>
      ) : (
        <Text style={{ alignSelf: "center" }}>detail screnn</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },

  container: {
    alignItems: "center",
  },
});

export default DetailScreen;
