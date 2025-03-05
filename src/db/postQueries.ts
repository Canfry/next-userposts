"use server";

import { getXataClient } from "@/xata";
import { PostsRecord } from "@/xata";
// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const xata = getXataClient();

// const { userId } = await auth();
// console.log(userId);

export async function createPost(formData: FormData, userId: string) {
    const title = formData.get("title");
    const content = formData.get("content");
    const post = {
        title,
        body: content,
        userId: userId
    } as PostsRecord;
    await xata.db.posts.create(post);
    redirect("/");
}

export async function getPosts(userId: string) {
    const posts = await xata.db.posts.filter({
        'userId': userId as string
    }).getMany();
    return posts;
}

export async function searchPosts(search: string, userId: string) {
    // Get all posts for the current user
    const allPosts = await xata.db.posts.filter({
        'userId': userId as string
    }).getMany();

    // Filter posts based on search term (case insensitive)
    const filteredPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.body?.toLowerCase().includes(search.toLowerCase())
    );

    return filteredPosts;
}


