import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { Main } from "~/components/atoms/Main";
import { PostCreateForm } from "~/components/organisms/post/PostCreateForm";
import { PostList } from "~/components/organisms/post/PostList";
import { PostTable } from "~/components/organisms/post/PostTable";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const posts = await db
    .select()
    .from(schema.post)
    .where(eq(schema.post.tenantId, session.user.ti))
    .orderBy(desc(schema.post.id));

  return (
    <Main>
      <h1>Posts Page</h1>

      <PostCreateForm />

      <PostTable posts={posts} />

      <PostList posts={posts} />
    </Main>
  );
}
