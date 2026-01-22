import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Nav = NativeStackNavigationProp<RootStackParamList, "Program">;

type Route = {
  key: string;
  name: string;
  params?: { programId: string; viewOnly?: boolean };
};

export default function Program() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();

  const programId = route.params?.programId ?? "";
  const viewOnly = route.params?.viewOnly === true;

  const isPPL = programId.includes("ppl");

  const title = isPPL
    ? "Beginner Push/Pull/Legs (Gym Equipment)"
    : "Beginner Full-Body (Equipment-Free)";

  const onSaveProgram = () => {
    navigation.navigate("WorkoutHome", {
      savedProgram: {
        programId,
        title,
        subtitle: "Saved program",
        savedAt: Date.now(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Program</Text>

          <TouchableOpacity style={styles.headerRight} onPress={() => {}}>
            <Text style={styles.share}>⤴</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Cover */}
          <View style={styles.coverWrap}>
            <View style={styles.coverThumb}>
              <Text style={styles.coverThumbText}>
                {isPPL ? "PUSH\nPULL\nLEGS" : "FULL\nBODY"}
              </Text>
            </View>

            <Text style={styles.programName}>{title}</Text>

            <Text style={styles.createdBy}>Created by Hevy</Text>

            {/* ✅ Save OR Go Back (view-only) */}
            {!viewOnly ? (
              <TouchableOpacity
                style={styles.saveBtn}
                activeOpacity={0.9}
                onPress={onSaveProgram}
              >
                <Text style={styles.saveBtnText}>Save Program</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.saveBtn}
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.saveBtnText}>Go Back</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.desc}>
              This beginner program has three weekly workouts: push, pull, and legs.
            </Text>

            <View style={styles.statsRow}>
              <Text style={styles.stat}>▮▮▮  Beginner</Text>
              <Text style={styles.stat}>🏋️  Gym</Text>
              <Text style={styles.stat}>💪  Gain Muscle</Text>
              <Text style={styles.stat}>📋  3 Routines</Text>
            </View>
          </View>

          {/* Routines */}
          <Text style={styles.section}>Routines</Text>

          <View style={styles.routineBlock}>
            <View style={styles.routineTop}>
              <Text style={styles.routineTitle}>Push</Text>
              <Text style={styles.dots}>•••</Text>
            </View>
            <Text style={styles.routineDesc}>
              The first workout focuses on the push muscles of the upper body.
            </Text>

            <View style={styles.exerciseRow}>
              <View style={styles.exerciseIcon}><Text style={{ fontSize: 18 }}>⭕</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>Warm Up</Text>
                <Text style={styles.exerciseSub}>1 set</Text>
              </View>
            </View>

            {[
              "Bench Press (Barbell)",
              "Shoulder Press (Dumbbell)",
              "Butterfly (Pec Deck)",
              "Lateral Raise (Dumbbell)",
              "Triceps Rope Pushdown",
            ].map((x) => (
              <View key={x} style={styles.exerciseRow}>
                <View style={styles.exerciseIcon}><Text style={{ fontSize: 18 }}>🏋️</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseNameBlue}>{x}</Text>
                  <Text style={styles.exerciseSub}>3 sets · 12–15 reps</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.routineBlock}>
            <View style={styles.routineTop}>
              <Text style={styles.routineTitle}>Pull</Text>
              <Text style={styles.dots}>•••</Text>
            </View>
            <Text style={styles.routineDesc}>
              This workout focuses on the upper body muscles involved in pulling motions.
            </Text>

            {[
              "Lat Pulldown (Cable)",
              "Seated Cable Row - V Grip (Cable)",
              "Shrug (Dumbbell)",
              "Hammer Curl (Dumbbell)",
              "Face Pull",
            ].map((x) => (
              <View key={x} style={styles.exerciseRow}>
                <View style={styles.exerciseIcon}><Text style={{ fontSize: 18 }}>🏋️</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseNameBlue}>{x}</Text>
                  <Text style={styles.exerciseSub}>3 sets · 10–12 reps</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.routineBlock}>
            <View style={styles.routineTop}>
              <Text style={styles.routineTitle}>Legs</Text>
              <Text style={styles.dots}>•••</Text>
            </View>
            <Text style={styles.routineDesc}>
              The final workout focuses exclusively on the lower body muscles.
            </Text>

            {[
              "Leg Press (Machine)",
              "Lying Leg Curl (Machine)",
              "Leg Extension (Machine)",
              "Standing Calf Raise (Machine)",
            ].map((x) => (
              <View key={x} style={styles.exerciseRow}>
                <View style={styles.exerciseIcon}><Text style={{ fontSize: 18 }}>🏋️</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseNameBlue}>{x}</Text>
                  <Text style={styles.exerciseSub}>3 sets · 12–15 reps</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 90 }} />
        </ScrollView>

        {/* Bottom tabs */}
        <View style={styles.bottomTabs}>
          <TouchableOpacity activeOpacity={0.8} style={styles.tab}>
            <Text style={styles.tabIcon}>🏋️</Text>
            <Text style={styles.tabTextActive}>Workout</Text>
          </TouchableOpacity>

          <View style={styles.tabDivider} />

          <TouchableOpacity activeOpacity={0.8} style={styles.tab}>
            <Text style={styles.tabIcon}>👤</Text>
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  screen: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerLeft: { width: 44, height: 36, justifyContent: "center" },
  backArrow: { fontSize: 26, color: "#111827", fontWeight: "600" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#111827" },
  headerRight: { width: 44, alignItems: "flex-end" },
  share: { fontSize: 22, color: "#111827", fontWeight: "700" },

  content: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16 },

  coverWrap: { paddingBottom: 10 },
  coverThumb: {
    width: 150,
    height: 120,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  coverThumbText: { fontWeight: "900", color: "#1e88e5", textAlign: "center", lineHeight: 20 },

  programName: { fontSize: 24, fontWeight: "900", color: "#0b1220" },
  createdBy: { marginTop: 8, color: "#9aa3af", fontWeight: "700" },

  saveBtn: { marginTop: 14, backgroundColor: "#1e88e5", borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  saveBtnText: { color: "#fff", fontSize: 18, fontWeight: "900" },

  desc: { marginTop: 16, fontSize: 16, color: "#111827", lineHeight: 22 },

  statsRow: { marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  stat: { color: "#111827", fontWeight: "800" },

  section: { marginTop: 18, fontSize: 18, fontWeight: "800", color: "#9aa3af" },

  routineBlock: { marginTop: 18, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#eef2f7" },
  routineTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  routineTitle: { fontSize: 22, fontWeight: "900", color: "#0b1220" },
  dots: { fontSize: 18, color: "#111827" },
  routineDesc: { marginTop: 10, fontSize: 16, color: "#111827", lineHeight: 22 },

  exerciseRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 18 },
  exerciseIcon: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#f3f4f6", alignItems: "center", justifyContent: "center" },
  exerciseName: { fontSize: 18, fontWeight: "800", color: "#0b1220" },
  exerciseNameBlue: { fontSize: 18, fontWeight: "900", color: "#1e88e5" },
  exerciseSub: { marginTop: 6, color: "#9aa3af", fontWeight: "700" },

  bottomTabs: {
    height: 64,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e6ebf2",
    flexDirection: "row",
    alignItems: "center",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  tabIcon: { fontSize: 18 },
  tabTextActive: { fontWeight: "900", color: "#0b1220" },
  tabText: { fontWeight: "700", color: "#6b7280" },
  tabDivider: { width: 1, height: "70%", backgroundColor: "#dfe6f1" },
});
