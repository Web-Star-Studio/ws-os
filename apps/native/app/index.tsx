import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@ws/backend/convex/_generated/api";

export default function HomeScreen() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WS Starter</Text>
      <Text style={styles.subtitle}>
        Fullstack monorepo with Expo, Convex &amp; Better Auth
      </Text>

      {user ? (
        <Text style={styles.info}>Welcome, {user.user?.email ?? "User"}!</Text>
      ) : (
        <Text style={styles.info}>
          Set up your Convex backend to enable authentication.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  info: {
    fontSize: 14,
    color: "#333",
  },
});
