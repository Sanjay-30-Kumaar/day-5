import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            Member Admin
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}