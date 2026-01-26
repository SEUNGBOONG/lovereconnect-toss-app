import PostFormClient from "./PostFormClient.tsx";

export default function PostWritePage() {
  return (
    <section className="mx-auto max-w-3xl px-2 py-8">
      <PostFormClient mode="create" />
    </section>
  );
}
