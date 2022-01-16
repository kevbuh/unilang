/* (C) Ryan Lin Xiang, 2020
Created: 21/08/2020
Last modified: 24/08/2020
*/

import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";

export default function Output(props) {
  const { status, image, predictions, error } = props;
  let output;

  if (!error) {
    if (status === "modelReady" && !image)
      output = <Text style={styles.placeholder}>&uarr;</Text>;
    else if (status === "finished") {
      output = (
        <ImageBackground
          source={image}
          blurRadius={20}
          style={styles.predictedImage}
          imageStyle={styles.predictedImageExtras}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Text style={styles.predictedNumberHeader}>
              Probability of melanoma:{" "}
            </Text>
            <Text style={styles.predictedNumber}>
              {Math.round(predictions.dataSync()[0] * 100)}{" "}
              {/* convert tensor into array and access the first category probability*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
            </Text>
          </View>
        </ImageBackground>
      );
    } else output = <ActivityIndicator size="large" animating={true} />;
  } else output = <Text>Please try again</Text>;

  return output;
}

const styles = StyleSheet.create({
  predictedImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { fontSize: 50 },
  predictedImageExtras: { borderRadius: 20 },
  predictedNumberHeader: { fontSize: 12, color: "white" },
  predictedNumberPercentage: { fontSize: 24, color: "white" },
  predictedNumber: {
    fontSize: 64,
    fontWeight: "bold",
    color: "darkorange",
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 10, width: 10 },
  },
});

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, TextInput, Alert, Button } from "react-native";
// import SQLite from "react-native-sqlite-storage";

// const db = SQLite.openDatabase(
//   {
//     name: "MainDB",
//     location: "default",
//   },
//   () => {},
//   (error) => {
//     console.log(error);
//   }
// );

// export default function Login() {
//   const [name, setName] = useState("");
//   const [name2, setName2] = useState("");

//   const [age, setAge] = useState("");
//   const [age2, setAge2] = useState("");

//   useEffect(() => {
//     createTable();
//     getData();
//   }, []);

//   const createTable = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS " +
//           "Users " +
//           "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
//       );
//     });
//   };

//   const getData = () => {
//     try {
//       db.transaction((tx) => {
//         tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
//           var len = results.rows.length;
//           if (len > 0) {
//             // navigation.navigate("Home");
//             console.log("Success!");
//             var userName = results.rows.item(0).Name;
//             var userAge = results.rows.item(0).Age;
//             setName2(userName);
//             setAge2(userAge);
//           }
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const setData = async () => {
//     if (name.length == 0 || age.length == 0) {
//       Alert.alert("Warning!", "Please write your data.");
//     } else {
//       try {
//         await db.transaction(async (tx) => {
//           // await tx.executeSql(
//           //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
//           // );
//           await tx.executeSql("INSERT INTO Users (Name, Age) VALUES (?,?)", [
//             name,
//             age,
//           ]);
//         });
//         // navigation.navigate("Home");
//         console.log("Success 2!");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const removeData = async () => {
//     try {
//       db.transaction((tx) => {
//         tx.executeSql(
//           "DELETE FROM Users",
//           [],
//           () => {
//             // navigation.navigate("Login");
//             console.log("Deleted the data!");
//           },
//           (error) => {
//             console.log("Uh oh");
//             console.log(error);
//           }
//         );
//       });
//     } catch (error) {
//       console.log("Uh oh");
//       console.log(error);
//     }
//   };

//   return (
//     <View style={styles.body}>
//       <Text>
//         Hello, {name2}, {age2}!
//       </Text>
//       {/* <Text style={styles.text}>ffffffff</Text> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your name"
//         onChangeText={(value) => setName(value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your age"
//         onChangeText={(value) => setAge(value)}
//       />
//       <Button title="Login" onPress={setData} />
//       <Button title="Remove" color="#f40100" onPress={removeData} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 100,
//   },
//   logo: {
//     width: 200,
//     height: 100,
//     margin: 20,
//   },
//   text: {
//     fontSize: 30,
//     color: "#ffffff",
//     marginBottom: 130,
//   },
//   input: {
//     width: 300,
//     borderWidth: 1,
//     padding: 10,
//     borderColor: "#555",
//     borderRadius: 10,
//     backgroundColor: "#ffffff",
//     textAlign: "center",
//     fontSize: 20,
//     marginBottom: 10,
//   },
// });

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { Camera } from "expo-camera";

// function HomeScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused
//                 ? "ios-information-circle"
//                 : "ios-information-circle-outline";
//             } else if (route.name === "Settings") {
//               iconName = focused ? "ios-list" : "ios-list";
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "tomato",
//           tabBarInactiveTintColor: "gray",
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     padding: 10,
//     backgroundColor: "#e4007c",
//     borderRadius: 10,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 18,
//     color: "white",
//   },
// });

// import React from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import * as ImagePicker from "expo-image-picker";
// import * as jpeg from "jpeg-js";

// export default function App() {
//   const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
//   const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
//   const [image, setImage] = useState(null); // gets and sets the image selected from the user
//   const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
//   const [error, setError] = useState(false); // gets and sets any errors

//   useEffect(() => {
//     (async () => {
//       await tf.ready(); // wait for Tensorflow.js to get ready
//       setTfReady(true); // set the state

//       // bundle the model files and load the model:
//       const model = require("./assets/model.json");
//       const weights = require("./assets/weights.bin");
//       const loadedModel = await tf.loadGraphModel(
//         bundleResourceIO(model, weights)
//       );

//       setModel(loadedModel); // load the model to the state
//       getPermissionAsync(); // get the permission for camera roll access for iOS users
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

/* (C) Ryan Lin Xiang, 2020
Created: 21/08/2020
Last modified: 24/08/2020
*/

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import * as ImagePicker from "expo-image-picker";
// import * as jpeg from "jpeg-js";
// import Output from "./Output";

// async function getPermissionAsync() {
//   if (Constants.platform.ios) {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status !== "granted") {
//       alert("Permission for camera access required.");
//     }
//   }
// }

// async function imageToTensor(source) {
//   // load the raw data of the selected image into an array
//   const response = await fetch(source.uri, {}, { isBinary: true });
//   const rawImageData = await response.arrayBuffer();
//   const { width, height, data } = jpeg.decode(rawImageData, {
//     useTArray: true, // Uint8Array = true
//   });

//   // remove the alpha channel:
//   const buffer = new Uint8Array(width * height * 3);
//   let offset = 0;
//   for (let i = 0; i < buffer.length; i += 3) {
//     buffer[i] = data[offset];
//     buffer[i + 1] = data[offset + 1];
//     buffer[i + 2] = data[offset + 2];
//     offset += 4;
//   }

//   // transform image data into a tensor
//   const img = tf.tensor3d(buffer, [width, height, 3]);

//   // calculate square center crop area
//   const shorterSide = Math.min(width, height);
//   const startingHeight = (height - shorterSide) / 2;
//   const startingWidth = (width - shorterSide) / 2;
//   const endingHeight = startingHeight + shorterSide;
//   const endingWidth = startingWidth + shorterSide;

//   // slice and resize the image
//   const sliced_img = img.slice(
//     [startingWidth, startingHeight, 0],
//     [endingWidth, endingHeight, 3]
//   );
//   const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);

//   // add a fourth batch dimension to the tensor
//   const expanded_img = resized_img.expandDims(0);

//   // normalise the rgb values to -1-+1
//   return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
// }

// export default function App() {
//   const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
//   const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
//   const [image, setImage] = useState(null); // gets and sets the image selected from the user
//   const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
//   const [error, setError] = useState(false); // gets and sets any errors

//   useEffect(() => {
//     (async () => {
//       await tf.ready(); // wait for Tensorflow.js to get ready
//       setTfReady(true); // set the state

//       // bundle the model files and load the model:
//       const model = require("./assets/model.json");
//       const weights = require("./assets/weights.bin");
//       const loadedModel = await tf.loadGraphModel(
//         bundleResourceIO(model, weights)
//       );

//       setModel(loadedModel); // load the model to the state
//       getPermissionAsync(); // get the permission for camera roll access for iOS users
//     })();
//   }, []);

//   async function handlerSelectImage() {
//     try {
//       let response = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
//         quality: 1, // go for highest quality possible
//         aspect: [4, 3], // maintain aspect ratio of the crop area on Android; on iOS crop area is always a square
//       });

//       if (!response.cancelled) {
//         const source = { uri: response.uri };
//         setImage(source); // put image path to the state
//         const imageTensor = await imageToTensor(source); // prepare the image
//         const predictions = await model.predict(imageTensor); // send the image to the model
//         setPredictions(predictions); // put model prediction to the state
//       }
//     } catch (error) {
//       setError(error);
//     }
//   }

//   function reset() {
//     setPredictions(null);
//     setImage(null);
//     setError(false);
//   }

//   let status, statusMessage, showReset;
//   const resetLink = (
//     <Text onPress={reset} style={styles.reset}>
//       Restart
//     </Text>
//   );

//   if (!error) {
//     if (isTfReady && model && !image && !predictions) {
//       status = "modelReady";
//       statusMessage = "Model is ready.";
//     } else if (model && image && predictions) {
//       status = "finished";
//       statusMessage = "Prediction finished.";
//       showReset = true;
//     } else if (model && image && !predictions) {
//       status = "modelPredict";
//       statusMessage = "Model is predicting...";
//     } else {
//       status = "modelLoad";
//       statusMessage = "Model is loading...";
//     }
//   } else {
//     statusMessage = "Unexpected error occured.";
//     showReset = true;
//     console.log(error);
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.innercontainer}>
//         <Text style={styles.status}>
//           {statusMessage} {showReset ? resetLink : null}
//         </Text>
//         <TouchableOpacity
//           style={styles.imageContainer}
//           onPress={model && !predictions ? handlerSelectImage : () => {}} // Activates handler only if the model has been loaded and there are no predictions done yet
//         >
//           <Output
//             status={status}
//             image={image}
//             predictions={predictions}
//             error={error}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   innercontainer: {
//     marginTop: -50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   status: { marginBottom: 10 },
//   reset: { color: "blue" },
//   imageContainer: {
//     width: 300,
//     height: 300,
//     borderRadius: 20,
//     opacity: 0.7,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "lightgrey",
//     borderColor: "white",
//     borderWidth: 3,
//     borderStyle: "dotted",
//   },
// });
