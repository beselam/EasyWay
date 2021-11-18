import React from "react";
import { View, StyleSheet, Text, Dimensions, Image, ScrollView } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DetailScreen({ route, navigation }) {
  const { carModel, 
          carBrand,
          carPrice, 
          carFuel, 
          carYear, 
          carType, 
          carPower, 
          carSpeed, 
          carTransmission, 
          carColor, 
          carConsumption, 
          carCO2, 
          carLocation, 
          carImage
         } = route.params;
         console.log("routeparams", route.params)
  
  return (
    <ScrollView style={styles.container}>
        <View style={styles.items}>
        <Image style={styles.imageStyle} source={{uri: carImage}}/>
        <View style={styles.info}>
      <Text>Brand: </Text>
      <Text numberOfLines={2} ellipsizeMode="tail">{JSON.stringify(carBrand)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Model: </Text>
      <Text>{JSON.stringify(carModel)}</Text>
      </View>
      <View style={styles.info}>
      <Text h2>Price: </Text>
      <Text>{JSON.stringify(carPrice)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Fuel: </Text>
      <Text>{JSON.stringify(carFuel)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Year: </Text>
      <Text>{JSON.stringify(carYear)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Type:</Text>
      <Text>{JSON.stringify(carType)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Power: </Text>
      <Text>{JSON.stringify(carPower)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Max Speed: </Text>
      <Text>{JSON.stringify(carSpeed)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Transmission: </Text>
      <Text>{JSON.stringify(carTransmission)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Color: </Text>
      <Text>{JSON.stringify(carColor)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Consumption: </Text>
      <Text>{JSON.stringify(carConsumption)}</Text>
      </View>
      <View style={styles.info}>
      <Text>CO2 emissions: </Text>
      <Text>{JSON.stringify(carCO2)}</Text>
      </View>
      <View style={styles.info}>
      <Text>Location: </Text>
      <Text>{JSON.stringify(carLocation)}</Text>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  card: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
  },
  items: {
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center"
  },
  info: {
    flexDirection:'row', 
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  imageStyle: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    marginBottom: 5,
  }
});

export default DetailScreen;
