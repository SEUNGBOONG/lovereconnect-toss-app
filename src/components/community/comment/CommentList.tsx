import CommentItem from "./CommentItem";
import type { Comment } from "../../../types/community";

interface Props {
  postId: number;
  comments: Comment[];
  onCreateReply: (parentId: number, reply: Comment) => void;
  onDelete: (commentId: number) => void;
  onUpdate: (commentId: number, content: string) => void;
}

export default function CommentList({
  postId,
  comments,
  onCreateReply,
  onDelete,
  onUpdate,
}: Props) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
          depth={0}
          onCreateReply={onCreateReply}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
