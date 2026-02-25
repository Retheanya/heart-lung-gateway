import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/api/courses";


const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'https://inshltserver.kasapp.in';

interface Course {
    id: string;
    total: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    _id: string;
}


const CourseCard = ({ course, index, progress, totalCards }: { course: Course, index: number, progress: any, totalCards: number }) => {

    const peelStart = 0.2;
    const peelEnd = 0.9;
    const peelDuration = peelEnd - peelStart;
    const cardSegment = peelDuration / totalCards;

    const moveStart = peelStart + (index * cardSegment);
    const moveEnd = peelStart + ((index + 1) * cardSegment);

    const direction = index % 2 === 0 ? 1500 : -1500;

    const x = useTransform(progress, [moveStart, moveEnd], [0, direction], { clamp: true });
    const opacity = useTransform(progress, [moveStart, moveEnd], [1, 0], { clamp: true });

    const rotations = [0, -4, 4, -8];
    const scales = [1, 0.98, 0.96, 0.94];
    const yOffsets = [0, -15, 15, -30];

    const initialRotate = rotations[index % totalCards];
    const initialScale = scales[index % totalCards];
    const initialY = yOffsets[index % totalCards];

    return (
        <motion.div
            style={{
                x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0,
                y: typeof window !== 'undefined' && window.innerWidth > 768 ? initialY : 0,
                opacity: typeof window !== 'undefined' && window.innerWidth > 768 ? opacity : 1,
                rotate: initialRotate,
                scale: initialScale,
                zIndex: totalCards - index,
            }}
            className="absolute inset-0 flex items-center justify-center p-4 lg:p-0"
        >
            <Link
                to={`/course-detail/${course._id}`}
                className="relative w-full max-w-4xl lg:h-[70vh] rounded-[2.5rem] border-[6px] lg:border-[12px] border-primary/20 overflow-hidden shadow-2xl bg-white block group"
            >
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e: any) => {
                        e.target.src = "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=1200&h=800&fit=crop";
                    }}
                />

                <div className="absolute top-6 right-8 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full z-10">
                    <p className="text-white font-semibold text-base sm:text-lg">
                        {course.id}<span className="text-white/60 mx-1">/</span>{course.total}
                    </p>
                </div>

                <div className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-auto max-w-sm bg-white rounded-3xl p-6 shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-xl lg:text-2xl shrink-0">
                            {course.icon}
                        </div>
                        <div>
                            <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1.5 line-clamp-2">
                                {course.title}
                            </h3>
                            <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed line-clamp-3">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const iconMap: Record<string, string> = {
    "Cardiology": "🫀",
    "Vascular": "🔬",
    "Ortho": "⚙️",
    "General": "🏥",
};

const CoursesSection = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { data: apiResponse, isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: getCourses
    });

    // REVERT: Show ALL courses regardless of status, as requested
    const allRows = apiResponse?.data?.rows || [];

    const courses: Course[] = allRows.map((row: any, index: number) => {
        let imageUrl = row.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${IMAGE_BASE_URL}${imageUrl}`;
        }
        if (!imageUrl) {
            imageUrl = "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=1200&h=800&fit=crop";
        }

        return {
            id: (index + 1).toString().padStart(2, '0'),
            _id: row._id,
            total: allRows.length.toString().padStart(2, '0'),
            title: row.title,
            description: row.description,
            image: imageUrl,
            icon: iconMap[row.category] || "📘",
        };
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse font-medium">Discovering exceptional courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <p className="text-2xl">⚠️</p>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Unable to load courses</h3>
                <p className="text-muted-foreground max-w-sm">
                    We're having trouble connecting to our servers. Please check your connection and try again.
                </p>
            </div>
        );
    }

    return (
        <section id="courses" className="bg-hero/30 pt-20 lg:pt-32 pb-10 lg:pb-16">
            <div className="container mx-auto px-4 mb-20">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">
                            < BookOpen size={16} className="animate-pulse" />
                            Featured Courses
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold text-foreground"
                    >
                        Expert Education for Cardiac Care
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        We are dedicated to providing the most advanced training for medical professionals in heart and lung transplantation.
                    </motion.p>
                </div>
            </div>

            {courses.length > 0 && (
                <>
                    <div ref={containerRef} className="relative h-[500vh] hidden lg:block overflow-visible">
                        <div className="sticky top-[15vh] h-[80vh] flex items-center justify-center overflow-visible">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {courses.map((course, index) => (
                                    <CourseCard
                                        key={course._id}
                                        course={course}
                                        index={index}
                                        progress={scrollYProgress}
                                        totalCards={courses.length}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden space-y-24 px-4">
                        <MobileCourseList courses={courses} />
                    </div>
                </>
            )}

        </section>
    );
};

const MobileCourseList = ({ courses }: { courses: Course[] }) => {
    const staticProgress = useMotionValue(0);

    return (
        <>
            {courses.map((course, index) => (
                <div key={course._id} className="relative h-[60vh] md:h-[70vh]">
                    <CourseCard
                        course={course}
                        index={index}
                        progress={staticProgress}
                        totalCards={courses.length}
                    />
                </div>
            ))}
        </>
    );
};

export default CoursesSection;
