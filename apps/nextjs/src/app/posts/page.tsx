import { auth } from "@acme/auth";
import { db, eq, schema } from "@acme/db";

import { PostList } from "./_PostList";
import { PostCreateForm } from "./create/_PostCreateForm";

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
