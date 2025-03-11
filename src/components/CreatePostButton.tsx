"use client"

import { useFormStatus } from "react-dom";

export default function CreatePostButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer" disabled={pending}>{pending ? "Creating..." : "Create Post"}</button>
    );
}