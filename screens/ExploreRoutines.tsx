import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Nav = NativeStackNavigationProp<RootStackParamList, "ExploreRoutines">;

const LEVELS = ["All", "Beginner", "Medium", "Advanced"] as const;
const GOALS = ["All", "Gain Muscle", "Strength", "Lose Weight"] as const;

type ProgramItem = {
  id: string;
  title: string;
  subtitle: string;
  level: (typeof LEVELS)[number];
  goal: (typeof GOALS)[number];
};

const PROGRAMS: ProgramItem[] = [
  {
    id: "ppl_beginner_gym",
    title: "Beginner Push/Pull/Legs\n(Gym Equipment)",
    subtitle: "3 routines",
    level: "Beginner",
    goal: "Gain Muscle",
  },
  {
    id: "fullbody_intermediate_gym",
    title: "Intermediate Full-Body\n(Gym Equipment)",
    subtitle: "3 routines",
    level: "Medium",
    goal: "Strength",
  },
  {
    id: "ppl_intermediate_gym",
    title: "Intermediate Push/Pull/Legs\n(Gym Equipment)",
    subtitle: "3 routines",
    level: "Medium",
    goal: "Gain Muscle",
  },
  {
    id: "fullbody_beginner_home",
    title: "Beginner Full-Body\n(Equipment-Free)",
    subtitle: "3 routines",
    level: "Beginner",
    goal: "Lose Weight",
  },
];

export default function ExploreRoutines() {
  const navigation = useNavigation<Nav>();

  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [goal, setGoal] = useState<(typeof GOALS)[number]>("All");

  const [levelOpen, setLevelOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      const levelOk = level === "All" ? true : p.level === level;
      const goalOk = goal === "All" ? true : p.goal === goal;
      return levelOk && goalOk;
    });
  }, [level, goal]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Explore</Text>

          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Programs</Text>

          {/* Filters */}
          <View style={styles.filtersRow}>
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.85} onPress={() => setLevelOpen(true)}>
              <Text style={styles.filterText}>{level === "All" ? "Level" : level}</Text>
              <Text style={styles.chev}>⌄</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.85} onPress={() => setGoalOpen(true)}>
              <Text style={styles.filterText}>{goal === "All" ? "Goal" : goal}</Text>
              <Text style={styles.chev}>⌄</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          {filtered.map((p) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.9}
              style={styles.programCard}
              onPress={() => navigation.navigate("Program", { programId: p.id })}
            >
              <View style={styles.programThumb}>
                <Text style={styles.programThumbText}>
                  {p.id.includes("ppl") ? "PUSH\nPULL\nLEGS" : "FULL\nBODY"}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.programTitle}>{p.title}</Text>
                <Text style={styles.programSub}>{p.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 90 }} />
        </ScrollView>

        
        
        
        <Modal transparent visible={levelOpen} animationType="fade">
          <Pressable style={styles.sheetOverlay} onPress={() => setLevelOpen(false)}>
            <Pressable style={styles.sheet} onPress={() => {}}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Level</Text>

              <View style={styles.gridRow}>
                {LEVELS.filter((x) => x !== "All").map((opt) => {
                  const active = opt === level;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.gridCard, active && styles.gridCardActive]}
                      activeOpacity={0.9}
                      onPress={() => {
                        setLevel(opt);
                        setLevelOpen(false);
                      }}
                    >
                      <Text style={styles.gridIcon}>▮▮▮</Text>
                      <Text style={styles.gridText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setLevel("All");
                  setLevelOpen(false);
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Goal sheet */}
        <Modal transparent visible={goalOpen} animationType="fade">
          <Pressable style={styles.sheetOverlay} onPress={() => setGoalOpen(false)}>
            <Pressable style={styles.sheet} onPress={() => {}}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Goal</Text>

              <View style={styles.gridRow}>
                {GOALS.filter((x) => x !== "All").map((opt) => {
                  const active = opt === goal;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.gridCard, active && styles.gridCardActive]}
                      activeOpacity={0.9}
                      onPress={() => {
                        setGoal(opt);
                        setGoalOpen(false);
                      }}
                    >
                      <Text style={styles.gridIcon}>🏁</Text>
                      <Text style={styles.gridText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setGoal("All");
                  setGoalOpen(false);
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
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

  content: { paddingHorizontal: 16, paddingTop: 14 },

  sectionTitle: { fontSize: 26, fontWeight: "900", color: "#0b1220", marginBottom: 12 },

  filtersRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  filterBtn: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterText: { fontSize: 16, fontWeight: "700", color: "#111827" },
  chev: { fontSize: 16, color: "#111827" },

  programCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  programThumb: {
    width: 110,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  programThumbText: { fontWeight: "900", color: "#1e88e5", textAlign: "center", lineHeight: 18 },
  programTitle: { fontSize: 18, fontWeight: "900", color: "#0b1220" },
  programSub: { marginTop: 10, color: "#9aa3af", fontWeight: "700" },

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

  sheetOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingBottom: 18, paddingTop: 10, paddingHorizontal: 16 },
  sheetHandle: { alignSelf: "center", width: 54, height: 6, borderRadius: 3, backgroundColor: "#d1d5db", marginBottom: 10 },
  sheetTitle: { fontSize: 20, fontWeight: "900", color: "#111827", textAlign: "center", paddingVertical: 10 },

  gridRow: { flexDirection: "row", gap: 12, paddingTop: 8, paddingBottom: 14 },
  gridCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  gridCardActive: { borderColor: "#1e88e5" },
  gridIcon: { fontSize: 22, marginBottom: 10 },
  gridText: { fontSize: 16, fontWeight: "800", color: "#111827" },

  clearBtn: { alignSelf: "center", marginTop: 6, paddingVertical: 10, paddingHorizontal: 16 },
  clearText: { color: "#1e88e5", fontWeight: "900" },
});
