import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import signupHero from "@/assets/signupHero.png";
import { useState } from "react";
import { sendOTP, verifyOTP } from "@/api/auth";
import { toast } from "sonner";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"email" | "otp">("email");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const promise = sendOTP(email);

        toast.promise(promise, {
            loading: 'Verifying email...',
            success: () => {
                setStep("otp");
                return 'Verification code sent to your email!';
            },
            error: (err) => err.response?.data?.message || "Email not registered. Please create an account."
        });

        try {
            await promise;
        } catch (error) {
            // Error handled by toast.promise
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit code");
            return;
        }

        setLoading(true);
        const promise = verifyOTP(email, otp);

        toast.promise(promise, {
            loading: 'Authenticating...',
            success: (data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/");
                return `Welcome back, ${data.name}!`;
            },
            error: (err) => err.response?.data?.message || "Invalid or expired code"
        });

        try {
            await promise;
        } catch (error) {
            // Error handled by toast.promise
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white font-inter">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto font-inter">
                    {/* Left Column - Form */}
                    <div className="max-w-xl w-full mx-auto lg:ml-0">

                        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] mb-10 tracking-tight leading-[1.1]">
                            {step === "email" ? "Login" : "Verify OTP"}
                        </h1>

                        <form className="space-y-6 lg:space-y-8" onSubmit={step === "email" ? handleSendOTP : handleVerifyOTP}>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Email address</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className={`rounded-full border-gray-200 bg-[#f9fafb] px-8 py-7 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 ${step === 'otp' ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={step === "otp"}
                                />
                                {step === "otp" && (
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="text-primary text-xs font-bold ml-4 hover:underline"
                                    >
                                        Edit Email
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 relative">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Verification Code</Label>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder={step === 'email' ? "Enter OTP (Click 'Get OTP' first)" : "Type 6-digit code here"}
                                        disabled={step === 'email'}
                                        maxLength={6}
                                        autoFocus={step === 'otp'}
                                        className={`rounded-full border-gray-200 px-8 py-7 text-3xl text-center tracking-[0.5em] font-bold transition-all duration-500
                                            ${step === 'email'
                                                ? 'bg-gray-50/50 opacity-40 cursor-not-allowed placeholder:text-sm placeholder:tracking-normal placeholder:font-normal'
                                                : 'bg-white border-primary shadow-inner-lg animate-in fade-in slide-in-from-top-2'}`}
                                        required
                                    />
                                    {step === 'email' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-[80%] h-px bg-gray-200/50" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-center text-gray-400 font-medium">
                                    {step === 'email'
                                        ? "Code entry will activate after email validation"
                                        : "Please check your inbox for the code"}
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FF0000] hover:bg-[#cc0000] text-white rounded-full py-8 text-lg font-bold uppercase tracking-widest mt-4 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-black/10">
                                {loading ? "Processing..." : (step === "email" ? "Get OTP" : "Verify & Login")}
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-lg font-medium text-gray-500">
                            Don't have an account? <Link to="/register" className="text-[#2563eb] hover:underline font-semibold">Register now</Link>
                        </p>

                    </div>

                    {/* Right Column - Image */}
                    <div className="relative h-[600px] lg:h-[750px] w-full hidden lg:block">
                        <div className="absolute inset-0 bg-gray-100 rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                            <img
                                src={signupHero}
                                alt="Professional working on laptop"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LogIn;
