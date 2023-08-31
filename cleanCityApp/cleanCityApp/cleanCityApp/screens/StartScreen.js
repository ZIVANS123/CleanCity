import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
//import SignUpScreen from "./SignUpScreen";
//import SignInScreen from "./SignInScreen";
const StartScreen = ({ navigation }) => {
  const handleButtonPress = (buttonNumber) => {
    if (buttonNumber === 1) {
      //setShowSignUp(true);
      navigation.navigate("SignUpScreen");
    } else if (buttonNumber === 2) {
      //setShowSignIn(true);
      console.log("Button 2 pressed");
      navigation.navigate("SignInScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F0F3BD" }]}
          onPress={() => handleButtonPress(1)}
        >
          <Text style={styles.buttonText}>הרשמה</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F0F3BD" }]}
          onPress={() => handleButtonPress(2)}
        >
          <Text style={styles.buttonText}>כניסה</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05668D",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#F0F3BD",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StartScreen;
