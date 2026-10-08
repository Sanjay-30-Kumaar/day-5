export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 h-80 animate-pulse rounded-xl border bg-white" />
      </div>
    </main>
  );
}