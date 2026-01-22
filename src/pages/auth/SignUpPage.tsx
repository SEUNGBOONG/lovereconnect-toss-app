import SignUpForm from "../../components/form/SignupForm.tsx";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">회원가입</h1>
      <SignUpForm />
    </div>
  );
}
