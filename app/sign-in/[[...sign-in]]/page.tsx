import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Welcome Text */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-quantum text-2xl sm:text-3xl font-bold text-[var(--primary-color)] mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">Sign in to your account</p>
        </div>

        {/* Clerk Sign In */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 text-sm sm:text-base",
                formButtonPrimary: "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white text-sm sm:text-base",
                formFieldInput: "bg-white border-slate-200 text-slate-900 focus:border-[var(--primary-color)] text-sm sm:text-base",
                formFieldLabel: "text-slate-700 font-medium text-sm sm:text-base",
                footerActionLink: "text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 text-sm sm:text-base",
                identityPreviewText: "text-slate-900 text-sm sm:text-base",
                identityPreviewEditButton: "text-[var(--primary-color)] text-sm sm:text-base",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        </div>

        {/* Help Text */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-[var(--primary-color)] hover:underline font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
