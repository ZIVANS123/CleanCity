import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("ברוכים הבאים!", "הרשמתכם נקלטה במערכת!");
        handleReturn();
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert(
              "פרטים לא תקינים",
              " שם משתמש חייב להיות כתובת מייל תקינה וסיסמא חייבת להכיל לפחות 6 תווים"
            );
            break;
          case "auth/email-already-in-use":
            Alert.alert("מייל כבר בשימוש", "אנא נסו שם משתמש אחר");
            break;
        }
        console.log(error);
      });
  };
  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topBar}>
        <Text style={styles.signingUpText}>הרשמה למערכת</Text>
      </View>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />

      <Text style={styles.label}> כתובת מייל:</Text>
      <TextInput
        style={styles.input}
        placeholder="שם משתמש"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
      />

      <Text style={styles.label}>סיסמא:</Text>
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text.trim())}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>אישור</Text>
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
    paddingHorizontal: 90,
    paddingVertical: 25,
  },
  signingUpText: {
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

export default SignUpScreen;
