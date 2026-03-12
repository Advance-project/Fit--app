import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Intro from "./screens/Intro";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Onboarding from "./screens/Onboarding";
import WorkoutHome from "./screens/WorkoutHome";
import LogWorkout from "./screens/LogWorkout";
import AddExercise from "./screens/AddExercise";
import ExploreRoutines from "./screens/ExploreRoutines";
import Program from "./screens/Program";
import Profile from "./screens/Profile";

// ✅ NEW
import ChatRoutine from "./screens/ChatRoutine";

// ✅ NEW: Admin screen
import Admin from "./screens/Admin";

// ✅ NEW: Admin users screen
import AdminUsers from "./screens/AdminUsers";

// ✅ NEW: Admin user details screen
import AdminUserDetails from "./screens/AdminUserDetails";

// ✅ NEW: Admin workout templates screen
import AdminWorkoutTemplates from "./screens/AdminWorkoutTemplates";

// ✅ NEW: Add workout template screen
import AddWorkoutTemplate from "./screens/AddWorkoutTemplate";

// ✅ NEW: Admin statistics screen
import AdminStatistics from "./screens/AdminStatistics";

/* =======================
   TYPES (EXPORTED)
======================= */

export type ExerciseItem = {
  id: string;
  name: string;
  muscle: string;
};

// ✅ NEW: used for sets in LogWorkout + saving to folder
export type WorkoutSet = { kg: number; reps: number };

export type WorkoutExercise = ExerciseItem & {
  sets: WorkoutSet[];
};

export type WorkoutData = {
  createdAt: number;
  title: string;
  exercises: WorkoutExercise[];
};

// ✅ NEW: used for saving program into "Your routines"
export type SavedProgram = {
  programId: string;
  title: string;
  subtitle: string; // e.g. "Saved program"
  savedAt: number;
};

// ✅ NEW: Admin user model (dummy for now)
export type AdminUser = {
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

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;

  // ✅ allow WorkoutHome to receive saved folder + workout + savedProgram
  WorkoutHome:
    | {
        savedFolderName?: string;
        savedWorkout?: WorkoutData;
        savedProgram?: SavedProgram;
      }
    | undefined;

  LogWorkout: { selectedExercises?: ExerciseItem[] } | undefined;

  // ✅ allow AddExercise to receive existingExercises (to prevent duplicates)
  AddExercise: { existingExercises?: ExerciseItem[] } | undefined;

  // ✅ NEW screens
  ExploreRoutines: undefined;
  Program: { programId: string; viewOnly?: boolean } | undefined;

  // ✅ NEW: Profile screen
  Profile: undefined;

  // ✅ NEW: Chat screen
  ChatRoutine: undefined;

  // ✅ NEW: Admin screen
  Admin: undefined;

  // ✅ NEW: AdminUsers screen
  AdminUsers: undefined;

  // ✅ NEW: AdminUserDetails screen
  AdminUserDetails: { user: AdminUser };

  // ✅ NEW: Admin workout templates screen
  AdminWorkoutTemplates:
    | {
        newTemplate?: {
          id: string;
          title: string;
          subtitle: string;
          level: "Beginner" | "Medium" | "Advanced";
          goal: "Gain Muscle" | "Strength" | "Lose Weight";
          typeLabel: string;
        };
      }
    | undefined;

  // ✅ NEW: Add workout template screen
  AddWorkoutTemplate: undefined;

  // ✅ NEW: Admin statistics screen
  AdminStatistics: undefined;
};

/* =======================
   NAVIGATOR
======================= */

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="WorkoutHome" component={WorkoutHome} />
        <Stack.Screen name="LogWorkout" component={LogWorkout} />
        <Stack.Screen name="AddExercise" component={AddExercise} />

        
        <Stack.Screen name="ExploreRoutines" component={ExploreRoutines} />
        <Stack.Screen name="Program" component={Program} />
        <Stack.Screen name="Profile" component={Profile} />

        
        <Stack.Screen name="ChatRoutine" component={ChatRoutine} />

        <Stack.Screen name="Admin" component={Admin} />

        <Stack.Screen name="AdminUsers" component={AdminUsers} />

        <Stack.Screen name="AdminUserDetails" component={AdminUserDetails} />

        <Stack.Screen name="AdminWorkoutTemplates" component={AdminWorkoutTemplates} />

        <Stack.Screen name="AddWorkoutTemplate" component={AddWorkoutTemplate} />

        <Stack.Screen name="AdminStatistics" component={AdminStatistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}