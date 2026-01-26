import { useState } from "react";
import { MoreVertical } from "lucide-react";

import CommentForm from "./CommentForm";
import { useDeleteComment, useUpdateComment } from "../../../hooks/useComment";
import { useOverlay } from "../../../hooks/useOverlay";
import DeleteConfirmModal from "../../overlay/modal/DeleteConfirmModal";
import ActionModal from "../../overlay/modal/ActionModal";
import { safeTimeAgo } from "../../../utils/time";
import type { Comment } from "../../../types/community";

interface Props {
  comment: Comment;
  postId: number;
  depth: number;
  onCreateReply: (parentId: number, reply: Comment) => void;
  onDelete: (commentId: number) => void;
  onUpdate: (commentId: number, content: string) => void;
}

export default function CommentItem({
  comment,
  postId,
  depth,
  onCreateReply,
  onDelete,
  onUpdate,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const { openOverlay } = useOverlay();

  const handleUpdate = () => {
    if (!editContent.trim()) return;

    updateComment.mutate(
      { commentId: comment.commentId, content: editContent },
      {
        onSuccess: () => {
          onUpdate(comment.commentId, editContent);
          setIsEditing(false);
        },
      },
    );
  };

  const openDeleteConfirm = () => {
    openOverlay(
      "modal",
      <DeleteConfirmModal
        title="댓글을 삭제할까요?"
        description="삭제한 댓글은 복구할 수 없습니다."
        onConfirm={() =>
          new Promise<void>((resolve) => {
            deleteComment.mutate(
              { commentId: comment.commentId },
              {
                onSuccess: () => {
                  onDelete(comment.commentId);
                  resolve();
                },
              },
            );
          })
        }
      />,
    );
  };

  const openActions = () => {
    openOverlay(
      "modal",
      <ActionModal onEdit={() => setIsEditing(true)} onDelete={openDeleteConfirm} />,
    );
  };

  return (
    <div className={depth === 0 ? "border-b border-gray-100 py-2.5" : "py-2.5"}>
      {/* ===== header ===== */}
      <div className="group flex items-center gap-2 text-sm">
        <span className={depth === 0 ? "font-medium text-main-pink" : "font-medium text-gray-700"}>
          {comment.writerNickname}
        </span>

        <span className="text-muted-foreground text-xs">· {safeTimeAgo(comment.createdAt)}</span>

        {comment.isMine && (
          <button
            onClick={openActions}
            className="ml-auto rounded p-1 text-gray-400 opacity-0 transition hover:bg-gray-100 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ===== content / edit ===== */}
      {isEditing ? (
        <div className="mt-1 space-y-1">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full rounded-md border px-2 py-1 text-sm"
          />
          <div className="flex gap-2 text-xs">
            <button onClick={handleUpdate} className="font-medium text-main-pink">
              저장
            </button>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground">
              취소
            </button>
          </div>
        </div>
      ) : (
        <div
          className={
            depth === 0 ? "mt-0.5 text-sm text-gray-900" : "text-muted-foreground mt-0.5 text-sm"
          }
        >
          {comment.content}
        </div>
      )}

      {/* ===== reply button ===== */}
      {!isEditing && depth === 0 && (
        <button
          onClick={() => setIsReplying((v) => !v)}
          className="text-muted-foreground/70 hover:text-muted-foreground mt-1.5 text-xs"
        >
          {isReplying ? "답글 취소" : "답글"}
        </button>
      )}

      {/* ===== reply form ===== */}
      {isReplying && depth === 0 && (
        <div className="mt-2 pl-4">
          <CommentForm
            postId={postId}
            parentId={comment.commentId}
            onSuccess={(reply) => {
              onCreateReply(comment.commentId, reply);
              setIsReplying(false);
            }}
          />
        </div>
      )}

      {/* ===== children ===== */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-2.5 space-y-3 border-l border-gray-100 pl-4">
          {comment.children.map((child) => (
            <CommentItem
              key={child.commentId}
              comment={child}
              postId={postId}
              depth={depth + 1}
              onCreateReply={onCreateReply}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
