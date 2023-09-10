import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { PostTable } from "~/components/organisms/post/PostTable";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const posts = await db
    .select()
    .from(schema.post)
    .where(eq(schema.post.tenantId, session.user.ti))
    .orderBy(desc(schema.post.id));

  return <PostTable posts={posts} />;
}
