import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ImageList from "../components/ImageList";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DetailScreen({ route, navigation }) {
  const [car, setCar] = useState({});
  const { id } = route.params;
  const [shouldShow, setShouldShow] = useState(false);

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
              <Text>Brand: </Text>
              <Text>{car.brand}</Text>
            </View>
            <View style={styles.info}>
              <Text>Price: </Text>
              <Text>{car.price}</Text>
            </View>
            <View style={styles.info}>
              <Text>Location: </Text>
              <Text>{car.location}</Text>
            </View>          
            {shouldShow ? (
              <><View style={styles.info}>
                <Text>Model: </Text>
                <Text>{car.model}</Text>
              </View><View style={styles.info}>
                  <Text>Year: </Text>
                  <Text>{car.modelYear}</Text>
                </View><View style={styles.info}>
                  <Text>Type:</Text>
                  <Text>{car.type}</Text>
                </View><View style={styles.info}>
                  <Text>Transmisison: </Text>
                  <Text>{car.transmission}</Text>
                </View><View style={styles.info}>
                  <Text>Max speed: </Text>
                  <Text>{car.maxSpeed}</Text>
                </View><View style={styles.info}>
                  <Text>Horsepower: </Text>
                  <Text>{car.housePower}</Text>
                </View><View style={styles.info}>
                  <Text>Fuel: </Text>
                  <Text>{car.fuel}</Text>
                </View><View style={styles.info}>
                  <Text>Consumption: </Text>
                  <Text>{car.fuelConsumption}</Text>
                </View><View style={styles.info}>
                  <Text>CO2 emissions: </Text>
                  <Text>{car.CO2}</Text>
                </View><View style={styles.info}>
                  <Text>Color: </Text>
                  <Text>{car.color}</Text>
                </View></>
            )
         : null} 
         <Button title="More Info"
             onPress={() => setShouldShow(!shouldShow)}
            />
          <Button color="orange" title="Order button"/>
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
