import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const courses = [
    {
        id: "01",
        total: "04",
        title: "Advanced Heart Failure Management",
        description: "In-depth clinical insights and management strategies for complex heart failure cases.",
        image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop",
        icon: "🫀",
    },
    {
        id: "02",
        total: "04",
        title: "Transplantation Immunology",
        description: "Understanding the immunological basis of organ rejection and immunosuppressive therapy.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9d39d99c5?w=800&h=600&fit=crop",
        icon: "🔬",
    },
    {
        id: "03",
        total: "04",
        title: "Mechanical Circulatory Support",
        description: "Hands-on training and theoretical knowledge on LVADs and other circulatory assist devices.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
        icon: "⚙️",
    },
    {
        id: "04",
        total: "04",
        title: "Post-Transplant Clinical Care",
        description: "Comprehensive guidance on long-term follow-up and management of transplant recipients.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop",
        icon: "🏥",
    },
];

const CourseCard = ({ course, index, progress, totalCards }: { course: typeof courses[0], index: number, progress: any, totalCards: number }) => {
    // Total timeline is 0 to 1.
    // 0.0 to 0.2: All cards stay still (Initial Stack View)
    // 0.2 to 0.9: Peeling phase
    // 0.9 to 1.0: End hold

    const peelStart = 0.2;
    const peelEnd = 0.9;
    const peelDuration = peelEnd - peelStart;
    const cardSegment = peelDuration / totalCards;

    // Each card's turn to move
    const moveStart = peelStart + (index * cardSegment);
    const moveEnd = peelStart + ((index + 1) * cardSegment);

    // Movement: Alternating right/left
    const direction = index % 2 === 0 ? 1500 : -1500;

    // x position: starts at 0, only moves between moveStart and moveEnd
    const x = useTransform(progress, [moveStart, moveEnd], [0, direction], { clamp: true });
    const opacity = useTransform(progress, [moveStart, moveEnd], [1, 0], { clamp: true });

    // Initial fanned stack look
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
            {/* Main Card Container */}
            <Link
                to="/course-detail"
                className="relative w-full max-w-4xl lg:h-[70vh] rounded-[2.5rem] border-[6px] lg:border-[12px] border-primary/20 overflow-hidden shadow-2xl bg-white block group"
            >
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Top Right Counter Indicator */}
                <div className="absolute top-6 right-8 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full z-10">
                    <p className="text-white font-semibold text-lg">
                        {course.id}<span className="text-white/60 mx-1">/</span>{course.total}
                    </p>
                </div>

                {/* Bottom Left Info Box */}
                <div className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-auto max-w-sm bg-white rounded-3xl p-6 shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                            {course.icon}
                        </div>
                        <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                                {course.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const CoursesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section id="courses" className="bg-hero/30 py-20 lg:py-32">
            <div className="container mx-auto px-4 mb-20">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <span className="bg-white px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium">
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

            {/* Desktop Sticky Container */}
            {/* Height is large enough to allow pinning. Sticky element pins to the viewport. */}
            <div ref={containerRef} className="relative h-[500vh] hidden lg:block overflow-visible">
                <div className="sticky top-[15vh] h-[80vh] flex items-center justify-center overflow-visible">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {courses.map((course, index) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                index={index}
                                progress={scrollYProgress}
                                totalCards={courses.length}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Stack View (No sticky/scroll animation) */}
            <div className="lg:hidden space-y-24 px-4">
                <MobileCourseList />
            </div>
        </section>
    );
};

const MobileCourseList = () => {
    const staticProgress = useMotionValue(0);
    return (
        <>
            {courses.map((course, index) => (
                <div key={course.id} className="relative h-[60vh] md:h-[70vh]">
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
