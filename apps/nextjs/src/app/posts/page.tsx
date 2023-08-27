import { auth } from "@acme/auth";
import { db, eq, schema } from "@acme/db";

import { PostCreateForm } from "~/components/organisms/post/PostCreateForm";
import { PostList } from "~/components/organisms/post/PostList";

export default async function PostsPage() {
  const session = await auth();
  const posts = await db
    .select()
    .from(schema.post)
    .where(eq(schema.post.tenantId, session.user.ti));

  return (
    <main>
      <h1>Posts Page</h1>

      <PostCreateForm />

      <PostList posts={posts} />
    </main>
  );
}
