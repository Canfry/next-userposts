"use client";

import Form from "next/form";
import { createPost } from "@/db/postQueries";

export default function CreatePostForm() {
    return (
        <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Form action={async (formData: FormData) => {
                await createPost(formData);
            }} className="flex flex-col items-start h-[500px] justify-start w-full text-white border-gray-900 shadow-sm shadow-gray-900 border-2">
                <input type="text" placeholder="Title" name="title" />
                <textarea placeholder="Content" name="content" />
                <input type="hidden" name="userId" />
                <button type="submit">Create Post</button>
            </Form>
        </div>
    );
}
