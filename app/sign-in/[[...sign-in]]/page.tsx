import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream py-12">
      <SignIn afterSignInUrl="/portal" />
    </div>
  );
}
