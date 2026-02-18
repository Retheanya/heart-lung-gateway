import Header from "@/components/Header";
import Footer from "@/components/Footer";
import section3 from "@/assets/section3.jpg";
import { motion } from "framer-motion";

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white">
            <Header />

            <main className="flex-grow">
                {/* Main About Section */}
                <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                        {/* Left Column - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative order-2 lg:order-1 h-full"
                        >
                            <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl shadow-black/5">
                                <img
                                    src={section3}
                                    alt="About INSHLT Medical Illustration"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>

                        {/* Right Column - Text */}
                        <div className="flex flex-col justify-center order-1 lg:order-2">
                            <motion.span
                                {...fadeIn}
                                className="text-[18px] lg:text-[22px] text-primary font-extrabold mb-6 uppercase tracking-tight block"
                            >
                                About INSHLT
                            </motion.span>

                            <div className="space-y-7 text-left">
                                <motion.p
                                    {...fadeIn}
                                    transition={{ delay: 0.2 }}
                                    className="text-[15.5px] text-[#1a1a1a] leading-relaxed font-normal"
                                >
                                    INSHLT is the Indian Society for Heart and Lung Transplantation, a professional medical organization dedicated to advancing heart and lung transplant medicine in India.
                                </motion.p>

                                <motion.div
                                    {...fadeIn}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-6 text-[#4a4a4a]"
                                >
                                    <div className="space-y-3">
                                        <h3 className="text-[18px] font-bold text-[#1a1a1a]">Key Activities & Resources</h3>
                                        <p className="text-[15.5px] leading-relaxed">
                                            Annual Conferences: The society hosts major academic events, such as the 6th Annual Conference (INSHLT 2025) in Jaipur (3-5 October 2025) and previous meetings in Ahmedabad (2024).
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <p className="text-[15.5px] leading-relaxed">
                                            <span className="font-bold text-[#1a1a1a]">Indian Heart and Lung Transplant Registry:</span> The society launched a full registry in 2024, modeled after UNOS and ISHLT standards, to consolidate nationwide transplant data.
                                        </p>

                                        <p className="text-[15.5px] leading-relaxed">
                                            <span className="font-bold text-[#1a1a1a]">Clinical Guidelines:</span> They provide specific recommendations for thoracic organ transplants, including specialized protocols for pandemic situations and surgical treatments.
                                        </p>

                                        <p className="text-[15.5px] leading-relaxed">
                                            <span className="font-bold text-[#1a1a1a]">Membership:</span> Life membership is available for specialized medical professionals like cardiologists, pulmonologists, and surgeons.
                                        </p>
                                    </div>
                                </motion.div>


                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
