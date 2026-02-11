import { Plus, Minus, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Who can enroll in INSHLT India certification programs?",
            answer: "Our programs are designed for medical professionals, including transplant surgeons, cardiologists, pulmonologists, and clinical coordinators who want to specialize in heart and lung transplantation."
        },
        {
            question: "Are the courses recognized by INSHLT India?",
            answer: "Yes, all our courses are developed and certified by the Indian Society of Heart and Lung Transplantation (INSHLT India), providing recognized credentials for your professional development."
        },
        {
            question: "Do the programs include live clinical sessions?",
            answer: "Absolutely. Most of our advanced certification programs feature live expert sessions, case-based discussions, and clinical insights from leading transplant specialists in India."
        },
        {
            question: "How long does it take to complete a certification?",
            answer: "The duration varies depending on the course. Short workshops may take a few days, while comprehensive certification programs can span 4 to 8 weeks with self-paced learning and live sessions."
        },
        {
            question: "Is there any assessment for certification?",
            answer: "Yes, each course includes periodic assessments and a final clinical evaluation to ensure that learners have mastered the core concepts of transplantation and cardiac care."
        }
    ];

    return (
        <section id="faq" className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-start space-y-6">
                    {/* BADGE */}
                    <span
                        className="inline-flex items-center px-4 py-1 text-sm font-semibold rounded-full"
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
                        FAQ's
                    </span>

                    {/* HEADING */}
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-[52px] leading-[1.1] font-bold text-[#111827] font-display tracking-tight">
                            Frequently Asked<br />Questions
                        </h2>
                        <p className="text-[17px] leading-relaxed text-muted-foreground max-w-md">
                            Everything you need to know about our transplantation certification programs and clinical education.
                        </p>
                    </div>

                    {/* CALL TO ACTION BOX */}
                    <div className="relative w-full max-w-[450px] aspect-[1.5/1] rounded-[2rem] overflow-hidden group mt-8">
                        {/* Background Image */}
                        <img
                            src="/faq-doctor.jpg"
                            alt="Doctor ready to assist"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                        {/* Content Overlay */}
                        <div className="relative h-full p-8 flex flex-col justify-between items-start text-white">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight">Still Have Questions?</h3>
                                <p className="text-white/80 text-sm leading-relaxed max-w-[220px]">
                                    Our team is here to help answer any specific questions about our certification programs.
                                </p>
                            </div>

                            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:gap-5 shadow-lg shadow-primary/20">
                                <ChevronsRight size={18} />
                                <span className="text-sm font-bold">Contact Us Now</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT ACCORDION */}
                <div className="space-y-4 w-full">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${activeIndex === index
                                ? "border-primary/20 shadow-md bg-white shadow-primary/5"
                                : "border-black/5 bg-white hover:border-black/10 shadow-sm"
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-6 py-6 flex items-center gap-6 text-left"
                            >
                                {/* ICON BOX */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${activeIndex === index
                                    ? "bg-primary text-white"
                                    : "bg-primary/5 text-primary"
                                    }`}>
                                    {activeIndex === index ? (
                                        <Minus size={18} strokeWidth={2.5} />
                                    ) : (
                                        <Plus size={18} strokeWidth={2.5} />
                                    )}
                                </div>

                                <span className={`text-[17px] tracking-tight transition-colors duration-300 ${activeIndex === index ? "font-bold text-[#111827]" : "font-semibold text-[#111827]/80 hover:text-[#111827]"
                                    }`}>
                                    {faq.question}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pl-[72px]">
                                            <p className="text-[15px] leading-relaxed text-muted-foreground mr-4">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
