import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Tag, ArrowRight, Loader2, Heart, Activity, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/api/courses";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'https://api.inshltcourse.com';

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    duration?: string;
    _id: string;
    type: 'heart' | 'lung' | 'general';
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
};

const CourseCard = ({ course }: { course: Course }) => {
    const isHeart = course.type === 'heart';
    const accentColor = isHeart ? 'from-rose-50/50 to-white' : 'from-blue-50/50 to-white';
    const borderColor = isHeart ? 'hover:border-rose-200' : 'hover:border-blue-200';
    const glowColor = isHeart ? 'group-hover:shadow-rose-500/15' : 'group-hover:shadow-blue-500/15';
    const Icon = isHeart ? Heart : Activity;

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className={`group relative bg-white rounded-[2rem] border border-gray-100/80 shadow-sm transition-all duration-500 hover:shadow-2xl ${glowColor} ${borderColor} overflow-hidden flex flex-col h-full`}
        >
            {/* Context-aware background wash */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            {/* Course Image & Overlay Banners */}
            <div className="relative overflow-hidden h-48 shrink-0">
                <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    onError={(e: any) => {
                        e.target.src = "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?w=1200&h=800&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Visual Anchor Badge - High Visibility */}
                <div className={`absolute top-4 left-4 p-2.5 rounded-2xl bg-white shadow-xl border border-gray-100/50 z-20`}>
                    <Icon
                        size={20}
                        className={`transition-colors ${isHeart ? 'text-rose-500' : 'text-primary'}`}
                        strokeWidth={2.5}
                    />
                </div>

                {/* Status Indicator */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[8px] font-black text-gray-900 uppercase tracking-tighter">Live</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1 relative z-10">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2.5">
                        <Sparkles size={12} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-semibold tracking-wide text-primary">
                            Academic Track
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3rem]">
                        {course.title}
                    </h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {course.description}
                    </p>
                </div>

                {/* Key Metadata Grid */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-50 mb-5">
                    <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold">{course.duration || '6 Months'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <Tag size={12} />
                        <span className="text-[10px] font-bold">{course.category}</span>
                    </div>
                </div>

                {/* Primary Action */}
                <Link
                    to="/courses"
                    className="group/btn relative overflow-hidden w-full py-2.5 rounded-xl bg-gray-900 text-white text-[10px] font-black transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2"
                >
                    <span className="relative z-10">Access Curriculum</span>
                    <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

const CoursesSection = () => {
    const { data: apiResponse, isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: getCourses
    });

    const allRowsArr = apiResponse?.data?.rows || apiResponse?.rows || apiResponse?.data || (Array.isArray(apiResponse) ? apiResponse : []);
    const allRows = Array.isArray(allRowsArr) ? allRowsArr : [];

    const courses: Course[] = allRows.map((row: any) => {
        let imageUrl = row.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${IMAGE_BASE_URL}${imageUrl}`;
        }
        if (!imageUrl) {
            imageUrl = "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?w=1200&h=800&fit=crop";
        }

        const title = row.title || "Untitled Course";
        let type: 'heart' | 'lung' | 'general' = 'general';
        if (title.toLowerCase().includes('heart')) type = 'heart';
        else if (title.toLowerCase().includes('lung') || title.toLowerCase().includes('pulmon')) type = 'lung';

        return {
            _id: row._id,
            id: row.id || row._id,
            title: title,
            description: row.description || "No description available.",
            image: imageUrl,
            category: row.category || "Specialization",
            duration: row.duration,
            type: type
        };
    });

    if (isLoading) {
        return (
            <div className="bg-white py-32 flex flex-col items-center justify-center min-h-[500px] gap-6">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse rounded-full" />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Syncing Repository</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white py-24 flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-6 border border-rose-100">
                    <Activity className="text-rose-500 w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Systems diagnostic failed</h3>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <section id="courses" className="bg-white pt-4 lg:pt-6 pb-12 lg:pb-16 relative overflow-hidden">
            {/* Modern Aesthetic Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

            {/* Animated Blobs for depth */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="container mx-auto px-4 lg:px-8 relative z-10"
            >
                {/* Refined Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-10">
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider bg-primary/5 mb-6 hover:bg-primary/10 transition-colors cursor-default">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <BookOpen size={16} />
                        </motion.div>
                        Featured Courses
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight mb-6">
                        Expert Education for <span className="text-primary">Cardiac</span> Care
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-gray-500 text-base font-medium max-w-2xl mx-auto">
                        Pioneering the future of organ transplantation through world-class clinical training.
                    </motion.p>
                </div>

                {/* Dynamics Grid with Flex Centering */}
                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                    <AnimatePresence mode="popLayout">
                        {courses.map((course) => (
                            <motion.div
                                key={course._id}
                                layout
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-[400px]"
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Fallback Connectivity View */}
                {error && courses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50/50 rounded-[4rem] border border-dashed border-gray-100 max-w-md mx-auto"
                    >
                        <Activity className="w-12 h-12 text-rose-300 mx-auto mb-6 animate-pulse" />
                        <h4 className="text-gray-900 font-bold mb-2">Diagnostic Interruption</h4>
                        <p className="text-gray-400 text-xs font-medium mb-6">Unable to synchronize with medical archives.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            Retry Handshake
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default CoursesSection;
