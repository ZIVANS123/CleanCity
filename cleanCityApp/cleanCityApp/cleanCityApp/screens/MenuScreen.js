import React from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const MenuScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleButtonPress = () => {
    navigation.navigate("MapScreen");
  };

  const handleMyEvent = () => {
    navigation.navigate("MyEventScreen");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Alert.alert("התנתקות", "ההתנתקות בוצעה");
        navigation.navigate("StartScreen");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.menuText}>תפריט</Text>
        {/* <Text>Welcome,{user}!</Text>  */}
      </View>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleButtonPress}>
          <Text style={styles.menuItemText}>דיווח על אירוע חדש</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleMyEvent}>
          <Text style={styles.menuItemText}> לצפייה באירועים שלי </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Text style={styles.menuItemText}> לחץ להתנתקות </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 250,
    top: -250,
  },

  container: {
    backgroundColor: "#05668D",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#02C39A",
    paddingHorizontal: 160,
    paddingVertical: 25,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  menuItem: {
    backgroundColor: "#F0F3BD",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 20,
    justifyContent: "flex-end",
  },
  menuItemText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 200,
    paddingBottom: 100,
    marginBottom: 25,
    marginTop: 80,
  },
});

export default MenuScreen;
