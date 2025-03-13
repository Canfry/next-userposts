'use client'

import { useState, useEffect } from 'react'
import { searchPosts, getPosts, deletePost } from '@/db/postQueries'
import { PostsRecord } from '@/xata'
import PostCards from './PostCards'

export default function SearchPost({ userId }: { userId: string }) {
    const [search, setSearch] = useState<string>('')
    const [posts, setPosts] = useState<PostsRecord[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Load initial posts
    useEffect(() => {
        const loadInitialPosts = async () => {
            try {
                const initialPosts = await getPosts(userId)
                setPosts(initialPosts)
            } catch (error) {
                console.error('Error loading initial posts:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadInitialPosts()
    }, [userId])

    const handleSearch = async (searchTerm: string) => {
        try {
            setIsLoading(true)
            const searchResults = await searchPosts(searchTerm, userId)
            setPosts(searchResults)
        } catch (error) {
            console.error('Error searching posts:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeletePost = async (postId: string) => {
        try {
            await deletePost(postId)
            // Update the local state by filtering out the deleted post
            setPosts(posts.filter(post => post.id !== postId))
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    return (
        <div className="w-full">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    const newValue = e.target.value
                    setSearch(newValue)
                    handleSearch(newValue)
                }}
                placeholder="Search posts..."
                className="w-full p-2 rounded-md bg-gray-900 border-2 border-gray-900"
            />
            <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                    <div className="text-center">Loading posts...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center">No posts found</div>
                ) : (
                    posts.map((post) => (
                            <div key={post.id} className="flex items-center justify-between gap-4 shadow-xl shadow-gray-900 border-2 border-gray-900 rounded-md p-4 w-full hover:scale-101 transition-all duration-300 cursor-pointer">
                                <PostCards post={post} deletePost={handleDeletePost} />
                            </div>
                    ))
                )}
            </div>
        </div>
    )
}