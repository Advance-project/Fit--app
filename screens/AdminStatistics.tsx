import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { isAdminAuthenticated } from "./userStore";

const screenWidth = Dimensions.get("window").width;

type StatsResponse = {
  totalUsers: number;
  newUsersThisWeek: number;
  newUsersLastWeek: number;
  weeklySignups: number[];
  monthlyUserGrowth: number[];
  weeklyActiveUsers: number[];
};

export default function AdminStatistics() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigation.replace("AdminLogin");
    }
  }, [navigation]);

  
  const stats: StatsResponse = {
    totalUsers: 128,
    newUsersThisWeek: 14,
    newUsersLastWeek: 9,
    weeklySignups: [4, 7, 6, 9, 8, 11, 14],
    monthlyUserGrowth: [25, 38, 52, 71, 94, 128],
    weeklyActiveUsers: [18, 24, 21, 28, 31, 29, 35],
  };

  const growthDiff = useMemo(() => {
    return stats.newUsersThisWeek - stats.newUsersLastWeek;
  }, [stats]);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(11, 18, 32, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#0b1220",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#e5e7eb",
    },
    fillShadowGradient: "#0b1220",
    fillShadowGradientOpacity: 0.08,
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>App-wide statistics</Text>

          <View style={styles.headerRight} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>Growth overview</Text>

          <View style={styles.row}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total users</Text>
              <Text style={styles.statValue}>{stats.totalUsers}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>This week</Text>
              <Text style={styles.statValue}>{stats.newUsersThisWeek}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last week</Text>
              <Text style={styles.statValue}>{stats.newUsersLastWeek}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Weekly change</Text>
              <Text style={styles.statValue}>
                {growthDiff >= 0 ? `+${growthDiff}` : growthDiff}
              </Text>
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>New users in last 7 weeks</Text>
            <LineChart
              data={{
                labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
                datasets: [
                  {
                    data: stats.weeklySignups,
                  },
                ],
              }}
              width={screenWidth - 48}
              height={220}
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              withInnerLines
              withOuterLines={false}
              withVerticalLines={false}
              style={styles.chart}
            />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Total users growth by month</Text>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    data: stats.monthlyUserGrowth,
                  },
                ],
              }}
              width={screenWidth - 48}
              height={220}
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              withInnerLines
              withOuterLines={false}
              withVerticalLines={false}
              style={styles.chart}
            />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Weekly active users</Text>
            <BarChart
              data={{
                labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
                datasets: [
                  {
                    data: stats.weeklyActiveUsers,
                  },
                ],
              }}
              width={screenWidth - 48}
              height={240}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfig}
              fromZero
              withInnerLines
              showValuesOnTopOfBars
              style={styles.chart}
            />
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
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
  headerLeft: { width: 44, height: 36, justifyContent: "center" },
  backArrow: { fontSize: 26, color: "#111827", fontWeight: "600" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  headerRight: { width: 44 },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0b1220",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  statCard: {
    width: "48.5%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    padding: 16,
  },

  statLabel: {
    color: "#6b7280",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 8,
  },

  statValue: {
    color: "#0b1220",
    fontWeight: "900",
    fontSize: 26,
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e6ebf2",
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginTop: 14,
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0b1220",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  chart: {
    borderRadius: 16,
  },
});