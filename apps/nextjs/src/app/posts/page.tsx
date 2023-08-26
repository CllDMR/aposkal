import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";

import { db, schema } from "@acme/db";

import { PostList } from "./_PostList";

export default async function PostsPage() {
  const posts = await db.select().from(schema.post);

  async function createAction(formData: FormData) {
    "use server";
    const validationSchema = zfd.formData({
      title: zfd.text(),
      content: zfd.text(),
      authorId: zfd.text(),
      ownerId: zfd.text(),
    });

    const result = validationSchema.safeParse(formData);

    if (result.success) {
      await db.insert(schema.post).values(result.data);
      revalidatePath("/posts");
    } else console.error(result.error.flatten());
  }

  return (
    <main>
      <h1>Posts Page</h1>

      <form className="" action={createAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <input type="text" id="content" name="content" />
        </div>

        <div>
          <label htmlFor="authorId">AuthorId</label>
          <input type="text" id="authorId" name="authorId" />
        </div>

        <div>
          <label htmlFor="ownerId">OwnerId</label>
          <input type="text" id="ownerId" name="ownerId" />
        </div>

        <button type="submit">Send</button>
      </form>

      <PostList posts={posts} />
    </main>
  );
}
