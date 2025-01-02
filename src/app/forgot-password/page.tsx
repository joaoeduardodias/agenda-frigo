import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="container mx-auto max-w-md p-4 md:mt-16">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Redefinir minha senha
      </h1>
      <ForgotPasswordForm />
    </main>
  );
}
