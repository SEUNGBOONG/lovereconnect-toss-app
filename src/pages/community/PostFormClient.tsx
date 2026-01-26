import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";
import { toast } from "sonner";

import { useCreatePost, useUpdatePost, usePostDetail } from "../../hooks/usePosts";
import { NormalInput } from "../../components/form/NormalInput.tsx";
import { NormalTextarea } from "../../components/form/NormalTextarea.tsx";

interface Props {
  mode: "create" | "edit";
  postId?: number;
}

interface PostFormValues {
  title: string;
  content: string;
}

export default function PostFormClient({ mode, postId }: Props) {
  const navigate = useNavigate();

  const methods = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const { data } = usePostDetail(postId!, mode === "edit");

  useEffect(() => {
    if (mode === "edit" && data) {
      reset({
        title: data.data.title,
        content: data.data.content,
      });
    }
  }, [mode, data, reset]);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const onSubmit = (values: PostFormValues) => {
    if (mode === "create") {
      createPost.mutate(values, {
        onSuccess: (res) => {
          toast.success("게시글이 작성되었습니다.");
          navigate(`/posts/${res.data.id}`, { replace: true });
        },
      });
      return;
    }

    if (mode === "edit" && postId) {
      updatePost.mutate(
        { postId, ...values },
        {
          onSuccess: () => {
            toast.success("게시글이 수정되었습니다.");
            navigate(`/posts/${postId}`, { replace: true });
          },
        },
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white">
        {/* 헤더 */}
        <div className="space-y-1 pb-4">
          <h1 className="text-lg font-semibold">{mode === "create" ? "글쓰기" : "게시글 수정"}</h1>
          <p className="text-muted-foreground text-sm">자유롭게 이야기를 작성해보세요.</p>
        </div>

        {/* 제목 */}
        <NormalInput name="title" label="제목" placeholder="제목을 입력해주세요" />

        {/* 내용 */}
        <NormalTextarea name="content" label="내용" placeholder="내용을 입력해주세요" rows={12} />

        {/* 하단 버튼 */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            color="primary"
            variant="fill"
            size="large"
            display="block"
            className="!bg-main-pink"
          >
            {mode === "create" ? "등록하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
