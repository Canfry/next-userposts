import Form from "next/form";
import { createPost } from "@/db/postQueries";
import CreatePostButton from "./CreatePostButton";


export default async function CreatePostForm({ userId }: { userId: string }) {

    const handleCreatePost = async (formData: FormData) => {
        "use server"
        await createPost(formData, userId);
    }
    return (
        <>
            <div className="flex flex-col items-center gap-4 pt-10 h-[500px] justify-start w-[80dvw] m-auto text-white">
                <h1 className="text-4xl font-bold mb-4 text-center">Create a new post</h1>
                <Form action={handleCreatePost} className="flex flex-col gap-4 items-start h-[500px] justify-start w-[60dvw] m-auto text-white">
                    <input type="text" placeholder="Title" name="title" className="w-full p-2 rounded-md bg-gray-900 border-2 border-gray-900" />
                    <textarea placeholder="Content" name="content" className="w-full p-2 rounded-md bg-gray-900 border-2 border-gray-900" />
                    <input type="hidden" name="userId" />
                    <CreatePostButton />
                </Form>
            </div>
        </>
    );
}
