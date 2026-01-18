import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={require("../assets/images/background5.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Title placed lower (not too high) */}
      <Text style={styles.title}>Login</Text>

      {/* Bottom dark card */}
      <View style={styles.card}>
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#777" />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#777"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    justifyContent: "flex-end",
  },

  // ✅ Move title down by anchoring it above the card
  title: {
    position: "absolute",
    bottom: 300, 
    alignSelf: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#000201",

    // optional: makes text readable on bright images
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
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
    marginBottom: 14,
    fontSize: 16,
    color: "#111",
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
    color: "#4DA3FF",
    textDecorationLine: "underline",
  },
});
