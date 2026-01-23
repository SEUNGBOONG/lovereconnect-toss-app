import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";
import { useMatchInfo } from "../../hooks/useMatch.ts";

export default function WaitingPage() {
  const { data: infoRes, isLoading, isError } = useMatchInfo();
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="mt-10 text-center text-gray-500">정보를 불러오는 중입니다...</p>;
  }

  if (isError || !infoRes || !infoRes.data) {
    return <p className="mt-10 text-center text-red-500">정보를 가져오지 못했습니다.</p>;
  }

  const info = infoRes.data;

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      {/* 상단 애니메이션 영역 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: { duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.2 },
          }}
          className="mb-2 inline-block md:mb-4"
        >
          <HeartHandshake className="size-14 text-main-pink md:size-20" />
        </motion.div>

        <motion.h1
          className="mb-2 text-2xl font-extrabold text-gray-900 md:text-4xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          기다리는 중...
        </motion.h1>

        <motion.p
          className="text-base text-gray-600 md:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          두 분의 마음이 닿으면 알림을 보내드리겠습니다.
        </motion.p>

        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Button
            type="button"
            color="primary"
            variant="fill"
            size="large"
            display="block"
            onClick={() => navigate("/")}
          >
            메인 페이지로 돌아가기
          </Button>
        </motion.div>
      </motion.div>

      {/* 상대방 정보 카드 */}
      <motion.div
        className="mt-12 w-full max-w-md rounded-xl border bg-white p-5 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">상대방 정보</h2>

        <div className="space-y-3 text-gray-700">
          <Row label="이름" value={info.targetName} />
          <Row label="전화번호" value={info.targetPhone} />
          <Row label="인스타그램" value={`@${info.targetInsta || "-"}`} />
          <Row label="재회 의지" value={`${info.requesterDesire} / 100`} />
        </div>

        <div className="mt-6 text-right">
          <Button
            color="primary"
            variant="weak"
            size="medium"
            display="block"
            onClick={() => navigate("/match?mode=edit")}
          >
            정보 수정하기
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);
