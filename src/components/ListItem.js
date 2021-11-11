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

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  company,
  renderRightActions,
  chevron = true,
  backgroundColor = "#fff",
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor="white" onPress={onPress}>
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text numberOfLines={1}>{title}</Text>
            {subTitle && <Text>{subTitle}</Text>}
            {company && <Text>{company}</Text>}
          </View>
          {chevron && <MaterialCommunityIcons name="chevron-right" size={25} />}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    fontSize: 14,
  },
  title: {
    fontWeight: "600",
  },
});

export default ListItem;
