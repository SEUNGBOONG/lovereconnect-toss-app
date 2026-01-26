interface Props {
  onClick: () => void;
  loading?: boolean;
}

export default function LoadPrevCommentsButton({ onClick, loading = false }: Props) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="text-muted-foreground text-sm hover:underline disabled:opacity-50"
      >
        {loading ? "불러오는 중..." : "이전 댓글 보기"}
      </button>
    </div>
  );
}
