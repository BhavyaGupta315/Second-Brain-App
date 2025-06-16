import SignupForm from "@/components/SignUp";


export default function SignupPage() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-90 text-center p-4 h-max px-4 text-black">
                    <SignupForm/>
                </div>
            </div>
        </div>
    );
}