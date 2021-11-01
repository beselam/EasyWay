import React from "react";
import { View, StyleSheet, Text } from "react-native";

function FavoriteScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", marginTop: 100, fontSize: 30 }}>
        Favorite screen
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default FavoriteScreen;
