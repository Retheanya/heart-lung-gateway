import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 50, damping: 20 } as const,
        },
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="bg-white pt-16 lg:pt-24 pb-8 lg:pb-12 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
                >
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-start relative z-10">
                        {/* About Us Badge */}
                        <motion.div variants={itemVariants} className="inline-block mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">
                                <Info size={16} className="animate-pulse" />
                                About Us
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-foreground mb-6 max-w-xl text-left"
                        >
                            INSHLT is the Indian Society for Heart and Lung Transplantation
                        </motion.h2>

                        {/* Paragraph */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl text-left"
                        >
                            A professional medical organization dedicated to advancing heart and lung transplant medicine in India. We verify the quality of care and promote scientific research to improve patient outcomes.
                        </motion.p>

                        {/* Button */}
                        <motion.div variants={itemVariants}>
                            <Link to="/about">
                                <PrimaryButton
                                    className="gap-2 px-12"
                                >
                                    Know More
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </PrimaryButton>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Layered Medical Composition */}
                    <div className="mt-12 lg:mt-0 relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg">
                            {/* Main Image with Giggle (Float) Animation */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    opacity: { duration: 0.8 },
                                    scale: { duration: 0.8 },
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -25, scale: 1.02, transition: { duration: 0.4 } }}
                                className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-red-900/10 group bg-white"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
                                    alt="INSHLT Professional Surgery Team"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Soft overlay on hover */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
