import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import signupHero from "@/assets/signupHero.png";


const SignUp = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white font-inter">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto font-inter">
                    {/* Left Column - Form */}
                    <div className="max-w-xl w-full mx-auto lg:ml-0">

                        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] mb-10 tracking-tight leading-[1.1]">
                            Create an account
                        </h1>

                        <form className="space-y-6 lg:space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Full Name</Label>
                                <Input
                                    placeholder="Enter your Full Name"
                                    className="rounded-full border-gray-200 bg-[#f9fafb] px-8 py-7 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Email address</Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="rounded-full border-gray-200 bg-[#f9fafb] px-8 py-7 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-base font-bold text-[#1a1a1a] ml-1">Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="rounded-full border-gray-200 bg-[#f9fafb] px-8 py-7 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <Button className="w-full bg-[#FF0000] hover:bg-[#cc0000] text-white rounded-full py-8 text-lg font-bold uppercase tracking-widest mt-4 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-black/10">
                                Signup
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-lg font-medium text-gray-500">
                            Already have an account? <Link to="/login" className="text-[#2563eb] hover:underline font-semibold">Login</Link>
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

export default SignUp;
