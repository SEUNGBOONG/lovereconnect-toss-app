interface Props {
  total: number;
}

export default function CommentHeader({ total }: Props) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold text-gray-900">댓글</h2>
      <span className="text-sm text-gray-500">{total}</span>
    </div>
  );
}
