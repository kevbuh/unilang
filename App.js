import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Voice from "@react-native-voice/voice";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";

export default function App() {
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const speak = () => {
    for (let i = 0; i < results.length; i++) {
      Speech.speak(results[i]);
    }
  };

  useEffect(() => {
    function onSpeechResults(e) {
      setResults(e.value ?? []);
    }
    function onSpeechError(e) {
      console.error(e);
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function toggleListening() {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        setResults([]);
        await Voice.start("en-US");
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>UniLang</Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          {results.length > 0
            ? "Results:"
            : "No results.\nPress the button and start speaking!"}
        </Text>
        <View
          style={{
            padding: 20,
            backgroundColor: "#f1f1f1",
            minHeight: 300,
            borderRadius: 20,
          }}
        >
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={{ fontSize: 20 }}>
                {result}
              </Text>
            );
          })}
        </View>
        <View
          style={{
            marginVertical: 60,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={toggleListening}
            style={{
              padding: 10,
              maxWidth: "50%",
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Ionicons
              name={isListening ? "mic" : "mic-off"}
              size={30}
              style={[isListening ? styles.iconOn : styles.iconOff]}
            />
          </TouchableOpacity>
          {results.length > 0 && !isListening ? (
            <TouchableOpacity
              style={{
                padding: 10,
                maxWidth: "50%",
                borderRadius: 10,
                justifyContent: "center",
                backgroundColor: "#f1f1f1",
              }}
              onPress={speak}
            >
              <Ionicons
                name={isListening ? "ear" : "ear-outline"}
                size={30}
                style={[isListening ? styles.iconOn : styles.iconOff]}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: 10,
  },
  iconOn: {
    color: "#50e3c2",
  },
  iconOff: {
    color: "#111",
  },
});
