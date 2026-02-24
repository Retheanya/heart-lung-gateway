import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, AtSign, PhoneCall, ChevronDown, Calendar, Check, Loader2 } from "lucide-react";
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
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "support_INHFT@gmail.com",
    },
    {
        icon: <Phone className="w-5 h-5" />,
        label: "Phone",
        value: "+91 9650929005",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: "Location",
        value: "New Delhi, India",
    },
];

const iconMap: Record<string, string> = {
    "Cardiology": "🫀",
    "Vascular": "🔬",
    "Ortho": "⚙️",
    "General": "🏥",
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

    // Show all courses to match the catalog
    const coursesList = coursesData?.data?.rows || [];

    useEffect(() => {
        const idToSelect = paramId || stateId || courseIdFromQuery;
        if (idToSelect && coursesList.length > 0) {
            if (!selectedCourses.includes(idToSelect)) {
                const exists = coursesList.some((c: any) => c._id === idToSelect);
                if (exists) {
                    setSelectedCourses([idToSelect]);
                } else {
                    // If the course is inactive, we show a warning instead of a 404 later
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
            const payload = {
                fullName: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                courseId: selectedCourses
            };

            const response = await apiClient.post('/auth/learner/register', payload);

            console.log("%c REGISTRATION SUCCESS ", "background: #22c55e; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;", response.data);
            toast.success(`Registration Successful! Welcome, ${name}.`);

            setTimeout(() => navigate("/login"), 1500);
        } catch (error: any) {
            const status = error.response?.status;
            const data = error.response?.data;

            console.error(`%c REGISTRATION FAILED (Status: ${status}) `, "background: #ef4444; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;");
            console.log("Error details:", data);

            let errorMsg = "Registration failed. Please try again.";

            if (status === 409) {
                errorMsg = "Conflict: This email is already registered.";
            } else if (status === 404) {
                // The backend returns 404 if courses are inactive or not found
                errorMsg = data?.message || "One or more selected courses are either inactive or not found.";
            } else if (data?.message) {
                errorMsg = data.message;
            }

            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <section id="register-page" className="py-20 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                            <div className="max-w-xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-block mb-4"
                                >
                                    <span className="bg-primary/10 px-4 py-1.5 rounded-full text-primary text-sm font-bold tracking-wider">
                                        Join the Elite
                                    </span>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                                >
                                    Register for our upcoming
                                    transplantation courses
                                </motion.h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                {infoCards.map((card, index) => (
                                    <motion.div
                                        key={card.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="bg-white border border-border/50 rounded-2xl p-5 shadow-sm w-full"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                {card.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-[10px] font-bold tracking-widest text-primary mb-0.5">{card.label}</h4>
                                                <p className="text-foreground text-sm font-semibold truncate">{card.value}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px w-full bg-border/50 mb-16" />

                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary px-1">Full Name*</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your full name"
                                                className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                                                required
                                            />
                                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary px-1">Email Address*</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email address"
                                                className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                                                required
                                            />
                                            <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary px-1">Phone Number*</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Phone number"
                                                className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                                                required
                                            />
                                            <PhoneCall className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary px-1">Select Program*</label>
                                        <div className="relative">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <div className="w-full bg-[#fafafa] rounded-2xl p-4 pr-12 text-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all outline-none cursor-pointer flex flex-wrap gap-2 min-h-[56px] items-center">
                                                        {selectedCourses.length === 0 ? (
                                                            <span className="text-muted-foreground/50 font-medium">Choose from our catalog</span>
                                                        ) : (
                                                            selectedCourses.map(id => {
                                                                const course = coursesList.find((c: any) => c._id === id);
                                                                return (
                                                                    <Badge key={id} variant="secondary" className="bg-primary/5 text-primary border-primary/20 rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-inset ring-primary/10">
                                                                        {course?.title || "Selected Course"}
                                                                    </Badge>
                                                                );
                                                            })
                                                        )}
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30 pointer-events-none" />
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border-none shadow-2xl bg-white overflow-hidden" align="start">
                                                    <ScrollArea className="h-72">
                                                        <div className="p-2 space-y-1">
                                                            {coursesLoading ? (
                                                                <div className="p-4 flex items-center justify-center">
                                                                    <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
                                                                </div>
                                                            ) : coursesList.length > 0 ? (
                                                                coursesList.map((c: any) => (
                                                                    <div
                                                                        key={c._id}
                                                                        onClick={() => toggleCourse(c._id)}
                                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                                                                    >
                                                                        <Checkbox
                                                                            checked={selectedCourses.includes(c._id)}
                                                                            onCheckedChange={() => toggleCourse(c._id)}
                                                                            className="rounded-md border-gray-300 data-[state=checked]:bg-[#0A291E] data-[state=checked]:border-[#0A291E]"
                                                                        />
                                                                        <div className="flex flex-col">
                                                                            <span className={`text-sm font-bold transition-colors ${selectedCourses.includes(c._id) ? 'text-[#0A291E]' : 'text-gray-700'}`}>
                                                                                {c.title}
                                                                            </span>
                                                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                                                                {iconMap[c.category] || "📘"} {c.category || "General"}
                                                                            </span>
                                                                        </div>
                                                                        {selectedCourses.includes(c._id) && (
                                                                            <Check className="w-4 h-4 text-[#0A291E] ml-auto" />
                                                                        )}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="p-4 text-center text-sm text-muted-foreground font-medium">
                                                                    No active programs available.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </ScrollArea>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex flex-col items-center pt-4">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            size="lg"
                                            className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-14 text-base font-bold transition-all hover:scale-105 shadow-xl shadow-primary/20"
                                        >
                                            {loading ? "Processing..." : "Complete Registration"}
                                        </Button>
                                        <p className="mt-8 text-center text-lg font-medium text-gray-500">
                                            Already have an account? <Link to="/login" className="text-[#2563eb] hover:underline font-bold">Login</Link>
                                        </p>
                                    </div>
                                </form>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop"
                                        alt="Medical Consultation"
                                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-primary/90 backdrop-blur-md rounded-3xl p-8 text-white"
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold">In-Person Sessions</h3>
                                                <Calendar className="w-6 h-6 text-white/70" />
                                            </div>
                                            <div className="space-y-4 font-medium">
                                                <div className="flex justify-between items-center border-b border-white/20 pb-3 text-sm">
                                                    <span>Mon - Fri (Clinical)</span>
                                                    <span>10:00 - 18:00</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-white/20 pb-3 text-sm">
                                                    <span>Saturday (Workshop)</span>
                                                    <span>10:00 - 12:00</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span>Sunday (Mentorship)</span>
                                                    <span>12:00 - 15:00</span>
                                                </div>
                                            </div>
                                        </motion.div>
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
