import LoginForm from "../components/form/LoginForm.tsx";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">로그인</h1>
      <LoginForm />
    </div>
  );
}
