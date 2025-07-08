import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">Welcome to Linka</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
