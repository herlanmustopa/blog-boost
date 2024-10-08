"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {saveBlogPost, BlogPost} from "../../utils/blogStorage";
import Dialog from "../Molecules/Dialog";
import Input from "../Molecules/Input";
import Select from "../Molecules/Select";
import TextArea from "../Molecules/TextArea";

const categories = ["Tech", "Lifestyle", "Business"];

const BlogPostWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const validateStep = (): boolean => {
    const currentErrors: string[] = [];

    if (step === 1) {
      if (!formData.title) currentErrors.push("Title is required");
      if (!formData.author) currentErrors.push("Author is required");
    } else if (step === 2) {
      if (!formData.summary) currentErrors.push("Summary is required");
      if (!formData.category) currentErrors.push("Category is required");
    } else if (step === 3) {
      if (!formData.content) currentErrors.push("Content is required");
    }

    setErrors(currentErrors);
    return currentErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      const newPost: BlogPost = {
        ...formData,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      } as BlogPost;
      saveBlogPost(newPost);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Create a Blog Post
      </h1>

      {errors.length > 0 && (
        <ul className='mb-4'>
          {errors.map((error, index) => (
            <li key={index} className='text-red-500 text-sm'>
              {error}
            </li>
          ))}
        </ul>
      )}

      {step === 1 && (
        <div>
          <h2 className='text-xl font-semibold mb-4'>Step 1: Blog Metadata</h2>
          <Input
            label='Title'
            name='title'
            value={formData.title || ""}
            onChange={handleChange}
            type='text'
          />
          <Input
            label='Author Name'
            name='author'
            value={formData.author || ""}
            onChange={handleChange}
            type='text'
          />
          <div className='flex justify-between'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className='text-xl font-semibold mb-4'>
            Step 2: Blog Summary & Category
          </h2>
          <Input
            label='Summary'
            name='summary'
            value={formData.summary || ""}
            onChange={handleChange}
            type='textarea'
          />
          <Select
            label='Category'
            value={formData.category || ""}
            onChange={handleChange}
            categories={categories}
          />
          <div className='flex justify-between'>
            <button
              className='bg-gray-300 text-black px-4 py-2 rounded-md'
              onClick={handlePrev}>
              Back
            </button>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className='text-xl font-semibold mb-4'>Step 3: Blog Content</h2>
          <TextArea
            label='Content'
            name='content'
            value={formData.content || ""}
            onChange={handleChange}
          />
          <div className='flex justify-between'>
            <button
              className='bg-gray-300 text-black px-4 py-2 rounded-md'
              onClick={handlePrev}>
              Back
            </button>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className='text-xl font-semibold mb-4'>
            Step 4: Review & Submit
          </h2>
          <div className='mb-4'>
            <h3 className='font-medium'>Title:</h3> <p>{formData.title}</p>
          </div>
          <div className='mb-4'>
            <h3 className='font-medium'>Author:</h3> <p>{formData.author}</p>
          </div>
          <div className='mb-4'>
            <h3 className='font-medium'>Summary:</h3> <p>{formData.summary}</p>
          </div>
          <div className='mb-4'>
            <h3 className='font-medium'>Category:</h3>{" "}
            <p>{formData.category}</p>
          </div>
          <div className='mb-4'>
            <h3 className='font-medium'>Content:</h3> <p>{formData.content}</p>
          </div>
          <div className='flex justify-between'>
            <button
              className='bg-gray-300 text-black px-4 py-2 rounded-md'
              onClick={handlePrev}>
              Back
            </button>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded-md'
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {showSuccess && <Dialog message='Success' />}
    </div>
  );
};

export default BlogPostWizard;
