import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Post } from "../types/community.ts";
import type { ApiError, ApiResponse } from "../types/api.ts";
import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";

/* =========================
 * 게시글 목록 조회
 * ========================= */
interface PostPagedResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const usePostPaged = ({ page, size }: { page: number; size: number }) => {
  return useQuery<ApiResponse<PostPagedResponse>, ApiError>({
    queryKey: ["posts", "paged", page, size],
    queryFn: () =>
      apiClient<ApiResponse<PostPagedResponse>>(
        `${API.COMMUNITY.POSTS_PAGED}?page=${page}&size=${size}&createdAt,desc`,
      ),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: false,
  });
};

/* =========================
 * 게시글 작성
 * ========================= */
export const useCreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Post>, ApiError, { title: string; content: string }>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<Post>>(API.COMMUNITY.POSTS, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "paged"] });
      navigate(`/posts/${res.data.id}`);
    },
    onError: (err) => {
      toast.error("게시글 작성 실패", { description: err.message });
    },
  });
};

/* =========================
 * 게시글 삭제
 * ========================= */
export const useDeletePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, number>({
    mutationFn: (postId) =>
      apiClient<ApiResponse<null>>(`${API.COMMUNITY.POSTS}/${postId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "paged"] });
      navigate("/posts");
    },
  });
};
