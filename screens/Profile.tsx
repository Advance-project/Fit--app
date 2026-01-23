import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getAccount, updateMetrics } from "./userStore";

export default function Profile() {
  const navigation = useNavigation<any>();
  const acct = getAccount();

  const username = acct?.username ?? "User";
  const createdAt = acct?.createdAt ?? Date.now();
  const metrics = acct?.metrics ?? {};

  const daysSinceCreated = useMemo(() => {
    const diff = Date.now() - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days < 0 ? 0 : days;
  }, [createdAt]);

  const [editOpen, setEditOpen] = useState(false);

  const [age, setAge] = useState(metrics.age?.toString() ?? "");
  const [weightKg, setWeightKg] = useState(metrics.weightKg?.toString() ?? "");
  const [heightCm, setHeightCm] = useState(metrics.heightCm?.toString() ?? "");

  const initials = (username.trim()[0] ?? "U").toUpperCase();

  const save = () => {
    const ageNum = age.trim() ? Number(age) : undefined;
    const wNum = weightKg.trim() ? Number(weightKg) : undefined;
    const hNum = heightCm.trim() ? Number(heightCm) : undefined;

    updateMetrics({
      age: Number.isFinite(ageNum as number) ? (ageNum as number) : undefined,
      weightKg: Number.isFinite(wNum as number) ? (wNum as number) : undefined,
      heightCm: Number.isFinite(hNum as number) ? (hNum as number) : undefined,
    });

    setEditOpen(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity style={styles.headerRight} onPress={() => setEditOpen(true)}>
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Top card */}
          <View style={styles.topCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{username}</Text>
              <Text style={styles.meta}>Created {daysSinceCreated} {daysSinceCreated === 1 ? "day" : "days"} ago</Text>

              <View style={styles.metricsRow}>
                <View style={styles.metricPill}>
                  <Text style={styles.metricLabel}>Age</Text>
                  <Text style={styles.metricValue}>{metrics.age ?? "—"}</Text>
                </View>

                <View style={styles.metricPill}>
                  <Text style={styles.metricLabel}>Weight</Text>
                  <Text style={styles.metricValue}>
                    {metrics.weightKg != null ? `${metrics.weightKg} kg` : "—"}
                  </Text>
                </View>

                <View style={styles.metricPill}>
                  <Text style={styles.metricLabel}>Height</Text>
                  <Text style={styles.metricValue}>
                    {metrics.heightCm != null ? `${metrics.heightCm} cm` : "—"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Sketch-like blocks (placeholders for now) */}
          <Text style={styles.sectionTitle}>Target muscle (this week)</Text>
          <View style={styles.blockCard}>
            <Text style={styles.blockHint}>
              (Later you can add a chart here: back, biceps, chest, shoulders, abs, triceps)
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Cardio sessions (this week)</Text>
          <View style={styles.blockCard}>
            <Text style={styles.blockHint}>
              (Later you can add a chart here: running, cycling, rowing, swimming, spinning)
            </Text>
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>

        {/* Edit modal */}
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
                value={age}
                onChangeText={setAge}
                placeholder="e.g. 22"
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="#9aa3af"
              />

              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                value={weightKg}
                onChangeText={setWeightKg}
                placeholder="e.g. 70"
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="#9aa3af"
              />

              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                value={heightCm}
                onChangeText={setHeightCm}
                placeholder="e.g. 175"
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="#9aa3af"
              />

              <TouchableOpacity style={styles.saveBtn} onPress={save} activeOpacity={0.9}>
                <Text style={styles.saveText}>Save</Text>
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
  screen: { flex: 1, backgroundColor: "#f6f7fb" },

  header: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerLeft: { width: 44, height: 36, justifyContent: "center" },
  backArrow: { fontSize: 26, color: "#111827", fontWeight: "600" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#111827" },
  headerRight: { width: 44, alignItems: "flex-end" },
  editIcon: { fontSize: 20, color: "#111827", fontWeight: "900" },

  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },

  topCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#0b1220",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 22, fontWeight: "900" },

  name: { fontSize: 20, fontWeight: "900", color: "#0b1220" },
  meta: { marginTop: 6, color: "#7a889c", fontWeight: "700" },

  metricsRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  metricPill: {
    backgroundColor: "#f6f7fb",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  metricLabel: { color: "#7a889c", fontWeight: "800", fontSize: 12 },
  metricValue: { marginTop: 4, color: "#0b1220", fontWeight: "900" },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "900",
    color: "#0b1220",
  },

  blockCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e6ebf2",
  },
  blockHint: { color: "#7a889c", fontWeight: "700", lineHeight: 20 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },
  modalTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#0b1220" },
  modalClose: { fontSize: 18, fontWeight: "900", color: "#111827" },

  inputLabel: { marginTop: 10, color: "#0b1220", fontWeight: "900" },
  input: {
    marginTop: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
  },

  saveBtn: {
    marginTop: 16,
    backgroundColor: "#1e88e5",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});
