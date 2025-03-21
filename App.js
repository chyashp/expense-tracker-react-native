import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";
import ExpensesContextProvider from "./store/Expenses-context";


const App = () => {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function ExpenseOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate("ManageExpense");
                }}
              />
            );
          },
        })}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',

        }}>
          <Stack.Screen
            name="ExpenseOverview"
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
            presentation: 'modal'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
