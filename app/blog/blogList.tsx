"use client";
import React, {useState, useEffect} from "react";
import {getBlogPosts, deleteBlogPost, BlogPost} from "../../utils/blogStorage";
import Link from "next/link";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const storedPosts = getBlogPosts();
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className='w-full h-full p-6 bg-gray-50 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-6 text-black'>Blog Posts</h1>
      {posts.length === 0 ? (
        <p className='text-gray-500'>No posts yet. Create one!</p>
      ) : (
        <ul className='space-y-4 h-full w-full'>
          {posts.map((post) => (
            <li
              key={post.id}
              className='bg-white p-4 rounded-md shadow-sm flex justify-between items-center'>
              <div>
                <Link href={`/${post.id}`}>
                  <div className='text-xl font-semibold text-blue-600 hover:underline'>
                    {post.title}
                  </div>
                </Link>
                <p className='text-gray-600'>By {post.author}</p>
                <p>{post.summary}</p>
                <p className='text-sm text-gray-400'>
                  {post.date} | {post.category}
                </p>
              </div>
              <div className='flex space-x-2'>
                <Link href={`/blog/edit/${post.id}`}>
                  <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600'>
                    Edit
                  </button>
                </Link>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                  onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className='mt-4'>
        <Link href='/blog/create'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            Create New Post
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogList;
