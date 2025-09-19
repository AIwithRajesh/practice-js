import LikeButton from "@/components/LikeButton";

type postType = {
  id: number;
  title: string;
  body: string;
}[];
export const revalidate = 60;

async function getPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=20",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return false;
  }

  const posts = await res.json();
  return posts;
}

const Blog = async () => {
  const posts: postType = await getPosts();

  return (
    <div className="max-w-[50rem] mx-auto">
      <h1>Blog</h1>
      <div className="flex flex-col justify-center items-center gap-10">
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <LikeButton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
