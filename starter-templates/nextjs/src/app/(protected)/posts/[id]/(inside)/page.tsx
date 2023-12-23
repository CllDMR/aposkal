import { notFound } from "next/navigation";

import { and, db, eq, schema } from "@acme/db";

import { PostCard } from "~/components/organisms/post/PostCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params: { id } }: PageProps) {
  const session = await getServerSession();
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

  return <PostCard initPost={post} id={id} />;
}
