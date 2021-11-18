import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ImageList from "../components/ImageList";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DetailScreen({ route, navigation }) {
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
    <ScrollView style={styles.container}>
      <View style={styles.items}>
        {car != null && car != undefined ? (
          <View>
            <Image style={styles.imageStyle} source={{ uri: car.image }} />
            <View style={styles.info}>
              <Text>model</Text>
              <Text>{car.model}</Text>
            </View>
            <View style={styles.info}>
              <Text>{car.type}</Text>
            </View>
            <View style={styles.info}>
              <Text>{car.transmission}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
  },
  items: {
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: windowWidth * 0.9,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  imageStyle: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    marginBottom: 5,
  },
});

export default DetailScreen;
