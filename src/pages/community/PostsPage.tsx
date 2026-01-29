import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";
import { Pencil } from "lucide-react";
import PostsList from "../../components/community/post/PostsList.tsx";

export default function PostsPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">📖 마음정리 커뮤니티</h1>
          <p className="text-muted-foreground text-sm">
            감정을 정리하고 자유롭게 이야기를 나눠보세요
          </p>
        </div>

        <Button
          color="primary"
          variant="weak"
          size="small"
          display="inline"
          onClick={() => navigate("/posts/write")}
        >
          <Pencil className="h-4 w-4" />
          글쓰기
        </Button>
      </div>

      <PostsList />
    </main>
  );
}
