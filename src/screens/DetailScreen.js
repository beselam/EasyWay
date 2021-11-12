import React from "react";
import { View, StyleSheet, Text } from "react-native";

function DetailScreen({ route, navigation }) {
  const { carPrice } = route.params;
  const { carModel } = route.params;
  const { carBrand } = route.params;
  const { carFuel } = route.params;
  const { carYear } = route.params;
  const { carType } = route.params;
  const { carPower } = route.params;
  const { carSpeed } = route.params;
  const { carTransmission } = route.params;
  const { carColor } = route.params;
  const { carConsumption } = route.params;
  const { carCO2 } = route.params;
  const { carLocation } = route.params;
  //const { carImage } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>detail screen</Text>
      <Text>carModel: {JSON.stringify(carModel)}</Text>
      <Text>carBrand: {JSON.stringify(carBrand)}</Text>
      <Text>carPrice: {JSON.stringify(carPrice)}</Text>
      <Text>carFuel: {JSON.stringify(carFuel)}</Text>
      <Text>carYear: {JSON.stringify(carYear)}</Text>
      <Text>carType: {JSON.stringify(carType)}</Text>
      <Text>carPower: {JSON.stringify(carPower)}</Text>
      <Text>carSpeed: {JSON.stringify(carSpeed)}</Text>
      <Text>carTransmission: {JSON.stringify(carTransmission)}</Text>
      <Text>carColor: {JSON.stringify(carColor)}</Text>
      <Text>carConsumption: {JSON.stringify(carConsumption)}</Text>
      <Text>carCO2: {JSON.stringify(carCO2)}</Text>
      <Text>carLocation: {JSON.stringify(carLocation)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default DetailScreen;
