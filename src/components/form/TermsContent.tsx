export const TermsContent = () => {
  return (
    <div className="space-y-6 text-left text-[14px] leading-relaxed text-gray-700">
      <p className="text-gray-600">
        Love ReConnect(이하 “회사”)는 개인정보보호법 등 관련 법령을 준수하며, 회원님의 개인정보를
        안전하게 관리합니다. 본 동의서는 회원가입 및 재회 매칭 서비스 제공을 위해 필요한 최소한의
        개인정보 수집·이용에 대한 안내입니다.
      </p>

      {/* 1 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">1. 수집하는 개인정보 항목</h3>
        <ul className="space-y-1 pl-4 text-gray-600">
          <li>- 이름</li>
          <li>- 이메일 주소</li>
          <li>- 비밀번호(암호화 저장)</li>
          <li>- 전화번호</li>
          <li>- 재회 매칭을 위해 입력한 상대방 정보</li>
          <li>- 서비스 이용 과정에서 생성되는 쿠키(Cookie), 접속 로그</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">2. 개인정보 이용 목적</h3>
        <ul className="space-y-1 pl-4 text-gray-600">
          <li>- 회원가입 및 본인 식별</li>
          <li>- 재회 매칭 서비스 제공 및 결과 안내</li>
          <li>- 매칭 진행 상태 및 알림 전달</li>
          <li>- 서비스 이용 기록 분석 및 품질 개선</li>
          <li>- 부정 이용 방지 및 보안 관리</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">3. 보유 및 이용 기간</h3>
        <ul className="space-y-1 pl-4 text-gray-600">
          <li>- 회원 탈퇴 시까지 보관</li>
          <li>
            - 재회 매칭 정보는{" "}
            <span className="font-medium text-gray-900">매칭 종료 또는 탈퇴 후 30일 이내 파기</span>
          </li>
          <li>- 관계 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관</li>
        </ul>
      </section>

      {/* 4 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">4. 개인정보 파기 절차 및 방법</h3>
        <ul className="space-y-1 pl-4 text-gray-600">
          <li>- 이용 목적 달성 시 지체 없이 파기</li>
          <li>- 전자 파일은 복구 불가능한 방법으로 삭제</li>
          <li>- 종이 문서는 분쇄 또는 소각 처리</li>
        </ul>
      </section>

      {/* 5 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">5. 제3자 제공 및 광고 서비스</h3>
        <p className="pl-4 text-gray-600">
          회사는 회원의 개인정보를 외부에 제공하지 않습니다. 다만 서비스 운영을 위해 카카오
          애드핏(Kakao AdFit) 등 제3자 광고 서비스를 이용할 수 있으며, 이 과정에서 쿠키가 사용될 수
          있습니다.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">6. 회원님의 권리</h3>
        <ul className="space-y-1 pl-4 text-gray-600">
          <li>- 개인정보 열람, 수정, 삭제 요청 가능</li>
          <li>- 회원 탈퇴를 통한 개인정보 처리 중단 요청 가능</li>
          <li>- 요청 시 관련 법령에 따라 지체 없이 처리</li>
        </ul>
      </section>

      {/* 7 */}
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-900">7. 시행일</h3>
        <p className="pl-4 text-gray-600">
          본 개인정보 수집·이용 동의는{" "}
          <span className="font-semibold text-gray-900">2024년 12월 10일</span>
          부터 적용됩니다.
        </p>
      </section>
    </div>
  );
};
