import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.8", "start 0.2"]
    });

    // About text content
    const aboutText = "We are a specialized transplant education center dedicated to advancing knowledge in heart and lung transplantation. From comprehensive certification programs to expert-led workshops, we provide cutting-edge learning experiences for medical professionals worldwide.";

    // Split text into words for animation
    const words = aboutText.split(" ");

    return (
        <section
            ref={sectionRef}
            className="bg-white py-16 lg:py-24 px-4 lg:px-8"
        >
            <div className="container mx-auto">
                {/* Top Section - Badge and Text */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
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

                    {/* Animated Text */}
                    <div className="lg:col-span-9">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl lg:text-2xl font-semibold leading-relaxed"
                        >
                            {words.map((word, wordIndex) => {
                                // Calculate the progress threshold for each word
                                const wordProgress = wordIndex / words.length;

                                return (
                                    <Word
                                        key={wordIndex}
                                        word={word}
                                        progress={scrollYProgress}
                                        threshold={wordProgress}
                                    />
                                );
                            })}
                        </motion.p>
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
                        <h3 className="text-5xl lg:text-6xl font-bold text-foreground">10+</h3>
                        <p className="text-foreground/80 font-medium text-lg">Years of Excellence</p>
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

// Word component with scroll-based color animation
interface WordProps {
    word: string;
    progress: any;
    threshold: number;
}

const Word = ({ word, progress, threshold }: WordProps) => {
    // Transform scroll progress to opacity for this word
    const opacity = useTransform(
        progress,
        [threshold, threshold + 0.02],
        [0.3, 1]
    );

    const color = useTransform(
        progress,
        [threshold, threshold + 0.02],
        ["hsl(var(--muted-foreground))", "hsl(var(--foreground))"]
    );

    return (
        <motion.span
            style={{ opacity, color }}
            className="inline-block mr-[0.3em]"
        >
            {word}
        </motion.span>
    );
};

export default AboutSection;
