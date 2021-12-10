import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";

function ImageList({
  title,
  image,
  onPress,
  fuel,
  price,
  backgroundColor = "#fff",
}) {
  return (
    <TouchableHighlight underlayColor="white" onPress={onPress}>
      <View style={styles.container}>
        {image != null ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <View></View>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.fuel}>
            <Text numberOfLines={1}>{fuel}</Text>
          </View>
          <View style={styles.price}>
            <Text numberOfLines={1}>{price * 30 + " / kk"}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "column",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  detailsContainer: {},
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
  },

  middleContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  fuel: {
    fontSize: 14,
    alignSelf: "flex-start",
    flex: 1,
    backgroundColor: "#E8E8E8",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 4,
    marginEnd: 4,
  },
  price: {
    fontSize: 14,
    alignSelf: "flex-end",
    flex: 1,
    backgroundColor: "#E8E8E8",
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    width: 300,
    paddingVertical: 10,
    alignSelf: "flex-start",
    paddingEnd: 20,
  },
});

export default ImageList;
