import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, AtSign, PhoneCall, ChevronDown, Calendar, Check, Loader2, Sparkles } from "lucide-react";
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
    { icon: Mail, label: "Email", value: "support_INHFT@gmail.com" },
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
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { data: coursesData, isLoading: coursesLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
    });

    const coursesList = coursesData?.data?.rows || [];

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
        if (!name || !email || !phone || selectedCourses.length === 0) {
            toast.error("Please fill in all required fields and select a course");
            return;
        }
        setLoading(true);
        try {
            const payload = { fullName: name.trim(), email: email.trim(), phone: phone.trim(), courseId: selectedCourses };
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

                        {/* Main content grid */}
                        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
                            {/* Form card */}
                            <motion.div
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="relative"
                            >
                                <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-border/50 shadow-xl shadow-black/5 p-4 lg:p-4">
                                    <form onSubmit={handleRegister} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-foreground">Full Name *</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter your full name"
                                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/40 border border-transparent focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground/60"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-foreground" id="email">Email Address *</label>
                                                <div className="relative">
                                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter email address"
                                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/40 border border-transparent focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground/60"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground">Phone Number *</label>
                                            <div className="relative">
                                                <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Enter phone number"
                                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/40 border border-transparent focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground/60"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground" id="select-program">Select Program *</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <div className="w-full rounded-xl bg-muted/40 border border-transparent focus-within:border-primary/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 p-4 pl-4 pr-4 cursor-pointer flex flex-wrap gap-2 min-h-[56px] items-center transition-all relative">
                                                        {/* <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" /> */}
                                                        {selectedCourses.length === 0 ? (
                                                            <span className="text-muted-foreground/60 font-medium">Choose from our catalog</span>
                                                        ) : (
                                                            selectedCourses.map((id) => {
                                                                const course = coursesList.find((c: any) => c._id === id);
                                                                return (
                                                                    <Badge
                                                                        key={id}
                                                                        variant="secondary"
                                                                        className="bg-primary/10 text-primary border-primary/20 rounded-lg px-2.5 py-1 text-[10px] font-semibold line-clamp-2 max-w-[180px] break-words whitespace-normal block text-left"
                                                                    >
                                                                        {course?.title || "Selected Course"}
                                                                    </Badge>
                                                                );
                                                            })
                                                        )}
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 rotate-180 pointer-events-none" />
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border border-border/50 shadow-xl bg-white overflow-hidden" align="start">
                                                    <ScrollArea className="h-72">
                                                        <div className="p-2 space-y-0.5">
                                                            {coursesLoading ? (
                                                                <div className="p-8 flex items-center justify-center">
                                                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                                                </div>
                                                            ) : coursesList.length > 0 ? (
                                                                coursesList.map((c: any) => (
                                                                    <div
                                                                        key={c._id}
                                                                        onClick={() => toggleCourse(c._id)}
                                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                                                                    >
                                                                        <Checkbox
                                                                            checked={selectedCourses.includes(c._id)}
                                                                            onCheckedChange={() => toggleCourse(c._id)}
                                                                            className="rounded border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                                        />
                                                                        <div className="flex-1 min-w-0 overflow-hidden">
                                                                            <span className={`text-xs font-semibold block line-clamp-2 break-words whitespace-normal ${selectedCourses.includes(c._id) ? "text-primary" : "text-foreground"}`}>
                                                                                {c.title}
                                                                            </span>
                                                                            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                                                {iconMap[c.category] || "📘"} {c.category || "General"}
                                                                            </span>
                                                                        </div>
                                                                        {selectedCourses.includes(c._id) && <Check className="w-4 h-4 text-primary shrink-0" />}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="p-8 text-center text-sm text-muted-foreground">No active programs available.</div>
                                                            )}
                                                        </div>
                                                    </ScrollArea>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="pt-4 space-y-6">
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                size="lg"
                                                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Processing...
                                                    </span>
                                                ) : (
                                                    "Complete Registration"
                                                )}
                                            </Button>
                                            <p className="text-center text-sm text-muted-foreground">
                                                Already have an account?{" "}
                                                <Link to="/login" className="text-primary font-bold hover:underline">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Right panel - image & schedule */}
                            <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="relative lg:sticky lg:top-32"
                            >
                                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-border/30 group">
                                    <img
                                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop"
                                        alt="Medical professionals in training"
                                        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-lg border border-white/50">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-foreground">In-Person Sessions</h3>
                                                <Calendar className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                    <span className="font-medium text-foreground">Mon–Fri (Clinical)</span>
                                                    <span className="text-muted-foreground font-semibold">10:00 – 18:00</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                    <span className="font-medium text-foreground">Saturday (Workshop)</span>
                                                    <span className="text-muted-foreground font-semibold">10:00 – 12:00</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="font-medium text-foreground">Sunday (Mentorship)</span>
                                                    <span className="text-muted-foreground font-semibold">12:00 – 15:00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Register;
