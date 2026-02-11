import { Heart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhyChooseUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const cards = [
        {
            title: "Expert Transplantation Faculty",
            description: "Learn from India's leading transplant surgeons and cardiologists with years of hands-on experience in heart and lung transplantation."
        },
        {
            title: "Evidence-Based Curriculum",
            description: "Our courses are designed around the latest INSHLT guidelines and clinical protocols, ensuring you stay at the forefront of medical advancement."
        },
        {
            title: "Interactive Case Discussions",
            description: "Go beyond theory with live case presentations, clinical assessments, and interactive sessions that bridge the gap between knowledge and practice."
        }
    ];

    return (
        <section
            className="py-20 px-6 bg-[#FBF8F4]"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                {/* LEFT IMAGE */}
                <div className="flex justify-start">
                    <img
                        src="/doctor.jpg"
                        alt="Medical Education"
                        className="w-full max-w-[520px] h-[620px] object-cover rounded-[28px]"
                    />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col items-start text-left">

                    {/* BADGE */}
                    <span
                        className="mb-5 inline-flex items-center px-4 py-1 text-sm font-semibold rounded-full"
                        style={{
                            color: "hsl(var(--primary))",
                            background: `
                linear-gradient(#FFFFFF, #FFFFFF) padding-box,
                linear-gradient(
                  90deg,
                  hsl(var(--primary)) 0%,
                  hsl(var(--primary)) 65%,
                  hsla(var(--primary), 0.3) 85%,
                  hsla(var(--primary), 0) 100%
                ) border-box
              `,
                            border: "1px solid transparent",
                        }}
                    >
                        Why Choose INSHLT Learning
                    </span>

                    {/* HEADING */}
                    <h2 className="text-[38px] lg:text-[42px] leading-[1.15] font-bold text-[#111827] mb-4 font-display tracking-tight">
                        Excellence in Heart & Lung
                        <br />
                        Transplantation Education.
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-[16px] leading-[1.7] text-[#0E0F0F] max-w-xl mb-6">
                        We empower medical professionals with the knowledge and skills required to excel in the complex field of organ transplantation.
                    </p>

                    {/* CARDS */}
                    <div className="space-y-3 w-full max-w-xl">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`bg-white rounded-[22px] shadow-sm relative border transition-all duration-300 cursor-pointer overflow-hidden ${activeIndex === index
                                    ? "border-primary/30 shadow-md ring-1 ring-primary/5"
                                    : "border-black/5 hover:border-black/10 hover:shadow-md"
                                    }`}
                            >
                                <div className="p-6 flex items-start gap-4">
                                    {/* HEART ICON */}
                                    <span className="relative inline-flex items-center justify-center text-primary w-5 h-5 shrink-0 mt-1">
                                        <Heart
                                            size={activeIndex === index ? 20 : 18}
                                            className="transition-all duration-300"
                                            fill={activeIndex === index ? "currentColor" : "none"}
                                            fillOpacity={0.1}
                                        />
                                        <span className={`absolute top-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-primary border-2 border-white transition-all duration-300 ${activeIndex === index ? 'scale-125' : 'scale-90'}`} />
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-[17px] tracking-tight transition-all duration-300 ${activeIndex === index
                                            ? "font-bold text-[#111827]"
                                            : "font-semibold text-[#111827]/80"
                                            }`}>
                                            {card.title}
                                        </h4>

                                        <AnimatePresence initial={false}>
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                        marginTop: 8
                                                    }}
                                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <p className="text-[15px] leading-[1.6] text-muted-foreground mr-2">
                                                        {card.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;