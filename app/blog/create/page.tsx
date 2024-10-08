import React from "react";
import BlogPostWizard from "../../../components/Organism/BlogPostWizard";

const CreateBlogPost = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Create Blog Post
        </h1>
        <BlogPostWizard />
      </div>
    </div>
  );
};

export default CreateBlogPost;
