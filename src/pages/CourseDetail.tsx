import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    ChevronLeft,
    Clock,
    Calendar,
    ChevronDown,
    ChevronUp,
    Tag,
    Star,
    BookOpen,
    Users,
    HelpCircle,
    ArrowRight,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCourse, getCourses } from "@/api/courses";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
};

const buttonHover = {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" as const }
};

const buttonTap = {
    scale: 0.98,
    y: 0
};

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

    const { data: apiResponse, isLoading } = useQuery({
        queryKey: ["course-detail", id],
        queryFn: async () => {
            try {
                const response = await getCourse(id as string);
                if (response?.data) return response.data;
            } catch (e) {
                console.warn("Direct course fetch failed, falling back to all courses list", e);
            }

            const allRes = await getCourses();
            const allRows = allRes?.data?.rows || allRes?.rows || allRes?.data || (Array.isArray(allRes) ? allRes : []);
            const found = allRows.find((c: any) => c._id === id || c.id === id);
            return found || null;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    const imageBaseUrl = import.meta.env.VITE_IMAGE_URL?.trim() || import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://api.inshltcourse.com';
    const course = apiResponse || {};

    const resolvePath = (path: string | undefined) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `${imageBaseUrl}/${path.replace(/^\//, '')}`;
    };

    const modules = course.modules || [];
    const faqs = course.faqs || [];
    const highlights = course.highlights || [];

    const formattedStartDate = course.startDate
        ? new Date(course.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : "Flexible Arrival";

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="rounded-full h-10 w-10 border-b-2 border-primary"
                    />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Retriving Program Archives...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!course.title) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6"
                    >
                        <ShieldCheck className="w-10 h-10 text-rose-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Program unreachable</h2>
                    <p className="text-gray-500 max-w-md">We couldn't find the course you're looking for. It might have been temporarily de-listed.</p>
                    <motion.button
                        whileHover={buttonHover}
                        whileTap={buttonTap}
                        onClick={() => navigate("/courses")}
                        className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20"
                    >
                        View All Programs
                    </motion.button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex flex-col">
            <Header />

            <main className="container mx-auto px-4 lg:px-8 py-8 md:py-12 flex-grow overflow-hidden">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="flex flex-col gap-6 md:gap-8 w-full max-w-full"
                >

                    {/* Top Navigation / Header */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full flex flex-col md:flex-row md:items-center justify-between bg-white p-4 sm:p-5 md:p-6 rounded-lg md:rounded-[1.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 gap-4 min-w-0"
                    >
                        <div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => navigate(-1)}
                                className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 transition-all shrink-0"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-sm sm:text-base md:text-lg font-black text-gray-900 truncate uppercase tracking-tight">{course.title}</h1>
                                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                    {course.category && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] md:text-[11px] font-black">
                                            <Tag size={12} className="shrink-0" />
                                            {course.category}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1.5 ml-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] md:text-[11px] font-bold text-green-600">
                                            {course.status === 1 ? "Active" : "Open for Admissions"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 md:gap-8 border-t md:border-t-0 pt-4 md:pt-0 shrink-0 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-500 text-[11px] md:text-xs font-bold">
                                <Calendar size={14} className="text-primary/60" />
                                <span>{formattedStartDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-[11px] md:text-xs font-bold">
                                <Clock size={14} className="text-primary/60" />
                                <span>{course.duration || "Self-Paced"}</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 items-start w-full">

                        {/* Main Content */}
                        <div className="flex flex-col gap-6 md:gap-8 w-full min-w-0">

                            {/* Intro Section */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20"
                            >
                                <h2 className="text-sm md:text-lg font-black text-gray-900 mb-4">{course.title}</h2>
                                {course.description && (
                                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed mb-8">{course.description}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                                        <BookOpen size={14} className="text-primary" />
                                        <span className="text-[11px] md:text-xs font-bold text-gray-700">{modules.length} Module{modules.length !== 1 ? 's' : ''} Detailed</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                                        <HelpCircle size={14} className="text-amber-500" />
                                        <span className="text-[11px] md:text-xs font-bold text-gray-700">{faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}</span>
                                    </div>
                                </div>

                                {highlights.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-[12px] md:text-[14px] font-black text-red-600">Program Highlights</h3>
                                        <motion.div
                                            variants={staggerContainer}
                                            className="flex flex-wrap gap-3"
                                        >
                                            {highlights.map((highlight: string, i: number) => (
                                                <motion.div
                                                    key={i}
                                                    variants={fadeInUp}
                                                    whileHover={{ y: -3, scale: 1.05 }}
                                                    className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100/50 hover:bg-emerald-100/30 transition-colors pointer-events-none"
                                                >
                                                    <Star size={14} className="text-emerald-500 shrink-0 fill-emerald-500/20" />
                                                    <span className="text-[11px] md:text-xs font-bold text-emerald-800 tracking-tight">{highlight}</span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>

                            {/* FAQs Section */}
                            {faqs.length > 0 && (
                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                                            <HelpCircle size={20} />
                                        </div>
                                        <h3 className="text-base md:text-xl font-black text-gray-900 tracking-tight">Frequently Asked Questions</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {faqs.map((faq: any, index: number) => (
                                            <motion.div
                                                key={faq._id || index}
                                                variants={fadeInUp}
                                                className="border border-gray-100 rounded-2xl overflow-hidden transition-all bg-gray-50/30"
                                            >
                                                <button
                                                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white transition-all group"
                                                >
                                                    <span className="text-xs md:text-base font-bold text-gray-800 pr-4 group-hover:text-primary transition-colors">{faq.question}</span>
                                                    <motion.div
                                                        animate={{ rotate: expandedFaqIndex === index ? 180 : 0 }}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                                            expandedFaqIndex === index ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"
                                                        )}
                                                    >
                                                        <ChevronDown size={18} />
                                                    </motion.div>
                                                </button>
                                                <AnimatePresence>
                                                    {expandedFaqIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="px-6 pb-6 overflow-hidden"
                                                        >
                                                            <div className="w-full h-px bg-gray-100 mb-4" />
                                                            <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{faq.answer}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">

                            {/* Enrollment Card */}
                            <motion.div
                                variants={slideInRight}
                                className="bg-gray-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10">
                                    <p className="text-[13px] font-black text-primary mb-4">Admissions Open</p>
                                    <h4 className="text-xl font-black mb-6 leading-tight">Secure your place in the next cohort</h4>

                                    <motion.div
                                        whileHover="hover"
                                        whileTap={buttonTap}
                                        initial="initial"
                                    >
                                        <Link
                                            to={`/register?courseid=${course._id}`}
                                            className="w-full relative flex items-center justify-center gap-3 py-5 rounded-2xl bg-primary text-white font-black text-sm transition-all shadow-xl shadow-primary/25 group/btn overflow-hidden border border-primary/20"
                                        >
                                            {/* White Shine Slider */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                                variants={{
                                                    initial: { x: "-100%", skewX: -20 },
                                                    hover: { x: "100%", skewX: -20 }
                                                }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                            />

                                            <motion.span
                                                className="relative z-10 flex items-center gap-3"
                                                variants={{
                                                    hover: { y: -1 }
                                                }}
                                            >
                                                Enroll Now
                                                <motion.div
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    <ArrowRight size={18} />
                                                </motion.div>
                                            </motion.span>
                                        </Link>
                                    </motion.div>

                                    <p className="text-center mt-6 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                                        Official Certification included
                                    </p>
                                </div>
                            </motion.div>

                            {/* Modules List */}
                            <motion.div
                                variants={slideInRight}
                                className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/30"
                            >
                                <div className="mb-8">
                                    <h3 className="text-base md:text-xl font-black text-gray-900 tracking-tight">Course Modules</h3>
                                    <p className="text-[10px] md:text-[11px] font-black text-gray-400 mt-1">
                                        {modules.length} Module{modules.length !== 1 ? 's' : ''} Detailed
                                    </p>
                                </div>

                                <motion.div
                                    variants={staggerContainer}
                                    className="space-y-4"
                                >
                                    {modules.map((module: any, mIndex: number) => (
                                        <motion.div
                                            key={module._id || mIndex}
                                            variants={fadeInUp}
                                            className="space-y-3"
                                        >
                                            <motion.button
                                                whileHover={{ x: 4 }}
                                                onClick={() => setActiveModuleIndex(activeModuleIndex === mIndex ? -1 : mIndex)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border transition-all duration-300 text-left flex items-center gap-4",
                                                    activeModuleIndex === mIndex
                                                        ? "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5"
                                                        : "bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-100"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-all",
                                                    activeModuleIndex === mIndex
                                                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                                                        : "bg-white border border-gray-200 text-gray-400"
                                                )}>
                                                    {(mIndex + 1).toString().padStart(2, '0')}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={cn(
                                                        "text-sm font-black truncate",
                                                        activeModuleIndex === mIndex ? "text-primary" : "text-gray-700"
                                                    )}>{module.title}</h4>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                                                        {module.subModules?.length || 0} Topics Available
                                                    </p>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: activeModuleIndex === mIndex ? 180 : 0 }}
                                                >
                                                    <ChevronDown
                                                        size={16}
                                                        className={cn("text-gray-400 transition-colors", activeModuleIndex === mIndex && "text-primary")}
                                                    />
                                                </motion.div>
                                            </motion.button>

                                            <AnimatePresence>
                                                {activeModuleIndex === mIndex && module.subModules && module.subModules.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, x: -10 }}
                                                        animate={{ opacity: 1, height: 'auto', x: 0 }}
                                                        exit={{ opacity: 0, height: 0, x: -10 }}
                                                        className="ml-5 space-y-2 border-l-2 border-primary/10 pl-5 py-2 overflow-hidden"
                                                    >
                                                        {module.subModules.map((sub: any, sIndex: number) => (
                                                            <div
                                                                key={sub._id || sIndex}
                                                                className="group p-3.5 rounded-xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all"
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary/20 transition-colors">
                                                                        <span className="text-[9px] font-black text-gray-400 group-hover:text-primary">{sIndex + 1}</span>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h5 className="text-[12px] font-bold text-gray-700 leading-snug group-hover:text-gray-900">{sub.title}</h5>
                                                                        <div className="flex items-center gap-3 mt-2 flex-wrap text-gray-400">
                                                                            {sub.time && (
                                                                                <span className="flex items-center gap-1.5 text-[10px] font-bold">
                                                                                    <Clock size={11} className="text-primary/50" />
                                                                                    {sub.time}
                                                                                </span>
                                                                            )}
                                                                            {sub.leads && sub.leads.length > 0 && (
                                                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary/60">
                                                                                    <Users size={11} className="text-primary/50" />
                                                                                    {sub.leads.map((l: any) => l.lead).join(', ')}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

