import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setAccount } from "./userStore";

export default function Signup() {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/background5.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.top}>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#777"
        />

        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.helperText}>
          3-20 characters, letters, numbers, and underscores only
        </Text>

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#777"
        />
        <Text style={styles.helperText}>
          Min 8 chars: uppercase, lowercase, number, special character
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const name = username.trim() || "User";

            setAccount({
              username: name,
              createdAt: Date.now(),
              metrics: {},
            });

            navigation.replace("Onboarding");
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  top: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 260,
},

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
  },

  card: {
    backgroundColor: "#0F1F2D",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 6,
    fontSize: 16,
  },

  helperText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 14,
    marginTop: 2,
  },

  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    marginTop: 14,
    textAlign: "center",
    color: "#0b63ce",
    textDecorationLine: "underline",
  },
});