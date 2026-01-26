import { useState } from "react";
import { useCreateComment } from "../../../hooks/useComment";
import type { Comment } from "../../../types/community";

interface Props {
  postId: number;
  parentId?: number;
  onSuccess: (comment: Comment) => void;
  isLoading?: boolean;
}

export default function CommentForm({
  postId,
  parentId,
  onSuccess,
  isLoading: externalLoading = false,
}: Props) {
  const [content, setContent] = useState("");
  const createComment = useCreateComment();

  const isLoading = externalLoading || createComment.isPending;

  const handleSubmit = () => {
    if (!content.trim() || isLoading) return;

    createComment.mutate(
      {
        postId,
        content,
        ...(parentId !== undefined ? { parentId } : {}),
      },
      {
        onSuccess: (res) => {
          onSuccess(res.data);
          setContent("");
        },
      },
    );
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "답글을 입력하세요" : "댓글을 입력하세요"}
        className="flex-1 resize-none rounded-md border px-3 py-2 text-sm"
        disabled={isLoading}
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="rounded-md bg-main-pink px-4 text-sm text-white disabled:opacity-50"
      >
        등록
      </button>
    </div>
  );
}
