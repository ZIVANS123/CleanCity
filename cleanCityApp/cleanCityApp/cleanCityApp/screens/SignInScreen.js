import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const SignInScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("MenuScreen");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) navigation.navigate("MenuScreen");
      })
      .catch((error) => {
        Alert.alert("פרטים לא תקינים", "שם משתמש או סיסמא לא תקינים");
       
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topBar}>
        <Text style={styles.signingInText}>התחברות למערכת</Text>
      </View>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.label}>כתובת מייל :</Text>
      <TextInput
        style={styles.input}
        placeholder="שם משתמש"
        value={email}
        onChangeText={(text) => setemail(text.trim())}
      />
      <Text style={styles.label}>סיסמא:</Text>
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text.trim())}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>התחבר</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05668D",
    flex: 1,
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row-reverse",
    backgroundColor: "#02C39A",
    paddingHorizontal: 75,
    paddingVertical: 25,
  },
  signingInText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  input: {
    backgroundColor: "#ffffff",
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#F0F3BD",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },

  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    color: "#ffffff",
    marginBottom: 5,
  },
  logo: {
    width: 200,
    height: 200,
    paddingBottom: 100,
    marginBottom: 25,
    marginTop: 80,
  },
});

export default SignInScreen;
