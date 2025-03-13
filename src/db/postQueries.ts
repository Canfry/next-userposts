"use server";

import { getXataClient } from "@/xata";
import { PostsRecord } from "@/xata";
import { redirect } from "next/navigation";
const xata = getXataClient();

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

export async function getPosts(userId: string): Promise<PostsRecord[]> {
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

export async function getPost(postId: string): Promise<PostsRecord | null> {
    try {
        const post = await xata.db.posts.read(postId);
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error('Error getting post:', error);
        return null;
    }
}

export async function searchPosts(search: string, userId: string): Promise<PostsRecord[]> {
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


export async function deletePost(postId: string) {
    await xata.db.posts.delete(postId);
    redirect("/");
}