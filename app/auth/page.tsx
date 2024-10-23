import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <AuthForm />
    </div>
  );
}