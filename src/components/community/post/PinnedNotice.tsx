import { Megaphone } from "lucide-react";

export function PinnedNotice() {
  return (
    <div className="border-main-pink/30 bg-main-pink/5 mb-4 rounded-xl border px-4 py-3">
      <div className="flex items-start gap-2">
        <Megaphone className="mt-0.5 h-4 w-4 text-main-pink" />

        <div className="text-sm">
          <p className="font-semibold text-main-pink">커뮤니티 이용 안내</p>

          <ul className="text-muted-foreground mt-1 space-y-1 text-xs leading-relaxed">
            <li>• 욕설, 비방, 혐오 표현은 예고 없이 삭제될 수 있습니다.</li>
            <li>• 개인정보 노출 및 홍보성 게시글은 제한됩니다.</li>
            <li>• 서로 존중하는 대화를 부탁드립니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
