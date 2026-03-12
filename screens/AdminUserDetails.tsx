import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isAdminAuthenticated } from "./userStore";

type AdminUser = {
  _id: string;
  email: string;
  username: string;
  password_hash: string;
  role: "admin" | "user";
  is_active: boolean;
  created_at: string;
  last_login_at: string;
  profile: {
    age: number;
    height_cm: number;
    weight_kg: number;
    sex: string;
    goal: string;
  };
  preferences: {
    units: string;
    privacy: { store_chat_history: boolean };
  };
};

export default function AdminUserDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigation.replace("AdminLogin");
    }
  }, [navigation]);

  const initialUser: AdminUser | undefined = route.params?.user;
  const [user, setUser] = useState<AdminUser | undefined>(initialUser);
  const [editOpen, setEditOpen] = useState(false);

  const title = user?.username ?? "User";

  const display = useMemo(() => {
    if (!user) return null;

    return {
      core: [
        { k: "email", v: user.email },
        { k: "username", v: user.username },
        { k: "password_hash", v: user.password_hash },
        { k: "is_active", v: user.is_active ? "true" : "false" },
        { k: "created_at", v: user.created_at },
        { k: "last_login_at", v: user.last_login_at },
      ],
      profile: [
        { k: "age", v: String(user.profile.age) },
        { k: "height_cm", v: String(user.profile.height_cm) },
        { k: "weight_kg", v: String(user.profile.weight_kg) },
        { k: "sex", v: user.profile.sex },
        { k: "goal", v: user.profile.goal },
      ],
    };
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.screen}>
          <Text style={{ padding: 16 }}>No user data.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{title}</Text>

          <TouchableOpacity onPress={() => setEditOpen(true)} style={styles.headerRight}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* User */}
          <Text style={styles.sectionTitle}>User</Text>
          <View style={styles.card}>
            {(display?.core ?? []).map((x, idx) => (
              <View key={x.k} style={[styles.kvRow, idx !== 0 && styles.kvBorder]}>
                <Text style={styles.k}>{x.k}</Text>
                <Text style={styles.v}>{x.v}</Text>
              </View>
            ))}
          </View>

          {/* Profile */}
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.card}>
            {(display?.profile ?? []).map((x, idx) => (
              <View key={x.k} style={[styles.kvRow, idx !== 0 && styles.kvBorder]}>
                <Text style={styles.k}>{x.k}</Text>
                <Text style={styles.v}>{x.v}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>

        
        <Modal transparent visible={editOpen} animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setEditOpen(false)}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <Text style={styles.modalTitle}>Edit user (UI only)</Text>

              <TouchableOpacity style={styles.saveBtn} onPress={() => setEditOpen(false)}>
                <Text style={styles.saveText}>Close</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerLeft: { width: 44 },
  backArrow: { fontSize: 26, fontWeight: "600" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },
  headerRight: { width: 60, alignItems: "flex-end" },
  editText: { color: "#1e88e5", fontWeight: "900" },

  content: { padding: 16 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    color: "#0b1220",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    overflow: "hidden",
    marginBottom: 16,
  },

  kvRow: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kvBorder: { borderTopWidth: 1, borderTopColor: "#eef2f7" },

  k: { color: "#6b7280", fontWeight: "900" },
  v: { color: "#0b1220", fontWeight: "900" },

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
  modalTitle: { fontSize: 18, fontWeight: "900", marginBottom: 14 },

  saveBtn: {
    backgroundColor: "#1e88e5",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "900" },
});
