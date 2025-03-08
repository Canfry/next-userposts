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
    try {
        const posts = await xata.db.posts.filter({
            'userId': userId
        }).getMany();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error('Error getting posts:', error);
        return [];
    }
}

export async function searchPosts(search: string, userId: string) {
    try {
        // Get all posts for the current user
        const allPosts = await xata.db.posts.filter({
            'userId': userId
        }).getMany();

        // If search is empty, return all posts
        if (!search.trim()) {
            return JSON.parse(JSON.stringify(allPosts));
        }

        // Filter posts based on search term (case insensitive)
        const filteredPosts = allPosts.filter(post =>
            post.title?.toLowerCase().includes(search.toLowerCase()) ||
            post.body?.toLowerCase().includes(search.toLowerCase())
        );

        return JSON.parse(JSON.stringify(filteredPosts));
    } catch (error) {
        console.error('Error searching posts:', error);
        return [];
    }
}


