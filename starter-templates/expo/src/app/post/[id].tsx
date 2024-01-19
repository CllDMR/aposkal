import { Stack, useGlobalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { api } from "@acme/api-client";

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.post.get.useQuery({ id });

  if (!data) return null;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.title }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{data.title}</Text>
        <Text className="py-4 text-white">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
}
