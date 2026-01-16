export const errorMessages = {
  name: {
    min: "이름은 2자 이상이어야 합니다.",
  },
  nickname: {
    min: "닉네임은 2자 이상이어야 합니다.",
  },
  email: {
    invalid: "유효한 이메일 주소를 입력해주세요.",
  },
  phoneNumber: {
    invalid: "휴대폰 번호를 정확히 입력해주세요.",
  },
  password: {
    min: "비밀번호는 최소 10자 이상이어야 합니다.",
    rule: "비밀번호는 대소문자, 숫자, 특수문자 중 3가지 이상 조합이어야 합니다.",
    required: "비밀번호를 입력해주세요.",
  },
  passwordConfirm: {
    notMatch: "비밀번호가 일치하지 않습니다.",
  },
  birth: {
    yearRequired: "출생 연도를 입력해주세요.",
    yearFormat: "출생 연도는 4자리 숫자여야 합니다.",

    monthRequired: "출생 월을 입력해주세요.",
    monthFormat: "출생 월은 01~12 형식이어야 합니다.",

    dayRequired: "출생 일을 입력해주세요.",
    dayFormat: "출생 일은 01~31 형식이어야 합니다.",

    invalidDate: "유효한 날짜가 아닙니다.",
  },

  gender: {
    required: "성별을 선택해주세요.",
  },

  mbti: {
    required: "MBTI를 선택해주세요.",
  },
  instagramId: {
    required: "인스타그램 아이디를 입력해주세요.",
    noSpace: "공백은 사용할 수 없습니다.",
    invalid: "영문, 숫자, 마침표(.), 밑줄(_)만 사용할 수 있습니다.",
    edgeDotUnderscore: "아이디는 마침표(.) 또는 밑줄(_)로 시작하거나 끝날 수 없습니다.",
  },
  agreement: {
    required: "필수 동의 항목입니다.",
  },
};
