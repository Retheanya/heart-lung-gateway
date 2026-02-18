import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // About text content
    const aboutText = "INSHLT is the Indian Society for Heart and Lung Transplantation, a professional medical organization dedicated to advancing heart and lung transplant medicine in India.";

    return (
        <section
            id="about"
            ref={sectionRef}
            className="bg-white py-16 lg:py-24 px-4 lg:px-8"
        >
            <div className="container mx-auto">
                {/* Top Section - Badge and Text */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16 items-start">
                    {/* About Us Badge */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-block"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium">
                                About Us
                            </span>
                        </motion.div>
                    </div>

                    {/* Text and Button */}
                    <div className="lg:col-span-9 flex flex-col items-end">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed mb-8 w-full text-left text-black"
                        >
                            {aboutText}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link to="/about">
                                <Button
                                    className="gap-2 rounded-full px-8 py-6 text-base font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    Know More
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {/* Card 1 - Years Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-secondary rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[280px] lg:min-h-[320px]"
                    >
                        <h3 className="text-5xl lg:text-6xl font-bold text-black">10+</h3>
                        <p className="text-black/80 font-medium text-lg">Years of Excellence</p>
                    </motion.div>

                    {/* Card 2 - Success Rate */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-primary rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[280px] lg:min-h-[320px]"
                    >
                        <h3 className="text-5xl lg:text-6xl font-bold text-primary-foreground">95%</h3>
                        <p className="text-primary-foreground/90 font-medium text-lg">Course Completion</p>
                    </motion.div>

                    {/* Card 3 - Image Card with Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative rounded-3xl overflow-hidden min-h-[280px] lg:min-h-[320px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop"
                            alt="Medical professional"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-between p-8 lg:p-10">
                            <h3 className="text-5xl lg:text-6xl font-bold text-white">500+</h3>
                            <div>
                                <p className="text-white font-semibold text-lg mb-2">Certified Professionals</p>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    We take the time to understand your learning goals & create a personalized education plan.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
