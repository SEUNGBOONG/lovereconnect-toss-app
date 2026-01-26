import { Button } from "@toss/tds-mobile";
import { useOverlay } from "../../../hooks/useOverlay";

interface Props {
  title?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteConfirmModal({
  title = "삭제할까요?",
  description = "삭제한 항목은 복구할 수 없습니다.",
  onConfirm,
}: Props) {
  const { closeOverlay } = useOverlay();

  const handleConfirm = async () => {
    await onConfirm();
    closeOverlay();
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* 텍스트 */}
      <div className="text-center">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        <Button display="block" variant="weak" size="medium" onClick={closeOverlay}>
          취소
        </Button>

        <Button
          display="block"
          variant="weak"
          size="medium"
          onClick={handleConfirm}
          className="!text-red-500"
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
