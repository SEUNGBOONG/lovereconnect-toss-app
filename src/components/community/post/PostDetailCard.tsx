import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../../types/community.ts";
import { useOverlay } from "../../../hooks/useOverlay.ts";
import { useDeletePost } from "../../../hooks/usePosts.ts";
import { safeTimeAgo } from "../../../utils/time.ts";
import ActionModal from "../../overlay/modal/ActionModal.tsx";
import DeleteConfirmModal from "../../overlay/modal/DeleteConfirmModal.tsx";

interface Props {
  post: Post;
}

export default function PostDetailCard({ post }: Props) {
  const navigate = useNavigate();
  const { openOverlay } = useOverlay();
  const deletePost = useDeletePost();

  /** 삭제 */
  const confirmDelete = () => {
    openOverlay(
      "modal",
      <DeleteConfirmModal
        title="게시글을 삭제할까요?"
        description="삭제한 게시글은 복구할 수 없습니다."
        onConfirm={async () => {
          await deletePost.mutateAsync(post.id);
          navigate("/posts", { replace: true });
        }}
      />,
    );
  };

  /** 액션 모달 */
  const openActionModal = () => {
    openOverlay(
      "modal",
      <ActionModal onEdit={() => navigate(`/posts/${post.id}/edit`)} onDelete={confirmDelete} />,
    );
  };

  return (
    <article className="space-y-3 rounded-lg border bg-white p-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-main-pink">{post.writerNickname}</span>

        <span className="text-muted-foreground text-xs">· {safeTimeAgo(post.createdAt)}</span>

        {post.isMine && (
          <button
            onClick={openActionModal}
            className="ml-auto rounded p-1 text-gray-400 hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 제목 */}
      <h1 className="text-lg font-semibold">{post.title}</h1>

      {/* 내용 */}
      <div className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</div>
    </article>
  );
}
