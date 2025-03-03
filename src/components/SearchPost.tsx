'use client'

import { useState } from 'react'
import { searchPosts } from '@/db/postQueries'
import { PostsRecord } from '@/xata'
import PostCards from './PostCards'

export default function SearchPost({ initialPosts }: { initialPosts: PostsRecord[] }) {
    const [search, setSearch] = useState<string>('')
    const [posts, setPosts] = useState<PostsRecord[]>(initialPosts)

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        const searchResults = await searchPosts(e.target.value)
        setPosts(searchResults)
    }

    return (
        <div className="w-full">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search posts..."
                className="w-full p-2 rounded-md bg-gray-900 border-2 border-gray-900"
            />
            <div className="flex flex-col gap-4 mt-4">
                {posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-start justify-start gap-4 shadow-xl shadow-gray-900 border-2 border-gray-900 rounded-md p-4 w-full hover:scale-101 transition-all duration-300 cursor-pointer">
                        <PostCards post={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}