import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "lovereconnect",
  brand: {
    displayName: "러브리커넥트", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#d5356b", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://static.toss.im/appsintoss/10581/49a324de-330a-418a-b9fe-30398c3ea836.png", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
    bridgeColorMode: "basic",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "pnpm dev",
      build: "pnpm build",
    },
  },
  navigationBar: {
    withBackButton: true,
    withHomeButton: true,
    initialAccessoryButton: {
      id: "customer-center",
      title: "고객센터",
      icon: {
        name: "icon-heart-mono",
      },
    },
  },
  permissions: [],
  outdir: "dist",
});
