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

        {/* ✅ NEW */}
        <Stack.Screen name="ExploreRoutines" component={ExploreRoutines} />
        <Stack.Screen name="Program" component={Program} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
