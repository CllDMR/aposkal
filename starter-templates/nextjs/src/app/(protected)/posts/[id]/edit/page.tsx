import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { PostEditForm } from "~/components/organisms/post/PostEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PostEditPage({ params: { id } }: PageProps) {
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

  return <PostEditForm post={post} />;
}
