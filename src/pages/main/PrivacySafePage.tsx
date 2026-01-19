import { ShieldCheck, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";

export default function PrivacySafePage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-md px-4 pb-4 pt-8">
      {/* ================= 타이틀 ================= */}
      <div className="mb-6 flex items-center gap-2">
        <ShieldCheck className="size-6 text-main-pink" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">개인정보 보호 안내</h1>
      </div>

      {/* ================= 핵심 문장 강조 박스 ================= */}
      <section className="border-main-pink/20 bg-main-pink/5 mb-6 rounded-2xl border p-5">
        <p className="text-center text-sm font-semibold text-gray-900">
          서로가 서로를 지목한 경우에만 매칭됩니다
        </p>

        {/* 미니 다이어그램 */}
        <div className="mt-4 flex items-center justify-center gap-4 text-gray-600">
          <div className="flex flex-col items-center text-xs">
            <User className="mb-1 size-6" />나
          </div>

          <Heart className="size-5 text-main-pink" />

          <div className="flex flex-col items-center text-xs">
            <User className="mb-1 size-6" />
            상대방
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
          한쪽만 입력한 상태에서는
          <br />
          <strong>어떤 알림이나 노출도 발생하지 않습니다.</strong>
        </p>
      </section>

      {/* ================= 본문 ================= */}
      <div className="space-y-6 text-gray-700">
        {/* 개인정보 보호 */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">🔒 개인정보는 어떻게 보호되나요?</h2>

          <p className="text-sm leading-relaxed">
            재회 서비스 특성상
            <br />
            <strong>연락처·인스타그램 ID</strong> 등 민감한 정보가 포함될 수 있다는 점을 저희도 잘
            알고 있습니다.
          </p>

          <p className="mt-3 text-sm leading-relaxed">
            그래서 <strong>모든 개인 식별 정보는 암호화(Encoding)</strong>된 상태로 저장됩니다.
          </p>

          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
            <li>DB에는 암호화된 값만 저장됩니다</li>
            <li>
              <strong>운영자도 원문을 확인할 수 없습니다</strong>
            </li>
            <li>실제 매칭이 성사되기 전까지는 외부로 노출되지 않습니다</li>
          </ul>

          <p className="mt-4 text-sm font-medium text-gray-900">
            👉 운영자도 내용을 알 수 없는 구조로 설계되어 있습니다.
          </p>
        </section>

        {/* 매칭 방식 */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold text-gray-900">🔁 재회 매칭은 어떻게 이루어지나요?</h2>

          <ol className="space-y-4 text-sm">
            <li>
              <strong>1️⃣ 정보 입력</strong>
              <ul className="mt-1 list-disc pl-5">
                <li>상대방 인스타그램 아이디</li>
                <li>상대방 전화번호</li>
                <li>상대방 이름</li>
              </ul>
              <p className="mt-1 text-gray-600">
                상대방을 특정하기 위한 최소한의 기준으로만 사용됩니다.
              </p>
            </li>

            <li>
              <strong>2️⃣ 상호 지목 확인</strong>
              <p className="mt-1 leading-relaxed text-gray-600">
                입력된 정보는 암호화된 상태로 저장되며,
                <br />
                <strong>서로를 동시에 지목한 경우에만</strong> 매칭이 성사됩니다.
              </p>
            </li>

            <li>
              <strong>3️⃣ 매칭 성사</strong>
              <p className="mt-1 leading-relaxed text-gray-600">
                서로의 선택이 확인되기 전까지는
                <br />
                <strong>누가 누구를 등록했는지 그 누구도 알 수 없습니다.</strong>
              </p>
            </li>
          </ol>
        </section>

        {/* 주의사항 */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">⚠️ 꼭 확인해주세요</h2>

          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>
              인스타그램 아이디 / 전화번호는
              <strong> 오타 없이 정확히 입력</strong>해주세요
            </li>
            <li>정보가 다를 경우 매칭이 되지 않습니다</li>
          </ul>
        </section>

        {/* 요약 */}
        <section className="bg-main-pink/5 rounded-xl p-5 text-sm">
          <p className="font-semibold text-gray-900">✨ 정리하면</p>

          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>상대방 정보를 입력하고 기다리면</li>
            <li>
              상대방도 <strong>나를 지목했을 때만</strong>
            </li>
            <li>자동으로 매칭이 이루어지며</li>
            <li>
              <strong>어느 누구도 내용을 볼 수 없습니다</strong>
            </li>
          </ul>

          <p className="mt-3 font-medium leading-relaxed text-gray-900">
            이 서비스는
            <strong> ‘서로의 선택이 확인된 경우에만’ </strong>
            연결되는 구조로,
            <br />
            <strong>익명성과 안전을 최우선</strong>으로 설계되었습니다.
          </p>
        </section>
      </div>

      {/* ================= CTA (바로 아래 붙음) ================= */}
      <div>
        <div className="bg-main-pink/5 rounded-xl px-5 py-5 text-sm">
          <p className="font-semibold text-gray-900">이 서비스는 어떻게 매칭되나요?</p>

          <p className="mb-6 mt-2 leading-relaxed text-gray-700">
            재회 매칭이 어떤 흐름으로 이루어지는지,
            <br />
            언제 알림이 전송되는지 궁금하다면
          </p>

          <Button
            color="primary"
            variant="fill"
            size="large"
            display="block"
            onClick={() => navigate("/service-guide")}
          >
            서비스 안내 보러가기 →
          </Button>
        </div>
      </div>
    </main>
  );
}
