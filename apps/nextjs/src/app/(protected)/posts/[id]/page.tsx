import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { Main } from "~/components/atoms/Main";
import { PostCard } from "~/components/organisms/post/PostCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const post = await db
    .select()
    .from(schema.post)
    .where(
      and(eq(schema.post.tenantId, session.user.ti), eq(schema.post.id, id)),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!post) notFound();

  return (
    <Main>
      <h1>Post {id} Page</h1>

      <PostCard initPost={post} id={id} />
    </Main>
  );
}
