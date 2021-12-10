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
import { Card } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DetailScreen({ route, navigation }) {
  const [car, setCar] = useState({});
  const { id } = route.params;
  const [shouldShow, setShouldShow] = useState(false);
  const [morePressed, setMoreInfo] = useState(false);
  const [moreInfo, setMoreInfoText] = useState("More info");

  const moreInfoHandle = () => {
    if (shouldShow == false) {
      setShouldShow(true);
      setMoreInfoText("Show Less");
    } else {
      setShouldShow(false);
      setMoreInfoText("More info");
    }
  };

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
            <Animatable.View animation="bounceInLeft" duration={2000}>
              <Image style={styles.imageStyle} source={{ uri: car.image }} />
            </Animatable.View>
            <Animatable.View animation="slideInRight" duration={1000}>
              <Card style={styles.detailCard}>
                <View style={styles.info}>
                  <Text>Brand: </Text>
                  <Text>{car.brand}</Text>
                </View>
              </Card>
            </Animatable.View>
            <Animatable.View animation="slideInLeft" duration={1000}>
              <Card style={styles.detailCard}>
                <View style={styles.info}>
                  <Text>Price: </Text>
                  <Text>{car.price * 30} / Month</Text>
                </View>
              </Card>
            </Animatable.View>
            <Animatable.View animation="slideInRight" duration={1000}>
              <Card style={styles.detailCard}>
                <View style={styles.info}>
                  <Text>Location: </Text>
                  <Text>{car.location}</Text>
                </View>
              </Card>
            </Animatable.View>
            {shouldShow ? (
              <>
                <Animatable.View animation="bounceInDown" duration={1000}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Model: </Text>
                      <Text>{car.model}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={1300}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Year: </Text>
                      <Text>{car.modelYear}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={1600}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Type:</Text>
                      <Text>{car.type}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={1800}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Transmisison: </Text>
                      <Text>{car.transmission}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Max speed: </Text>
                      <Text>{car.maxSpeed}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Horsepower: </Text>
                      <Text>{car.housePower}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Fuel: </Text>
                      <Text>{car.fuel}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Consumption: </Text>
                      <Text>{car.fuelConsumption}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>CO2 emissions: </Text>
                      <Text>{car.CO2}</Text>
                    </View>
                  </Card>
                </Animatable.View>
                <Animatable.View animation="bounceInDown" duration={2100}>
                  <Card style={styles.detailCard}>
                    <View style={styles.info}>
                      <Text>Color: </Text>
                      <Text>{car.color}</Text>
                    </View>
                  </Card>
                </Animatable.View>
              </>
            ) : null}
            <Button title={moreInfo} onPress={() => moreInfoHandle()} />

            <Card
              onPress={() =>
                navigation.navigate("OrderScreen", {
                  image: car.image,
                  id: car.id,
                  price: car.price,
                  model: car.model,
                })
              }
              style={{
                marginVertical: 10,
                padding: 20,
                borderRadius: 4,
                backgroundColor: "#4fd966",
                height: 60,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  Go to subscription Screen
                </Text>
              </View>
            </Card>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailCard: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
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
    width: windowWidth * 0.9,
    alignSelf: "center",
    height: 50,
    paddingTop: 15,
  },
  imageStyle: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    marginBottom: 5,
  },
});

export default DetailScreen;
