import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";
import type { ApiError, ApiResponse } from "../types/api.ts";
import type { Comment } from "../types/community";

//  공통 응답 타입
interface CommentPagedResponse {
  content: Comment[];

  // pagination
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;

  // count
  totalCount: number;
}

/* =========================
 * 댓글 최초 로드 (최신 댓글)
 * page = 0
 * createdAt desc
 * ========================= */

interface UseCommentsFirstLoadParams {
  postId: number;
  size: number;
  enabled?: boolean;
}

export const useCommentsFirstLoad = ({
  postId,
  size,
  enabled = true,
}: UseCommentsFirstLoadParams) => {
  const query = useQuery<ApiResponse<CommentPagedResponse>, ApiError>({
    queryKey: ["comments", postId, 0],

    queryFn: () =>
      apiClient<ApiResponse<CommentPagedResponse>>(
        `${API.COMMUNITY.COMMENTS_PAGED(postId)}?page=0&size=${size}&createdAt,desc`,
        { method: "GET" },
      ),

    enabled,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const data = query.data?.data;

  const comments: Comment[] = data?.content ?? [];

  return {
    isLoading: query.isLoading,
    isError: query.isError,

    comments,

    currentPage: data?.pageNumber ?? 0,
    totalPages: data?.totalPages ?? 0,

    totalCount: data?.totalCount ?? 0,
  };
};

/* =========================
 * 이전 댓글 로드 (prepend)
 * page = currentPage + 1
 * ========================= */

interface UseLoadPrevCommentsParams {
  postId: number;
  page: number;
  size: number;
  enabled?: boolean;
}

export const useLoadPrevComments = ({
  postId,
  page,
  size,
  enabled = true,
}: UseLoadPrevCommentsParams) => {
  return useQuery<ApiResponse<CommentPagedResponse>, ApiError>({
    queryKey: ["comments", postId, page],

    queryFn: () =>
      apiClient<ApiResponse<CommentPagedResponse>>(
        `${API.COMMUNITY.COMMENTS_PAGED(postId)}?page=${page}&size=${size}&createdAt,desc`,
        { method: "GET" },
      ),

    enabled,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

/* =========================
 * 댓글 / 대댓글 작성
 * ========================= */

interface CreateCommentPayload {
  postId: number;
  content: string;
  parentId?: number;
}

export const useCreateComment = () => {
  return useMutation<ApiResponse<Comment>, ApiError, CreateCommentPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<Comment>>(API.COMMUNITY.COMMENTS, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onError: (err) => {
      toast.error("댓글 작성 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};

/* =========================
 * 댓글 / 대댓글 수정
 * PUT /comments/{commentId}
 * ========================= */

interface UpdateCommentPayload {
  commentId: number;
  content: string;
}

export const useUpdateComment = () => {
  return useMutation<ApiResponse<Comment>, ApiError, UpdateCommentPayload>({
    mutationFn: ({ commentId, content }) =>
      apiClient<ApiResponse<Comment>>(`${API.COMMUNITY.COMMENTS}/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ content }),
      }),

    onError: (err) => {
      toast.error("댓글 수정 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },

    onSuccess: () => {
      toast.success("댓글이 수정되었습니다.");
    },
  });
};

/* =========================
 * 댓글 / 대댓글 삭제
 * DELETE /comments/{commentId}
 * ========================= */

interface DeleteCommentPayload {
  commentId: number;
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, DeleteCommentPayload>({
    mutationFn: ({ commentId }) =>
      apiClient<ApiResponse<null>>(`${API.COMMUNITY.COMMENTS}/${commentId}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },

    onError: (err) => {
      toast.error("댓글 삭제 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};
