import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, AtSign, PhoneCall, ChevronDown, Calendar, Check, Loader2, Sparkles, Lock, Eye, EyeOff } from "lucide-react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import apiClient from "@/lib/axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourses } from "@/api/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const infoCards = [
    { icon: Mail, label: "Email", value: "aiimscardiology@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9650929005" },
    { icon: MapPin, label: "Location", value: "New Delhi, India" },
];

const iconMap: Record<string, string> = {
    Cardiology: "🫀",
    Vascular: "🔬",
    Ortho: "⚙️",
    General: "🏥",
};

const Register = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseIdFromQuery = queryParams.get("courseid") || queryParams.get("courseId");
    const { id: paramId } = useParams();
    const stateId = location.state?.courseId;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { data: coursesData, isLoading: coursesLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
    });

    const coursesList = coursesData?.data || [];

    useEffect(() => {
        const idToSelect = paramId || stateId || courseIdFromQuery;
        if (idToSelect && coursesList.length > 0) {
            if (!selectedCourses.includes(idToSelect)) {
                const exists = coursesList.some((c: any) => c._id === idToSelect);
                if (exists) {
                    setSelectedCourses([idToSelect]);
                } else {
                    toast.warning("The selected course is currently unavailable for registration.");
                }
            }
        }
    }, [paramId, stateId, courseIdFromQuery, coursesList, selectedCourses.length]);

    const toggleCourse = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !phone || !password || selectedCourses.length === 0) {
            toast.error("Please fill in all required fields and select a course");
            return;
        }
        setLoading(true);
        try {
            const payload = { fullName: name.trim(), email: email.trim(), phone: phone.trim(), password, courseId: selectedCourses };
            const response = await apiClient.post("/auth/learner/register", payload);
            const data = response.data;
            const token = data.token || data.data?.token;
            const userData = data.data?.user || data.data;
            if (token) {
                localStorage.setItem("token", token);
                if (userData) localStorage.setItem("user", JSON.stringify(userData));
                toast.success(`Registration Successful! Welcome, ${name}.`);
                navigate("/learners/my-courses");
            } else {
                toast.success("Registration Successful! Please login to continue.");
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (error: any) {
            const status = error.response?.status;
            const data = error.response?.data;
            let errorMsg = "Registration failed. Please try again.";
            if (status === 409) errorMsg = "Conflict: This email is already registered.";
            else if (status === 404) errorMsg = data?.message || "One or more selected courses are inactive or not found.";
            else if (data?.message) errorMsg = data.message;
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-primary/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.06)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60 pointer-events-none" />
            <Header />

            <main className="flex-grow relative">
                <section className="py-4 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                        {/* Hero header */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
                        >
                            {/* <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
                            >
                                <Sparkles className="w-4 h-4" />
                                Join the Elite
                            </motion.span> */}
                            <h1 className="text-2xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-4">
                                Register for Transplantation
                                <span className="block text-primary mt-1">Courses</span>
                            </h1>
                            {/* <p className="text-muted-foreground text-lg font-medium">
                                Take the next step in your medical career with our expert-led programs.
                            </p> */}
                        </motion.div>

                        {/* Contact cards */}
                        {/* <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="flex flex-wrap justify-center gap-4 mb-12 lg:mb-16"
                            >
                                {infoCards.map(({ icon: Icon, label, value }) => (
                                    <a
                                        key={label}
                                        href={label === "Email" ? `mailto:${value}` : label === "Phone" ? `tel:${value.replace(/\s/g, "")}` : "#"}
                                        className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/60 px-5 py-3.5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold tracking-widest text-primary/80 uppercase">{label}</p>
                                            <p className="text-sm font-semibold text-foreground">{value}</p>
                                        </div>
                                    </a>
                                ))}
                            </motion.div> */}

                        {/* Main content area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="max-w-4xl mx-auto w-full"
                        >
                            <div className="rounded-[2.5rem] bg-white shadow-2xl shadow-black/5 border border-border/50 overflow-hidden relative">
                                <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

                                <div className="p-2 lg:p-4 min-h-[900px] flex flex-col">
                                    <div className="p-6 text-center border-b border-border/10 mb-2">
                                        <p className="text-sm font-bold text-primary mb-1">Official Registration</p>
                                        <h2 className="text-xl font-bold text-foreground">Complete the form below to apply</h2>
                                    </div>

                                    <iframe
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSfKu6iyvjk0iqNbmB_FLmhXOI9CHYFKH_PlkM_ziHNq4iyZOA/viewform?embedded=true"
                                        className="w-full flex-grow min-h-[850px] border-0"
                                        title="Official Registration Form"
                                    >
                                        Loading form…
                                    </iframe>

                                    <div className="p-6 bg-slate-50 border-t border-border/10">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                Secure registration powered by Google
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Already have a portal account? <Link to="/login" className="text-primary hover:underline font-bold">Sign In</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center mt-8 text-sm text-muted-foreground font-medium">
                                Technical issues? Contact us at <a href="mailto:aiimscardiology@gmail.com" className="text-primary hover:underline">aiimscardiology@gmail.com</a>
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Register;
