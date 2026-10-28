import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cores } from "../theme";

export default function LayoutPrincipal() {
  return (
    <>
      <StatusBar style="light" backgroundColor={cores.fundo} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.branco,
          headerTitleStyle: { fontWeight: "800" },
          contentStyle: { backgroundColor: cores.fundo }
        }}
      >
        <Stack.Screen name="index" options={{ title: "Adivinha Número" }} />
        <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
      </Stack>
    </>
  );
}
