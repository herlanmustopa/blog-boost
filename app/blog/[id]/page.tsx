"use client";
import React, {useState, useEffect} from "react";
import {getBlogPostById, BlogPost} from "../../../utils/blogStorage";

interface BlogPostDetailProps {
  params: {id: string};
}

const BlogPostDetail = ({params}: BlogPostDetailProps) => {
  const [post, setPost] = useState<BlogPost | undefined>();

  useEffect(() => {
    const storedPost = getBlogPostById(params.id);
    setPost(storedPost);
  }, [params.id]);

  return (
    <>
      {post && (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
          <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

          <div className='flex items-center justify-between mb-6'>
            <div>
              <p className='text-gray-600'>
                <span className='font-medium'>Author: </span>
                {post.author}
              </p>
              <p className='text-gray-500 text-sm'>
                {post.date} | {post.category}
              </p>
            </div>
            <div className='flex space-x-4'></div>
          </div>

          <div className='bg-gray-50 p-4 rounded-md shadow-inner mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Summary:</h2>
            <p className='text-gray-700'>{post.summary}</p>
          </div>

          <article className='prose max-w-none'>
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      )}
    </>
  );
};

export default BlogPostDetail;
