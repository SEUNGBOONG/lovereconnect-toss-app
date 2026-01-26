import { useParams } from "react-router-dom";
import PostFormClient from "./PostFormClient.tsx";

export default function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();

  return (
    <section className="mx-auto max-w-3xl px-2 py-8">
      <PostFormClient mode="edit" postId={Number(postId)} />
    </section>
  );
}
