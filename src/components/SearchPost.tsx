"use client";

import { useState, useEffect } from "react";
import { searchPosts, getPosts } from "@/db/postQueries";
import { PostsRecord } from "@/xata";
import PostCards from "./PostCards";
import Link from "next/link";

export default function SearchPost({ userId }: { userId: string }) {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<PostsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        const initialPosts = await getPosts(userId);
        setPosts(initialPosts);
      } catch (error) {
        console.error("Error loading initial posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialPosts();
  }, [userId]);

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const searchResults = await searchPosts(searchTerm, userId);
      setPosts(searchResults);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearch(newValue);
          handleSearch(newValue);
        }}
        placeholder="Search posts..."
        className="w-full p-3 rounded-md bg-[#1a1a2e] border border-purple-800/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
      />
      <div className="flex flex-col gap-4 mt-4">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-400">No posts found</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 bg-[#1a1a2e] border border-purple-800/30 rounded-md p-4 w-full hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-900/20"
            >
              <Link
                href={`/posts/${post.id}`}
                className="flex flex-col flex-1 items-start justify-center gap-4"
              >
                <PostCards post={post} />
              </Link>

              <p>
                Created: {new Date(post.xata.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
