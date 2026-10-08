export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-10 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-xl border bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}