import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">LoveReconnect</h1>

      <Button
        type="submit"
        color="primary"
        variant="fill"
        size="large"
        display="block"
        onClick={() => navigate("/login")}
      >
        로그인 하러가기
      </Button>
    </div>
  );
}
