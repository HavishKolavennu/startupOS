import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream py-12">
      <SignUp afterSignUpUrl="/portal" />
    </div>
  );
}
