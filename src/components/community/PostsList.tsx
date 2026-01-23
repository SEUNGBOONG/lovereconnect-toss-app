import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@toss/tds-mobile";
import { usePostPaged } from "../../hooks/usePosts";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { PinnedNotice } from "./PinnedNotice";

const PAGE_SIZE = 5;

export default function PostsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);

  const { data, isLoading, isError } = usePostPaged({
    page,
    size: PAGE_SIZE,
  });

  const movePage = (nextPage: number) => {
    navigate(`/posts?page=${nextPage}`);
  };

  const goDetail = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <Skeleton key={i} className="h-[96px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-muted-foreground py-20 text-center text-sm">
        게시글을 불러오지 못했습니다.
      </div>
    );
  }

  const { content, totalPages, number } = data.data;

  if (content.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center text-sm">
        아직 작성된 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PinnedNotice />

      {/* 게시글 리스트 */}
      <ul className="overflow-hidden rounded-2xl border bg-white">
        {content.map((post) => (
          <li
            key={post.id}
            role="button"
            tabIndex={0}
            onClick={() => goDetail(post.id)}
            className="hover:bg-muted/40 group cursor-pointer border-b px-5 py-4 transition last:border-b-0"
          >
            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-main-pink opacity-0 transition group-hover:opacity-100" />

              <div className="flex-1 space-y-1">
                <h2 className="line-clamp-1 text-[15px] font-semibold transition group-hover:text-main-pink">
                  {post.title}
                </h2>

                <p className="text-muted-foreground line-clamp-2 text-sm">{post.content}</p>

                <div className="text-muted-foreground pt-1 text-xs">{post.writerNickname}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => movePage(page - 1)}
        >
          이전
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant={i === number ? "default" : "outline"}
            className={cn(i === number && "bg-main-pink text-white")}
            onClick={() => movePage(i)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages - 1}
          onClick={() => movePage(page + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
