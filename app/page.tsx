import BlogList from "./blog/blogList";

export default function Home() {
  return (
    <div className='items-center justify-items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex items-center sm:items-start'>
        <BlogList />
      </main>
    </div>
  );
}
