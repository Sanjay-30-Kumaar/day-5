export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-10 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-2 h-5 w-80 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 h-20 animate-pulse rounded-xl border bg-white" />

        <div className="mt-4 h-96 animate-pulse rounded-xl border bg-white" />
      </div>
    </main>
  );
}