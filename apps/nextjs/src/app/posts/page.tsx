import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { PostCreateForm } from "~/components/organisms/post/PostCreateForm";
import { PostList } from "~/components/organisms/post/PostList";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const posts = await db
    .select()
    .from(schema.post)
    .where(eq(schema.post.tenantId, session.user.ti))
    .orderBy(desc(schema.post.id));

  return (
    <main>
      <h1>Posts Page</h1>

      <PostCreateForm />

      <PostList posts={posts} />
    </main>
  );
}
