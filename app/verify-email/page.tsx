import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Mail } from "lucide-react"
import Link from "next/link"
import { verifyEmail } from "@/app/actions/auth-actions"

async function VerificationContent({ token }: { token: string }) {
  if (!token) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <CardTitle className="text-red-600">Invalid Verification Link</CardTitle>
          <CardDescription>The verification link is invalid or has expired.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href="/signup">Sign Up Again</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const result = await verifyEmail(token)

  if (result.success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <CardTitle className="text-green-600">Email Verified!</CardTitle>
          <CardDescription>{result.message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Your account has been successfully verified. You can now log in and start using Linka.
          </p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <CardTitle className="text-red-600">Verification Failed</CardTitle>
        <CardDescription>{result.message}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Please try again or contact support if the problem persists.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/login">Try Login</Link>
          </Button>
          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/signup">Sign Up Again</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Mail className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold">Email Verification</h1>
        </div>

        <Suspense
          fallback={
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Verifying your email...</p>
              </CardContent>
            </Card>
          }
        >
          <VerificationContent token={searchParams.token || ""} />
        </Suspense>
      </div>
    </div>
  )
}
