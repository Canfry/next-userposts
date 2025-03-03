"use server";

import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "@clerk/nextjs/server";

export default async function NewPost() {
    const { userId } = await auth();
    return (
        <CreatePostForm userId={userId as string} />
    );
}