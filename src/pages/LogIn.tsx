import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import signupHero from "@/assets/signupHero.png";
import { useState } from "react";
import { learnerLogin } from "@/api/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            console.log("%c >>> Learner Login API Call <<< ", "background: #1a1a1a; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;");
            console.log("Endpoint: /api/auth/learner/login");
            console.log("Payload:", { email });

            const data = await learnerLogin({ email: email.trim() });

            console.log("Login Response:", data);

            // Assuming response contains token and user data
            if (data.token) {
                localStorage.setItem("token", data.token);
                if (data.data) {
                    localStorage.setItem("user", JSON.stringify(data.data));
                }

                toast.success(`Welcome back!`);

                // Redirect based on role or to home
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error: any) {
            console.error("%c >>> Login Error details <<< ", "background: #ff0000; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;");
            console.log("Error Response:", error.response?.data);

            const errorMsg = error.response?.data?.message || "Login failed. Email not found or inactive.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white font-inter">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-12 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto font-inter">
                    {/* Left Column - Form */}
                    <div className="max-w-xl w-full mx-auto lg:ml-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight leading-[1.1]">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 mb-8 text-lg font-medium">
                                Please enter your details to access your account.
                            </p>
                        </motion.div>

                        <form className="space-y-4 lg:space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Email address</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="rounded-full border-gray-200 bg-[#f9fafb] px-6 py-5 text-base focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FF0000] hover:bg-[#cc0000] text-white rounded-full py-6 text-lg font-bold mt-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-black/10"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Logging in...</span>
                                    </div>
                                ) : "Login Now"}
                            </Button>
                        </form>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="h-px bg-gray-100 flex-grow" />
                            <span className="px-4 text-sm text-gray-400 font-medium">or continue with</span>
                            <div className="h-px bg-gray-100 flex-grow" />
                        </div>

                        <p className="mt-8 text-center text-base font-medium text-gray-500">
                            Don't have an account? <Link to="/register" className="text-[#2563eb] hover:underline font-bold">Register now</Link>
                        </p>
                    </div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] lg:h-[600px] w-full hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-gray-100 rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                            <img
                                src={signupHero}
                                alt="Professional working on laptop"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};


export default LogIn;
