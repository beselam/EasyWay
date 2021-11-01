import React from "react";
import { View, StyleSheet, Text } from "react-native";

function DetailScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>detail screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default DetailScreen;
