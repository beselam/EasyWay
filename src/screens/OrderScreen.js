import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  _Text,
  Alert,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Card, Title } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { db } from "../firebase/config";
import SuccessScreen from "./SuccessScreen";

function OrderScreen({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [carImage, setCarImage] = useState(null);
  const [carId, setCarId] = useState("");
  const [carModel, setModel] = useState("model");
  const [endDate, setEndDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const [childSeatChecked, setChildSeat] = useState(false);
  const [bikeRackChecked, setBikeRack] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [navigator, setNavigator] = useState(false);
  const [show, setShow] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const auth = getAuth();
  const { id, image, price, model } = route.params;

  const oneDay = 86363488;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEndDate(Platform.OS === "ios");
    setEndDate(currentDate);
    const subDateDif = currentDate - date;
    const subDate = subDateDif / oneDay;
    const subPrice = subDate * price;
    const finalPrice = subPrice.toFixed(0);
    if (finalPrice == 0) {
      setTotalPrice(price);
    } else {
      setTotalPrice(finalPrice);
    }
  };
  const setChildSeatChecked = (value) => {
    if (childSeatChecked == true) {
      setChildSeat(false);
      let price = parseInt(totalPrice) - 30;
      setTotalPrice(price);
    } else {
      setChildSeat(true);
      let price = parseInt(totalPrice) + 30;
      setTotalPrice(price);
    }
  };
  const setBikeRackChecked = (value) => {
    if (bikeRackChecked == true) {
      setBikeRack(false);
      let price = parseInt(totalPrice) - 20;
      setTotalPrice(price);
    } else {
      setBikeRack(true);
      let price = parseInt(totalPrice) + 20;
      setTotalPrice(price);
    }
  };

  const placeOrder = async () => {
    try {
      const newOrderRef = await doc(collection(db, "orders"));

      const docRef = await setDoc(newOrderRef, {
        car: carId,
        start: date,
        end: endDate,
        user: auth.currentUser.uid,
        image: carImage,
        model: model,
        bikeRack: bikeRackChecked,
        childSeat: childSeatChecked,
        id: newOrderRef.id,
        active: true,
      });
      setSuccessVisible(true);
      console.log("Document written with ID: ", newOrderRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const showStDate = () => {
    setShow(true);
  };

  const showEndDateC = () => {
    setShowEndDate(true);
  };
  useEffect(() => {
    setNavigator(false);
    if (price != undefined && id != undefined && image != undefined) {
      console.log(image);
      setTotalPrice(0);
      setCarId(id);
      setCarImage(image);
      setModel(model);
    }
  }, []);

  if (navigator) {
    navigation.pop(2);
  }

  return (
    <View style={styles.container}>
      <View>
        <SuccessScreen
          onDone={() => {
            console.log("on done");
            setSuccessVisible(false);
            console.log(successVisible);
            setNavigator(true);
          }}
          visible={successVisible}
        />
      </View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card style={{ marginVertical: 10 }}>
          <View style={styles.stCar}>
            <View style={{ borderRadius: 20 }}>
              {carImage ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                  source={{ uri: carImage }}
                />
              ) : (
                <View></View>
              )}
            </View>
            <View
              style={{
                flexDirection: "column",
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  width: "70%",
                  fontWeight: "500",
                }}
                numberOfLines={2}
              >
                {model}
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: "gray" }}>{price * 30} / Month </Text>
              </View>
            </View>
          </View>
        </Card>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card style={{ marginVertical: 10 }} onPress={showStDate}>
          <View style={styles.stDate}>
            <Text
              style={{
                flex: 1,
                alignSelf: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Subscription Start
            </Text>
            <View style={{ flex: 1 }}>
              {(show || Platform.OS === "ios") && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  minimumDate={date}
                  onChange={onChange}
                />
              )}
            </View>
            {Platform.OS !== "ios" && (
              <View style={{ flex: 1 }}>
                <Text>{date.toDateString()}</Text>
              </View>
            )}
          </View>
        </Card>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card style={{ marginBottom: 10 }} onPress={showEndDateC}>
          <View style={styles.etDate}>
            <Text
              style={{
                flex: 1,
                alignSelf: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Subscription End
            </Text>
            <View style={{ flex: 1 }}>
              {(showEndDate || Platform.OS === "ios") && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  minimumDate={date}
                  onChange={onEndDateChange}
                />
              )}
            </View>
            {Platform.OS !== "ios" && (
              <View style={{ flex: 1 }}>
                <Text>{endDate.toDateString()}</Text>
              </View>
            )}
          </View>
        </Card>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card style={{ padding: 20 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ paddingBottom: 10 }}>Add Accessories</Text>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={childSeatChecked}
                color={childSeatChecked ? "#4ecdc4" : undefined}
                onValueChange={setChildSeatChecked}
              />
              <Text
                style={{
                  flex: 6,
                  alignSelf: "center",
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Child Seat
              </Text>
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  fontWeight: "600",
                  fontSize: 16,
                  backgroundColor: "#E8E8E8",
                  padding: 5,
                  paddingLeft: 15,
                  borderRadius: 5,
                }}
              >
                <Text>30$</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={bikeRackChecked}
                color={bikeRackChecked ? "#4ecdc4" : undefined}
                onValueChange={setBikeRackChecked}
              />
              <Text
                style={{
                  flex: 6,
                  alignSelf: "center",
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Bike Rack
              </Text>
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  fontWeight: "600",
                  fontSize: 16,
                  backgroundColor: "#E8E8E8",
                  padding: 5,
                  paddingLeft: 15,
                  borderRadius: 5,
                }}
              >
                <Text>20$</Text>
              </View>
            </View>
          </View>
        </Card>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card
          style={{
            marginVertical: 10,
            padding: 20,
            borderRadius: 4,
            backgroundColor: "#4ecdc4",
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
              Total Subscription fee {totalPrice}
            </Text>
          </View>
        </Card>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000}>
        <Card
          onPress={() => {
            Alert.alert(
              "Subscription",
              "Are you sure you want to order subscription for this car",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    placeOrder();
                  },
                },
              ],
              { cancelable: true }
            );
          }}
          style={{
            marginVertical: 10,
            padding: 20,
            borderRadius: 4,
            backgroundColor: "#4fd966",
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
              Subscribe
            </Text>
          </View>
        </Card>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  checkbox: {
    margin: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  stDate: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,

    marginVertical: 10,
  },
  stCar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  etDate: {
    flexDirection: "row",
    backgroundColor: "#Ffffff",
    padding: 20,
    borderRadius: 10,

    marginVertical: 10,
  },
});

export default OrderScreen;
