import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Image, Alert } from "react-native";
import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { Card } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import * as Animatable from "react-native-animatable";

function SubscriptionScreen(props) {
  const [cars, setCars] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  const onRefresh = () => {
    setIsFetching(true);
    handler();
  };

  const handler = async () => {
    let newList = [];
    const querySnapshot = await getDocs(
      collection(db, "orders"),
      where("user", "==", user.uid)
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().active == true && doc.data().user == user.uid) {
        newList.push(doc.data());
      }
    });
    await setCars(newList);
    setIsFetching(false);
  };

  const cancelSub = async (id) => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel the subscription for this car",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            try {
              const washingtonRef = doc(db, "orders", id);

              // Set the "capital" field of the city 'DC'
              updateDoc(washingtonRef, {
                active: false,
              });
              handler();
            } catch {}
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <View style={styles.container}>
      {cars.length > 0 ? (
        <FlatList
          data={cars}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={isFetching}
          keyExtractor={(list) => list.image + Math.random()}
          renderItem={({ item }) => (
            <Animatable.View animation="bounceIn" duration={1500}>
              <Card style={{ marginVertical: 10, paddingVertical: 10 }}>
                <View style={{ padding: 20 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: "contain",
                    }}
                    source={{ uri: item.image }}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    paddingTop: 5,
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>{item.model}</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    paddingTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Subscription Started</Text>
                  {item?.start ? (
                    <Text>{item.start.toDate().toDateString()}</Text>
                  ) : (
                    <View></View>
                  )}
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    paddingTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Subscription End</Text>
                  {item?.end ? (
                    <Text>{item.end.toDate().toDateString()}</Text>
                  ) : (
                    <View></View>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    display: item.childSeat == true ? "flex" : "none",
                  }}
                >
                  <Checkbox
                    style={styles.checkbox}
                    disabled
                    value={isChecked}
                    color={isChecked ? "#4ecdc4" : undefined}
                    onValueChange={setIsChecked(true)}
                  />
                  <Text style={{ alignSelf: "center" }}>Child seat</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    display: item.bikeRack == true ? "flex" : "none",
                  }}
                >
                  <Checkbox
                    style={styles.checkbox}
                    disabled
                    value={isChecked}
                    color={isChecked ? "#4ecdc4" : undefined}
                    onValueChange={setIsChecked(true)}
                  />
                  <Text style={{ alignSelf: "center" }}>Bike rack</Text>
                </View>

                <Card
                  onPress={() => cancelSub(item.id)}
                  style={{
                    marginVertical: 10,
                    padding: 20,
                    borderRadius: 4,
                    marginHorizontal: 20,
                    backgroundColor: "#fc5c65",
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
                      Cancel Subscription
                    </Text>
                  </View>
                </Card>
              </Card>
            </Animatable.View>
          )}
        />
      ) : (
        <Card onPress={() => handler()}>
          <View
            style={{
              paddingVertical: 30,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{ fontWeight: "700", fontSize: 20, alignSelf: "center" }}
            >
              No active subscription
            </Text>

            <MaterialCommunityIcons
              name="refresh"
              size={30}
              color="black"
              style={{ alignSelf: "center" }}
            />
          </View>
        </Card>
      )}
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
});

export default SubscriptionScreen;
