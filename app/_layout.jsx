import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="index"
        options={{
          title: "ZApp", // Set the title for the login screen here
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard", // Set the title for the dashboard screen here
        }}
      />
    </Stack>
  );
}
