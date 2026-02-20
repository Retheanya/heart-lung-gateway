import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutsectionGif from "@/assets/aboutsection.gif";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Calendar, Activity, UserCheck, Heart, ArrowRight } from "lucide-react";

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" } as const,
        },
    };

    const cardClass = "bg-gradient-to-br from-white via-white to-red-50/30 hover:to-red-100/40 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-2xl transition-all duration-500 ease-out border border-neutral-100/50 hover:border-primary/10 relative overflow-hidden group";

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white relative overflow-hidden">
            <Header />

            {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Fixed Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06),transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.04),transparent_60%)]" />

                {/* Drifting Blobs */}
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 60, 0],
                        scale: [1, 1.1, 0.9, 1],
                        rotate: [0, 45, -45, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px]"
                />

                <motion.div
                    animate={{
                        x: [0, -60, 40, 0],
                        y: [0, 80, -50, 0],
                        scale: [1, 0.9, 1.2, 1],
                        rotate: [0, -60, 60, 0]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-red-400/[0.03] rounded-full blur-[120px]"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.02),transparent_70%)]"
                />

                {/* Moving Subtle Grid Pattern */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Animated SVG Path - TOP RIGHT */}
                <motion.svg
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 -right-20 w-[600px] h-[600px] text-primary/5 opacity-50"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.3,22.9,71.2,35.1C60.1,47.3,49.2,58.1,36.5,65.5C23.9,72.9,9.5,76.9,-3.9,78.2C-17.3,79.5,-31.7,78.2,-43.8,71.2C-55.9,64.2,-65.7,51.6,-73.4,37.8C-81.1,24,-86.7,9.1,-84.9,-5.3C-83.1,-19.7,-73.9,-33.6,-62.8,-43.5C-51.7,-53.4,-38.7,-59.3,-25.8,-67.2C-12.9,-75.1,-0.1,-85,13.6,-86.7C27.3,-88.4,54.7,-82.3,44.7,-76.4Z" transform="translate(100 100)" />
                </motion.svg>

                {/* Animated SVG Path - BOTTOM LEFT */}
                <motion.svg
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{
                        duration: 70,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-[700px] h-[700px] text-primary/5 opacity-40"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="currentColor" d="M45.1,-77.4C58.9,-70.2,70.8,-58.3,78.4,-44.2C86.1,-30.1,89.5,-13.8,87.6,1.8C85.7,17.4,78.5,32.3,69.1,45.4C59.7,58.5,48.1,69.8,34.4,76.5C20.7,83.1,4.9,85,-10.8,83.2C-26.4,81.4,-41.8,75.9,-54.4,66.8C-67,57.7,-76.8,45,-82.1,30.6C-87.4,16.2,-88.2,0.1,-84.8,-14.8C-81.4,-29.7,-73.7,-43.4,-62.5,-52.9C-51.3,-62.4,-36.5,-67.6,-22.8,-74.8C-9.1,-82,3.5,-91.2,19.6,-92.4C35.7,-93.6,41.4,-84.6,45.1,-77.4Z" transform="translate(100 100)" />
                </motion.svg>
            </div>

            <main className="flex-grow py-12 lg:py-16 relative z-10">
                <section className="container mx-auto px-6 lg:px-8 max-w-7xl">

                    {/* --- HERO TITLE --- */}
                    <div className="space-y-4 mb-10 text-center md:text-left max-w-3xl">
                        <div className="inline-block relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/20 text-primary text-sm font-bold uppercase tracking-[0.2em] bg-primary/5 hover:bg-primary/10 transition-colors cursor-default mb-4 shadow-sm"
                            >
                                <Activity size={18} className="animate-pulse" />
                                About INSHLT
                            </motion.div>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="h-1 bg-gradient-to-r from-primary to-red-400 rounded-full"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                            className="text-base md:text-lg text-gray-600 leading-relaxed font-medium"
                        >
                            Advancing the field of heart and lung transplantation through research, education, and advocacy.
                        </motion.p>
                    </div>

                    {/* --- MAIN CONTENT GRID --- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                        {/* LEFT COLUMN */}
                        <div className="space-y-8">
                            {/* Card 1: WHO WE ARE */}
                            <motion.div variants={itemVariants} className={cardClass}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-red-600 transition-all duration-500 group-hover:w-1.5" />
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 mb-4">
                                    <Stethoscope size={14} />
                                    Who We Are
                                </div>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    INSHLT is the Indian Society for Heart and Lung Transplantation, a professional medical organization dedicated to advancing heart and lung transplant medicine in India.
                                </p>
                            </motion.div>

                            {/* Card 2: ANNUAL CONFERENCES */}
                            <motion.div variants={itemVariants} className={cardClass}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-red-600 transition-all duration-500 group-hover:w-1.5" />
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 mb-4">
                                    <Calendar size={14} />
                                    Annual Conferences
                                </div>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    The society hosts major academic events, such as the 6th Annual Conference (INSHLT 2025) in Jaipur (3-5 October 2025).
                                </p>
                            </motion.div>

                            {/* Card 3: CLINICAL GUIDELINES */}
                            <motion.div variants={itemVariants} className={cardClass}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-red-600 transition-all duration-500 group-hover:w-1.5" />
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 mb-4">
                                    <Activity size={14} />
                                    Clinical Guidelines
                                </div>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    We provide specific recommendations for thoracic organ transplants, including specialized protocols for pandemic situations.
                                </p>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-8">
                            {/* REGISTRY CARD (GIF on Right) */}
                            <motion.div
                                variants={itemVariants}
                                className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-neutral-100/50 hover:border-primary/10 transition-all duration-500 group"
                                whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)" }}
                            >
                                {/* GIF Container */}
                                <div className="h-[220px] md:h-[260px] bg-gradient-to-br from-neutral-50 to-red-50/20 relative overflow-hidden flex items-center justify-center p-4">
                                    <motion.img
                                        src={aboutsectionGif}
                                        alt="Indian Heart and Lung Transplant Registry"
                                        className="w-full h-full object-contain brightness-110 contrast-105"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Registry Content Section */}
                                <div className="bg-gradient-to-br from-white via-white to-red-50/30 p-6 md:p-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 mb-4">
                                        <Heart size={14} />
                                        Heart & Lung Registry
                                    </div>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        The society launched a full registry in 2024, modeled after UNOS and ISHLT standards, to consolidate nationwide transplant data and improve patient outcomes.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 4: MEMBERSHIP (Below GIF) */}
                            <motion.div variants={itemVariants} className={cardClass}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-red-600 transition-all duration-500 group-hover:w-1.5" />
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 mb-4">
                                    <UserCheck size={14} />
                                    Membership Details
                                </div>
                                <div className="space-y-4">
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        Membership: Life membership is available for specialized medical professionals like cardiologists, pulmonologists, and surgeons.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
