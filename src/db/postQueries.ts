"use server";

import { getXataClient } from "@/xata";
import { PostsRecord } from "@/xata";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// export async function createPost(post: PostsRecord) {
//     const xata = getXataClient();
//     const record = await xata.db.posts.create(post);
//     return record;
// }

export async function createPost(formData: FormData) {
    const xata = getXataClient();
    const title = formData.get("title");
    const content = formData.get("content");
    const { userId } = await auth();
    const post = {
        title,
        body: content,
        userId: userId
    } as PostsRecord;
    await xata.db.posts.create(post);
    redirect("/");
}

export async function getPosts() {
    const { userId } = await auth();

    const xata = getXataClient();
    const posts = await xata.db.posts.filter({
        'userId': userId as string
    }).getMany();
    return posts;
}

