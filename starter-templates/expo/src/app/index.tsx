import { FlashList } from "@shopify/flash-list";
import { Link, Stack } from "expo-router";
import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "@acme/api-client";
import type { RouterOutputs } from "@acme/api";

function PostCard(props: {
  post: RouterOutputs["post"]["list"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <TouchableOpacity>
            <Text className="text-xl font-semibold text-danger-400">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-white">{props.post.content}</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <Text className="font-bold uppercase text-danger-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreatePost() {
  const utils = api.useContext();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.list.invalidate();
    },
  });

  return (
    <View className="mt-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-danger-500">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-danger-500">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TouchableOpacity
        className="rounded bg-danger-400 p-2"
        onPress={() => {
          mutate({
            title,
            content,
            publishAt: new Date(),
            isDraft: false,
          });
        }}
      >
        <Text className="font-semibold text-white">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
}

const Index = () => {
  const utils = api.useContext();

  const postQuery = api.post.list.useQuery({});

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.list.invalidate(),
  });

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-danger-400">T3</Text> Turbo
        </Text>

        <Button
          onPress={() => void utils.post.list.invalidate()}
          title="Refresh posts"
          color={"#f472b6"}
        />

        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};

export default Index;
