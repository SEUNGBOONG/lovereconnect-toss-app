import { Button } from "@toss/tds-mobile";
import { useOverlay } from "../../../hooks/useOverlay";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionModal({ onEdit, onDelete }: Props) {
  const { closeOverlay } = useOverlay();

  const handleEdit = () => {
    closeOverlay();
    onEdit?.();
  };

  const handleDelete = () => {
    closeOverlay();
    onDelete?.();
  };

  return (
    <div className="flex w-full flex-col space-y-3">
      {/* 수정 */}
      <Button display="block" variant="fill" color="primary" size="medium" onClick={handleEdit}>
        수정
      </Button>

      {/* 삭제 */}
      <Button display="block" variant="weak" color="danger" size="medium" onClick={handleDelete}>
        삭제
      </Button>

      {/* 취소 */}
      <Button display="block" variant="weak" color="dark" size="medium" onClick={closeOverlay}>
        취소
      </Button>
    </div>
  );
}
