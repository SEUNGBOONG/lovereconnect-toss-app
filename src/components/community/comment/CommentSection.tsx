import { useEffect, useMemo, useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoadPrevCommentsButton from "./LoadPrevCommentsButton";

import {
  useCommentsFirstLoad,
  useLoadPrevComments,
  useCreateComment,
} from "../../../hooks/useComment";

import type { Comment } from "../../../types/community";

interface Props {
  postId: number;
}

const PAGE_SIZE = 5;

export default function CommentSection({ postId }: Props) {
  const firstLoad = useCommentsFirstLoad({
    postId,
    size: PAGE_SIZE,
  });

  const initialComments = useMemo<Comment[]>(() => {
    if (!firstLoad.comments.length) return [];
    return [...firstLoad.comments].reverse();
  }, [firstLoad.comments]);

  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!initialComments.length) return;

    setComments(initialComments);
    setCurrentPage(firstLoad.currentPage);
    setTotalPages(firstLoad.totalPages);
    setTotalCount(firstLoad.totalCount);
  }, [initialComments, firstLoad.currentPage, firstLoad.totalPages, firstLoad.totalCount]);

  const nextPage = currentPage + 1 < totalPages ? currentPage + 1 : null;

  const prevCommentsQuery = useLoadPrevComments({
    postId,
    page: nextPage ?? 0,
    size: PAGE_SIZE,
    enabled: nextPage !== null,
  });

  const handleLoadPrev = () => {
    if (!prevCommentsQuery.data || nextPage === null) return;

    const newComments = [...prevCommentsQuery.data.data.content].reverse();

    setComments((prev) => [...newComments, ...prev]);
    setCurrentPage(nextPage);
  };

  /* ===== 생성 ===== */

  const createComment = useCreateComment();

  const handleCreateRoot = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
    setTotalCount((c) => c + 1);
  };

  const handleCreateReply = (parentId: number, reply: Comment) => {
    setComments((prev) =>
      prev.map((c) =>
        c.commentId === parentId ? { ...c, children: [...(c.children ?? []), reply] } : c,
      ),
    );
    setTotalCount((c) => c + 1);
  };

  /* ===== 수정 ===== */

  const handleUpdate = (commentId: number, content: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.commentId === commentId) {
          return {
            ...c,
            content,
          };
        }

        return {
          ...c,
          children: c.children
            ? c.children.map((child) =>
                child.commentId === commentId ? { ...child, content } : child,
              )
            : null, // ⭐ 핵심
        };
      }),
    );
  };

  /* ===== 삭제 ===== */

  const handleDelete = (commentId: number) => {
    setComments((prev) =>
      prev
        .filter((c) => c.commentId !== commentId)
        .map((c) => ({
          ...c,
          children: c.children ? c.children.filter((child) => child.commentId !== commentId) : null,
        })),
    );
    setTotalCount((c) => Math.max(0, c - 1));
  };

  return (
    <div className="mt-8 space-y-6">
      <CommentHeader total={totalCount} />

      {nextPage !== null && (
        <LoadPrevCommentsButton onClick={handleLoadPrev} loading={prevCommentsQuery.isFetching} />
      )}

      <CommentList
        comments={comments}
        postId={postId}
        onCreateReply={handleCreateReply}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      <CommentForm
        postId={postId}
        onSuccess={handleCreateRoot}
        isLoading={createComment.isPending}
      />
    </div>
  );
}
