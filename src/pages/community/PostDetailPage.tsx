import { useParams } from "react-router-dom";

import type { Post } from "../../types/community";
import { usePostDetail } from "../../hooks/usePosts.ts";
import PostDetailCard from "../../components/community/post/PostDetailCard.tsx";
import CommentSection from "../../components/community/comment/CommentSection.tsx";

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  const numericPostId = Number(postId);

  const { data, isLoading, isError } = usePostDetail(numericPostId);

  if (isLoading) {
    return <div className="py-10 text-center text-sm">불러오는 중...</div>;
  }

  if (isError || !data?.data) {
    return (
      <div className="py-10 text-center text-sm text-red-500">게시글을 불러올 수 없습니다.</div>
    );
  }

  const post: Post = data.data;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <PostDetailCard post={post} />
      <CommentSection postId={post.id} />
    </main>
  );
}
