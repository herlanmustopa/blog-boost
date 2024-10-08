export interface BlogPost {
  id: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  date: string;
  category: string;
}

const BLOG_POSTS_KEY = "blog_posts";

const isBrowser = typeof window !== "undefined";

export const saveBlogPost = (post: BlogPost) => {
  if (isBrowser) {
    const posts = getBlogPosts();
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify([...posts, post]));
  }
};

export const getBlogPosts = (): BlogPost[] => {
  if (isBrowser) {
    const posts = localStorage.getItem(BLOG_POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  }
  return [];
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  if (isBrowser) {
    const posts = getBlogPosts();
    return posts.find((post) => post.id === id);
  }
  return undefined;
};

export const deleteBlogPost = (id: string) => {
  if (isBrowser) {
    const posts = getBlogPosts();
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updatedPosts));
  }
};


export const updateBlogPost = (updatedPost: BlogPost) => {
  if (isBrowser) {
    const posts = getBlogPosts();
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post,
    );
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updatedPosts));
  }
};