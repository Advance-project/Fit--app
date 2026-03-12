import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { deleteAccount } from "./userStore";

export default function Profile() {
  const navigation = useNavigation<any>();

  const [editOpen, setEditOpen] = useState(false);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [draftAge, setDraftAge] = useState("");
  const [draftWeight, setDraftWeight] = useState("");
  const [draftHeight, setDraftHeight] = useState("");

  const openEdit = () => {
    setDraftAge(age);
    setDraftWeight(weight);
    setDraftHeight(height);
    setEditOpen(true);
  };

  const saveProfile = () => {
    setAge(draftAge);
    setWeight(draftWeight);
    setHeight(draftHeight);
    setEditOpen(false);
  };

  const handleDeleteAccount = () => {
    const performDelete = () => {
      deleteAccount();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    };

    if (Platform.OS === "web") {
      const confirmed = globalThis.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (!confirmed) return;
      performDelete();
      return;
    }

    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: performDelete,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity style={styles.headerBtn} onPress={openEdit}>
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>U</Text>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.userName}>User</Text>
                <Text style={styles.userSub}>Created 0 days ago</Text>
                <Text style={styles.goalText}>Goal: Build strength and stay active</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>🎂</Text>
                <Text style={styles.statLabel}>Age</Text>
                <Text style={styles.statValue}>{age ? `${age}` : "--"}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statIcon}>⚖️</Text>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{weight ? `${weight} kg` : "--"}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📏</Text>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{height ? `${height} cm` : "--"}</Text>
              </View>
            </View>
          </View>

          
          <Text style={styles.sectionTitle}>Weekly summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>4</Text>
              <Text style={styles.summaryLabel}>Workouts</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>5</Text>
              <Text style={styles.summaryLabel}>Active days</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Day streak</Text>
            </View>
          </View>

          
          <Text style={styles.sectionTitle}>Target muscle (this week)</Text>
          <Text style={styles.sectionSub}>
            Most trained muscle groups from your workouts
          </Text>

          <View style={styles.chartCard}>
            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Back</Text>
                <Text style={styles.progressValue}>4 sessions</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: "85%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Chest</Text>
                <Text style={styles.progressValue}>3 sessions</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: "68%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Shoulders</Text>
                <Text style={styles.progressValue}>2 sessions</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: "50%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Arms</Text>
                <Text style={styles.progressValue}>2 sessions</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: "46%" }]} />
              </View>
            </View>
          </View>

          
          <Text style={styles.sectionTitle}>Cardio sessions (this week)</Text>
          <Text style={styles.sectionSub}>
            Your cardio activity breakdown
          </Text>

          <View style={styles.chartCard}>
            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Running</Text>
                <Text style={styles.progressValue}>20 min</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.cardioFill, { width: "45%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Cycling</Text>
                <Text style={styles.progressValue}>35 min</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.cardioFill, { width: "75%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Rowing</Text>
                <Text style={styles.progressValue}>15 min</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.cardioFill, { width: "35%" }]} />
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>Spinning</Text>
                <Text style={styles.progressValue}>25 min</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.cardioFill, { width: "58%" }]} />
              </View>
            </View>
          </View>

          
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.85}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.85}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </ScrollView>

        
        <Modal transparent visible={editOpen} animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setEditOpen(false)}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <View style={styles.modalTop}>
                <Text style={styles.modalTitle}>Edit profile</Text>
                <TouchableOpacity onPress={() => setEditOpen(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                value={draftAge}
                onChangeText={setDraftAge}
                placeholder="Enter age"
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Weight</Text>
              <TextInput
                style={styles.input}
                value={draftWeight}
                onChangeText={setDraftWeight}
                placeholder="Enter weight"
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Height</Text>
              <TextInput
                style={styles.input}
                value={draftHeight}
                onChangeText={setDraftHeight}
                placeholder="Enter height"
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} activeOpacity={0.85}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  screen: { flex: 1 },

  header: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    color: "#111827",
    fontWeight: "700",
  },
  editIcon: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    padding: 18,
    marginBottom: 18,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#07122b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0b1220",
  },
  userSub: {
    marginTop: 4,
    color: "#7a889c",
    fontSize: 14,
    fontWeight: "700",
  },
  goalText: {
    marginTop: 8,
    color: "#3b4758",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  statBox: {
    width: "31.5%",
    backgroundColor: "#f6f7fb",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  statLabel: {
    color: "#7a889c",
    fontSize: 14,
    fontWeight: "800",
  },
  statValue: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "900",
    color: "#0b1220",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0b1220",
    marginTop: 10,
  },
  sectionSub: {
    marginTop: 6,
    marginBottom: 10,
    color: "#7a889c",
    fontSize: 13,
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 14,
  },
  summaryCard: {
    width: "31.5%",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    paddingVertical: 16,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0b1220",
  },
  summaryLabel: {
    marginTop: 6,
    fontSize: 13,
    color: "#7a889c",
    fontWeight: "700",
    textAlign: "center",
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    padding: 16,
    marginBottom: 18,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0b1220",
  },
  progressValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7a889c",
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#edf1f7",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#0b1220",
  },
  cardioFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#3b82f6",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
  },

  deleteBtn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ef4444",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
  },
  modalTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0b1220",
  },
  modalClose: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  inputLabel: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "800",
    color: "#0b1220",
  },
  input: {
    backgroundColor: "#f6f7fb",
    borderWidth: 1,
    borderColor: "#e6ebf2",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
  },

  saveBtn: {
    marginTop: 18,
    backgroundColor: "#0b1220",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
});