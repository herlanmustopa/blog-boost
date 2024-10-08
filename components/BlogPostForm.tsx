"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {saveBlogPost, BlogPost} from "../utils/blogStorage";
import {v4 as uuidv4} from "uuid";

const categories = ["Tech", "Lifestyle", "Business"];

const BlogPostWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [errors, setErrors] = useState<string[]>([]);
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
      router.push("/blog");
    }
  };

  return (
    <div>
      <h1>Create a Blog Post</h1>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{color: "red"}}>
              {error}
            </li>
          ))}
        </ul>
      )}

      {step === 1 && (
        <div>
          <h2>Step 1: Blog Metadata</h2>
          <input
            name='title'
            placeholder='Title'
            onChange={handleChange}
            value={formData.title || ""}
          />
          <input
            name='author'
            placeholder='Author Name'
            onChange={handleChange}
            value={formData.author || ""}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Blog Summary & Category</h2>
          <textarea
            name='summary'
            placeholder='Summary'
            onChange={handleChange}
            value={formData.summary || ""}
          />
          <select
            name='category'
            onChange={handleChange}
            value={formData.category || ""}>
            <option value=''>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Blog Content</h2>
          <textarea
            name='content'
            placeholder='Blog Content'
            onChange={handleChange}
            value={formData.content || ""}
          />
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Step 4: Review & Submit</h2>
          <div>
            <h3>Title:</h3> <p>{formData.title}</p>
            <h3>Author:</h3> <p>{formData.author}</p>
            <h3>Summary:</h3> <p>{formData.summary}</p>
            <h3>Category:</h3> <p>{formData.category}</p>
            <h3>Content:</h3> <p>{formData.content}</p>
          </div>
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default BlogPostWizard;
