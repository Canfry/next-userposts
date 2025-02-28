import { getXataClient } from "@/xata";
import { PostsRecord } from "@/xata";

export async function createPost(post: PostsRecord) {
    const xata = getXataClient();
    const record = await xata.db.posts.create(post);
    return record;
}

export async function getPosts() {
    const xata = getXataClient();
    const posts = await xata.db.posts.getMany();
    return posts;
}

