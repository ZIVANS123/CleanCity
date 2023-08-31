import React, { useEffect, useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import { db } from "../fb";

const MapScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [eventDetails, setEventDetails] = useState("");
  const [eventType, setEventType] = useState("פינוי פחים");
  const [currentDate, setCurrentDate] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const polygonCoordinates = [
    { latitude: 32.7234, longitude: 35.0961 },
    { latitude: 32.7258, longitude: 35.0962 },
    { latitude: 32.7258, longitude: 35.0967 },
    { latitude: 32.7253, longitude: 35.0976 },
    { latitude: 32.7254, longitude: 35.0981 },
    { latitude: 32.7247, longitude: 35.0993 },
    { latitude: 32.7241, longitude: 35.1014 },
    { latitude: 32.7239, longitude: 35.1015 },
    { latitude: 32.7222, longitude: 35.106 },
    { latitude: 32.7206, longitude: 35.1069 },
    { latitude: 32.7203, longitude: 35.1075 },
    { latitude: 32.7201, longitude: 35.1076 },
    { latitude: 32.7189, longitude: 35.107 },
    { latitude: 32.7179, longitude: 35.107 },
    { latitude: 32.7176, longitude: 35.1067 },
    { latitude: 32.7167, longitude: 35.1069 },
    { latitude: 32.7163, longitude: 35.1087 },
    { latitude: 32.7159, longitude: 35.109 },
    { latitude: 32.715, longitude: 35.109 },
    { latitude: 32.7144, longitude: 35.1088 },
    { latitude: 32.7142, longitude: 35.1085 },
    { latitude: 32.7141, longitude: 35.1082 },
    { latitude: 32.7143, longitude: 35.1074 },
    { latitude: 32.7141, longitude: 35.1063 },
    { latitude: 32.713, longitude: 35.1054 },
    { latitude: 32.7124, longitude: 35.1053 },
    { latitude: 32.7119, longitude: 35.1059 },
    { latitude: 32.7117, longitude: 35.1059 },
    { latitude: 32.7113, longitude: 35.1066 },
    { latitude: 32.7111, longitude: 35.1077 },
    { latitude: 32.7116, longitude: 35.1125 },
    { latitude: 32.7119, longitude: 35.1125 },
    { latitude: 32.7122, longitude: 35.1129 },
    { latitude: 32.7127, longitude: 35.1129 },
    { latitude: 32.7135, longitude: 35.1133 },
    { latitude: 32.7142, longitude: 35.1158 },
    { latitude: 32.7145, longitude: 35.1163 },
    { latitude: 32.7157, longitude: 35.1146 },
    { latitude: 32.7163, longitude: 35.1141 },
    { latitude: 32.717, longitude: 35.1139 },
    { latitude: 32.7177, longitude: 35.1139 },
    { latitude: 32.7193, longitude: 35.1144 },
    { latitude: 32.7213, longitude: 35.1154 },
    { latitude: 32.7217, longitude: 35.1157 },
    { latitude: 32.7218, longitude: 35.1162 },
    { latitude: 32.7211, longitude: 35.1174 },
    { latitude: 32.7202, longitude: 35.118 },
    { latitude: 32.7205, longitude: 35.1187 },
    { latitude: 32.721, longitude: 35.1192 },
    { latitude: 32.7238, longitude: 35.1192 },
    { latitude: 32.7251, longitude: 35.1201 },
    { latitude: 32.7255, longitude: 35.1206 },
    { latitude: 32.7261, longitude: 35.1219 },
    { latitude: 32.7268, longitude: 35.1227 },
    { latitude: 32.7271, longitude: 35.1243 },
    { latitude: 32.7267, longitude: 35.1283 },
    { latitude: 32.7274, longitude: 35.1301 },
    { latitude: 32.7274, longitude: 35.1312 },
    { latitude: 32.727, longitude: 35.1328 },
    { latitude: 32.7272, longitude: 35.1333 },
    { latitude: 32.7277, longitude: 35.1366 },
    { latitude: 32.7283, longitude: 35.1379 },
    { latitude: 32.7294, longitude: 35.1393 },
    { latitude: 32.7333, longitude: 35.1392 },
    { latitude: 32.7335, longitude: 35.1394 },
    { latitude: 32.7336, longitude: 35.1396 },
    { latitude: 32.7335, longitude: 35.1412 },
    { latitude: 32.733, longitude: 35.1427 },
    { latitude: 32.7342, longitude: 35.1441 },
    { latitude: 32.7345, longitude: 35.1441 },
    { latitude: 32.7349, longitude: 35.1424 },
    { latitude: 32.7353, longitude: 35.1423 },
    { latitude: 32.7368, longitude: 35.1432 },
    { latitude: 32.7369, longitude: 35.1436 },
    { latitude: 32.7373, longitude: 35.144 },
    { latitude: 32.7379, longitude: 35.1451 },
    { latitude: 32.7381, longitude: 35.1448 },
    { latitude: 32.7385, longitude: 35.1448 },
    { latitude: 32.74, longitude: 35.1463 },
    { latitude: 32.7408, longitude: 35.1466 },
    { latitude: 32.7405, longitude: 35.149 },
    { latitude: 32.7389, longitude: 35.1504 },
    { latitude: 32.7386, longitude: 35.1504 },
    { latitude: 32.7384, longitude: 35.1502 },
    { latitude: 32.7376, longitude: 35.1491 },
    { latitude: 32.7374, longitude: 35.1498 },
    { latitude: 32.7372, longitude: 35.15 },
    { latitude: 32.7353, longitude: 35.1502 },
    { latitude: 32.7333, longitude: 35.1478 },
    { latitude: 32.7322, longitude: 35.1484 },
    { latitude: 32.7323, longitude: 35.149 },
    { latitude: 32.7322, longitude: 35.1495 },
    { latitude: 32.7327, longitude: 35.1505 },
    { latitude: 32.7325, longitude: 35.1509 },
    { latitude: 32.7323, longitude: 35.151 },
    { latitude: 32.729, longitude: 35.1509 },
    { latitude: 32.7285, longitude: 35.1503 },
    { latitude: 32.7284, longitude: 35.149 },
    { latitude: 32.728, longitude: 35.1488 },
    { latitude: 32.7278, longitude: 35.1477 },
    { latitude: 32.7274, longitude: 35.1471 },
    { latitude: 32.7274, longitude: 35.1468 },
    { latitude: 32.7276, longitude: 35.1464 },
    { latitude: 32.7279, longitude: 35.1462 },
    { latitude: 32.728, longitude: 35.1458 },
    { latitude: 32.7267, longitude: 35.1451 },
    { latitude: 32.7265, longitude: 35.1448 },
    { latitude: 32.7239, longitude: 35.1444 },
    { latitude: 32.7238, longitude: 35.1429 },
    { latitude: 32.7234, longitude: 35.1418 },
    { latitude: 32.7225, longitude: 35.1409 },
    { latitude: 32.7221, longitude: 35.1401 },
    { latitude: 32.7217, longitude: 35.1384 },
    { latitude: 32.7209, longitude: 35.1374 },
    { latitude: 32.7209, longitude: 35.1365 },
    { latitude: 32.7207, longitude: 35.1361 },
    { latitude: 32.7201, longitude: 35.1371 },
    { latitude: 32.7196, longitude: 35.1371 },
    { latitude: 32.7185, longitude: 35.135 },
    { latitude: 32.7185, longitude: 35.1347 },
    { latitude: 32.719, longitude: 35.134 },
    { latitude: 32.718, longitude: 35.1321 },
    { latitude: 32.7176, longitude: 35.1322 },
    { latitude: 32.716, longitude: 35.1321 },
    { latitude: 32.715, longitude: 35.1318 },
    { latitude: 32.7136, longitude: 35.132 },
    { latitude: 32.7129, longitude: 35.1316 },
    { latitude: 32.7124, longitude: 35.1316 },
    { latitude: 32.712, longitude: 35.1319 },
    { latitude: 32.711, longitude: 35.1319 },
    { latitude: 32.7107, longitude: 35.1324 },
    { latitude: 32.7097, longitude: 35.1331 },
    { latitude: 32.7081, longitude: 35.1338 },
    { latitude: 32.7079, longitude: 35.1361 },
    { latitude: 32.7077, longitude: 35.1363 },
    { latitude: 32.7049, longitude: 35.1359 },
    { latitude: 32.7038, longitude: 35.1347 },
    { latitude: 32.7031, longitude: 35.1344 },
    { latitude: 32.7025, longitude: 35.1345 },
    { latitude: 32.7011, longitude: 35.1333 },
    { latitude: 32.7011, longitude: 35.133 },
    { latitude: 32.703, longitude: 35.1307 },
    { latitude: 32.7028, longitude: 35.128 },
    { latitude: 32.7023, longitude: 35.1265 },
    { latitude: 32.7017, longitude: 35.1253 },
    { latitude: 32.701, longitude: 35.123 },
    { latitude: 32.701, longitude: 35.1222 },
    { latitude: 32.7012, longitude: 35.1211 },
    { latitude: 32.7029, longitude: 35.1197 },
    { latitude: 32.7034, longitude: 35.1195 },
    { latitude: 32.7037, longitude: 35.1168 },
    { latitude: 32.7037, longitude: 35.1146 },
    { latitude: 32.7045, longitude: 35.1144 },
    { latitude: 32.7046, longitude: 35.1141 },
    { latitude: 32.7044, longitude: 35.1138 },
    { latitude: 32.7032, longitude: 35.1131 },
    { latitude: 32.7026, longitude: 35.1114 },
    { latitude: 32.7023, longitude: 35.111 },
    { latitude: 32.7019, longitude: 35.1112 },
    { latitude: 32.7015, longitude: 35.1124 },
    { latitude: 32.7005, longitude: 35.1132 },
    { latitude: 32.7003, longitude: 35.1132 },
    { latitude: 32.6977, longitude: 35.1121 },
    { latitude: 32.6967, longitude: 35.11 },
    { latitude: 32.6947, longitude: 35.1105 },
    { latitude: 32.6937, longitude: 35.1113 },
    { latitude: 32.6921, longitude: 35.112 },
    { latitude: 32.6889, longitude: 35.1117 },
    { latitude: 32.6887, longitude: 35.1115 },
    { latitude: 32.6886, longitude: 35.1108 },
    { latitude: 32.6878, longitude: 35.1118 },
    { latitude: 32.6875, longitude: 35.1119 },
    { latitude: 32.6855, longitude: 35.1105 },
    { latitude: 32.6849, longitude: 35.1098 },
    { latitude: 32.6848, longitude: 35.1088 },
    { latitude: 32.6846, longitude: 35.1088 },
    { latitude: 32.6842, longitude: 35.1084 },
    { latitude: 32.6841, longitude: 35.1057 },
    { latitude: 32.6843, longitude: 35.1055 },
    { latitude: 32.6919, longitude: 35.1041 },
    { latitude: 32.6963, longitude: 35.1028 },
    { latitude: 32.6971, longitude: 35.1025 },
    { latitude: 32.6971, longitude: 35.1023 },
    { latitude: 32.6973, longitude: 35.1022 },
    { latitude: 32.6983, longitude: 35.1019 },
    { latitude: 32.7153, longitude: 35.0986 },
    { latitude: 32.7198, longitude: 35.097 },
    { latitude: 32.7214, longitude: 35.0966 },
    { latitude: 32.7234, longitude: 35.0961 },
  ];
  const borderscoordinates = [
    [32.7234, 35.0961],
    [32.7258, 35.0962],
    [32.7258, 35.0967],
    [32.7253, 35.0976],
    [32.7254, 35.0981],
    [32.7247, 35.0993],
    [32.7241, 35.1014],
    [32.7239, 35.1015],
    [32.7222, 35.106],
    [32.7206, 35.1069],
    [32.7203, 35.1075],
    [32.7201, 35.1076],
    [32.7189, 35.107],
    [32.7179, 35.107],
    [32.7176, 35.1067],
    [32.7167, 35.1069],
    [32.7163, 35.1087],
    [32.7159, 35.109],
    [32.715, 35.109],
    [32.7144, 35.1088],
    [32.7142, 35.1085],
    [32.7141, 35.1082],
    [32.7143, 35.1074],
    [32.7141, 35.1063],
    [32.713, 35.1054],
    [32.7124, 35.1053],
    [32.7119, 35.1059],
    [32.7117, 35.1059],
    [32.7113, 35.1066],
    [32.7111, 35.1077],
    [32.7116, 35.1125],
    [32.7119, 35.1125],
    [32.7122, 35.1129],
    [32.7127, 35.1129],
    [32.7135, 35.1133],
    [32.7142, 35.1158],
    [32.7145, 35.1163],
    [32.7157, 35.1146],
    [32.7163, 35.1141],
    [32.717, 35.1139],
    [32.7177, 35.1139],
    [32.7193, 35.1144],
    [32.7213, 35.1154],
    [32.7217, 35.1157],
    [32.7218, 35.1162],
    [32.7211, 35.1174],
    [32.7202, 35.118],
    [32.7205, 35.1187],
    [32.721, 35.1192],
    [32.7238, 35.1192],
    [32.7251, 35.1201],
    [32.7255, 35.1206],
    [32.7261, 35.1219],
    [32.7268, 35.1227],
    [32.7271, 35.1243],
    [32.7267, 35.1283],
    [32.7274, 35.1301],
    [32.7274, 35.1312],
    [32.727, 35.1328],
    [32.7272, 35.1333],
    [32.7277, 35.1366],
    [32.7283, 35.1379],
    [32.7294, 35.1393],
    [32.7333, 35.1392],
    [32.7335, 35.1394],
    [32.7336, 35.1396],
    [32.7335, 35.1412],
    [32.733, 35.1427],
    [32.7342, 35.1441],
    [32.7345, 35.1441],
    [32.7349, 35.1424],
    [32.7353, 35.1423],
    [32.7368, 35.1432],
    [32.7369, 35.1436],
    [32.7373, 35.144],
    [32.7379, 35.1451],
    [32.7381, 35.1448],
    [32.7385, 35.1448],
    [32.74, 35.1463],
    [32.7408, 35.1466],
    [32.7405, 35.149],
    [32.7389, 35.1504],
    [32.7386, 35.1504],
    [32.7384, 35.1502],
    [32.7376, 35.1491],
    [32.7374, 35.1498],
    [32.7372, 35.15],
    [32.7353, 35.1502],
    [32.7333, 35.1478],
    [32.7322, 35.1484],
    [32.7323, 35.149],
    [32.7322, 35.1495],
    [32.7327, 35.1505],
    [32.7325, 35.1509],
    [32.7323, 35.151],
    [32.729, 35.1509],
    [32.7285, 35.1503],
    [32.7284, 35.149],
    [32.728, 35.1488],
    [32.7278, 35.1477],
    [32.7274, 35.1471],
    [32.7274, 35.1468],
    [32.7276, 35.1464],
    [32.7279, 35.1462],
    [32.728, 35.1458],
    [32.7267, 35.1451],
    [32.7265, 35.1448],
    [32.7239, 35.1444],
    [32.7238, 35.1429],
    [32.7234, 35.1418],
    [32.7225, 35.1409],
    [32.7221, 35.1401],
    [32.7217, 35.1384],
    [32.7209, 35.1374],
    [32.7209, 35.1365],
    [32.7207, 35.1361],
    [32.7201, 35.1371],
    [32.7196, 35.1371],
    [32.7185, 35.135],
    [32.7185, 35.1347],
    [32.719, 35.134],
    [32.718, 35.1321],
    [32.7176, 35.1322],
    [32.716, 35.1321],
    [32.715, 35.1318],
    [32.7136, 35.132],
    [32.7129, 35.1316],
    [32.7124, 35.1316],
    [32.712, 35.1319],
    [32.711, 35.1319],
    [32.7107, 35.1324],
    [32.7097, 35.1331],
    [32.7081, 35.1338],
    [32.7079, 35.1361],
    [32.7077, 35.1363],
    [32.7049, 35.1359],
    [32.7038, 35.1347],
    [32.7031, 35.1344],
    [32.7025, 35.1345],
    [32.7011, 35.1333],
    [32.7011, 35.133],
    [32.703, 35.1307],
    [32.7028, 35.128],
    [32.7023, 35.1265],
    [32.7017, 35.1253],
    [32.701, 35.123],
    [32.701, 35.1222],
    [32.7012, 35.1211],
    [32.7029, 35.1197],
    [32.7034, 35.1195],
    [32.7037, 35.1168],
    [32.7037, 35.1146],
    [32.7045, 35.1144],
    [32.7046, 35.1141],
    [32.7044, 35.1138],
    [32.7032, 35.1131],
    [32.7026, 35.1114],
    [32.7023, 35.111],
    [32.7019, 35.1112],
    [32.7015, 35.1124],
    [32.7005, 35.1132],
    [32.7003, 35.1132],
    [32.6977, 35.1121],
    [32.6967, 35.11],
    [32.6947, 35.1105],
    [32.6937, 35.1113],
    [32.6921, 35.112],
    [32.6889, 35.1117],
    [32.6887, 35.1115],
    [32.6886, 35.1108],
    [32.6878, 35.1118],
    [32.6875, 35.1119],
    [32.6855, 35.1105],
    [32.6849, 35.1098],
    [32.6848, 35.1088],
    [32.6846, 35.1088],
    [32.6842, 35.1084],
    [32.6841, 35.1057],
    [32.6843, 35.1055],
    [32.6919, 35.1041],
    [32.6963, 35.1028],
    [32.6971, 35.1025],
    [32.6971, 35.1023],
    [32.6973, 35.1022],
    [32.6983, 35.1019],
    [32.7153, 35.0986],
    [32.7198, 35.097],
    [32.7214, 35.0966],
    [32.7234, 35.0961],
  ];

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("en-GB");
    setCurrentDate(currentDate);
  }, []);

  // Function to get the marker icon based on eventType
  const getMarkerIcon = () => {
    if (eventType === "פינוי פחים") {
      return require("../assets/trash.png");
    } else if (eventType === "גיזום") {
      return require("../assets/tree.png");
    } else if (eventType === "הדברה") {
      return require("../assets/pest.png");
    } else {
      return null;
    }
  };

  function isPointInsidePolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }
    return inside;
  }

  const addEventButton = async () => {
    if (eventDetails && currentLocation && currentDate) {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          currentDate: currentDate,
          currentLocation: currentLocation,
          eventDetails: eventDetails,
          eventType: eventType,
          status: "new",
          user: user.email,
          DateOfTreatment: "none",
          DateOfDecision: "none",
        });

        const isInside = isPointInsidePolygon(
          ({ latitude } = currentLocation),
          ({ longitude } = currentLocation),
          borderscoordinates
        );

        if (isInside) {
          Alert.alert(`האירוע נוסף בהצלחה! נמצא בגבולות העיר`);
        } else {
          Alert.alert(`האירוע נמצא מחוץ לגבולות העיר (נוסף למערכת גירסת טסט)`);
        }

        navigation.navigate("MenuScreen");

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    if (!eventDetails) Alert.alert("שגיאת מיקום", " יש למלא את פרטי האירוע");
    if (!currentLocation)
      Alert.alert(
        "שגיאה",
        " נראה שלא הצלחנו לאתר את מיקומך נא ודא שהמיקום מופעל"
      );
    if (!currentDate)
      Alert.alert(" שגיאת זמן", "  לא הצלחנו לקבל ממכשירך את התאריך  ");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.menuText}> הוספת אירוע </Text>
        {/* <Text>Welcome, {user}!</Text> */}
      </View>
      {/* <Text style={styles.currentDate}>{currentDate}</Text> */}
      <MapView
        style={styles.map}
        initialRegion={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }
            : null
        }
        minZoomLevel={13}
        maxZoomLevel={18}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Marker"
            description="This is a marker"
          >
            <Image source={getMarkerIcon()} style={styles.markerImage} />
          </Marker>
        )}
        <Polygon
          coordinates={polygonCoordinates}
          fillColor="#0000000f"
          strokeColor="#00A896"
          strokeWidth={2}
        />
      </MapView>
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>סוג האירוע:</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={eventType}
            onValueChange={(itemValue) => setEventType(itemValue)}
          >
            <Picker.Item label="פינוי פחים" value="פינוי פחים" />
            <Picker.Item label="הדברה" value="הדברה" />
            <Picker.Item label="גיזום" value="גיזום" />
          </Picker>
        </View>
      </View>
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.eventDetailsLabel}>פרטי האירוע:</Text>
        <TextInput
          placeholder="נא להקליד את כל פרטי האירוע"
          style={styles.eventDetailsInput}
          multiline
          value={eventDetails}
          onChangeText={setEventDetails}
        />
        <TouchableOpacity style={styles.button} onPress={addEventButton}>
          <Text style={styles.buttonText}>שליחת האירוע</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05668D",
  },
  topBar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#02C39A",
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  currentDate: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  labelContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    textAlign: "left",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    width: 160, // Set a fixed width as needed
    height: 50,
    marginTop: 10,
    borderRadius: 20,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  eventDetailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventDetailsLabel: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  eventDetailsInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 200,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#F0F3BD",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginLeft: 80,
    marginRight: 80,
    paddingVertical: 10,
    marginTop: 40,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
