import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { socialLinks } from "~/constant/social";
import Footer from "~/components/Footer";



type Post = {
    id: number;
    title: string;
    content: string;
  };

// Assume you have a static array of posts
const posts: Post[] = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' },
];

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  // Find the post based on the id parameter
  const post = posts.find((post) => post.id === parseInt(id as string, 10));

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="bg-black">
        <div className="h-[1062px]">
        {/* 背景 */}
        <div className="absolute left-0 top-0 z-1">
            <Image
            src={"/post/background.webp"}
            alt="landing background"
            width={1920}
            height={1080}
            />
        </div>
        {/* post detail */}
        <div className="z-10 flex flex-col">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
        </div>
        <div className="flex justify-center">
        <Link className="relative" href={socialLinks.collab} target="_blank">
            <Image
              src="/contact.svg"
              alt="contact button"
              width={222}
              height={86}
            />
        </Link>
        </div>
        <Footer />
    </div>
  );
}
