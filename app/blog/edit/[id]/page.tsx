"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {
  getBlogPostById,
  updateBlogPost,
  BlogPost,
} from "../../../../utils/blogStorage";

interface BlogEditProps {
  params: {id: string};
}

const categories = ["Tech", "Lifestyle", "Business"];

const EditBlogPost = ({params}: BlogEditProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const post = getBlogPostById(params.id);
    if (post) {
      setFormData(post);
    } else {
      router.push("/");
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updatedPost: BlogPost = {
        ...(formData as BlogPost),
        id: formData.id as string,
        date: formData.date as string,
      };
      updateBlogPost(updatedPost);
      router.push("/");
    }
  };

  const validateForm = (): boolean => {
    const currentErrors: string[] = [];
    if (!formData.title) currentErrors.push("Title is required");
    if (!formData.author) currentErrors.push("Author is required");
    if (!formData.summary) currentErrors.push("Summary is required");
    if (!formData.content) currentErrors.push("Content is required");
    if (!formData.category) currentErrors.push("Category is required");
    setErrors(currentErrors);
    return currentErrors.length === 0;
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>Edit Blog Post</h1>

      {errors.length > 0 && (
        <ul className='mb-4'>
          {errors.map((error, index) => (
            <li key={index} className='text-red-500 text-sm'>
              {error}
            </li>
          ))}
        </ul>
      )}

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Title</label>
        <input
          name='title'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
          value={formData.title || ""}
          onChange={handleChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Author
        </label>
        <input
          name='author'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
          value={formData.author || ""}
          onChange={handleChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Summary
        </label>
        <textarea
          name='summary'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
          value={formData.summary || ""}
          onChange={handleChange}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Category
        </label>
        <select
          name='category'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
          value={formData.category || ""}
          onChange={handleChange}>
          <option value=''>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Content
        </label>
        <textarea
          name='content'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
          value={formData.content || ""}
          onChange={handleChange}
        />
      </div>

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        onClick={handleSubmit}>
        Update Post
      </button>
    </div>
  );
};

export default EditBlogPost;
