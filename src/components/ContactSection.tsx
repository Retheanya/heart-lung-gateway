import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";

interface ContactPerson {
    name: string;
    email?: string;
    phone: string;
}

const contactPersons: ContactPerson[] = [
    {
        name: "Dr Sandeep Seth",
        email: "aiimscardiology@gmail.com",
        phone: "9650929005",
    },
    {
        name: "Dr Dhiren Shah",
        email: "",
        phone: "9825575933",
    },
    {
        name: "Dr Ravi Kumar",
        email: "",
        phone: "9840955600",
    },
];

const ContactSection = () => {
    // 1. SECTION ENTRY
    const sectionVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.12,
                delayChildren: 0.2, // Wait for section to start appearing
            } as const,
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" } as const,
        },
    };

    // 2. DIAGNOSTIC SCAN LINE
    const scanLineVariants = {
        hidden: { left: "-100%", opacity: 0 },
        visible: {
            left: "100%",
            opacity: [0, 1, 1, 0], // Fade in, move, fade out
            transition: {
                duration: 1.5,
                ease: "easeInOut" as const,
                times: [0, 0.1, 0.9, 1],
            },
        },
    };

    // 3. BORDER TRACE EFFECT
    const borderTraceVariants = {
        hidden: { scaleX: 0, scaleY: 0, opacity: 0 },
        visible: (custom: number) => ({
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
                delay: custom * 0.1, // Sequential drawing
            } as const,
        }),
    };

    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="relative pt-4 lg:pt-8 pb-12 lg:pb-20 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden"
        >
            {/* --- Diagnostic Scan Line --- */}
            <motion.div
                variants={scanLineVariants}
                className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-white/80 to-transparent z-0 pointer-events-none"
                style={{ skewX: -20 }}
            />

            {/* --- Border Trace Effects (Subtle 1px border) --- */}
            {/* Top */}
            <motion.div variants={borderTraceVariants} custom={0} className="absolute top-0 left-0 w-full h-[1px] bg-primary/10 origin-left z-0" />
            {/* Right */}
            <motion.div variants={borderTraceVariants} custom={1} className="absolute top-0 right-0 w-[1px] h-full bg-primary/10 origin-top z-0" />
            {/* Bottom */}
            <motion.div variants={borderTraceVariants} custom={2} className="absolute bottom-0 right-0 w-full h-[1px] bg-primary/10 origin-right z-0" />
            {/* Left */}
            <motion.div variants={borderTraceVariants} custom={3} className="absolute bottom-0 left-0 w-[1px] h-full bg-primary/10 origin-bottom z-0" />


            <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
                <div
                    className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-stretch"
                >
                    {/* 1. Header Section */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="space-y-4 mb-8 lg:mb-0">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                <Mail size={14} />
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                                Contact Information
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                Reach out to our specialists or our support team for any queries regarding heart and lung transplantation.
                            </p>
                        </motion.div>
                    </div>

                    {/* 2. Dr Sandeep Seth (Full Width of Right Area -> col-span-7) */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <User className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-lg font-bold text-gray-900 leading-tight mb-1">{contactPersons[0].name}</h4>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">Specialist</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <a
                                href={`tel:${contactPersons[0].phone}`}
                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 text-gray-600 font-medium transition-colors group/item"
                            >
                                <Phone className="w-4 h-4 text-gray-400 group-hover/item:text-primary transition-colors" />
                                <span className="text-sm">{contactPersons[0].phone}</span>
                            </a>

                            {contactPersons[0].email ? (
                                <a
                                    href={`mailto:${contactPersons[0].email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 text-gray-600 font-medium transition-colors group/item"
                                >
                                    <Mail className="w-4 h-4 text-gray-400 group-hover/item:text-primary transition-colors" />
                                    <span className="text-sm break-all">{contactPersons[0].email}</span>
                                </a>
                            ) : (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 text-gray-400">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm opacity-0 select-none">No email</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* 3. General Support Card (col-span-4) */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group h-full flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">General Support</h3>
                            <p className="text-sm text-gray-500 mb-4">For general inquiries and assistance</p>
                            <a
                                href="mailto:support_INHFT@gmail.com"
                                className="text-lg font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 break-all"
                            >
                                support_INHFT@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* 4. Specialist Cards (Dhiren & Ravi) - col-span-4 each */}
                    {contactPersons.slice(1).map((person) => (
                        <motion.div
                            key={person.name}
                            variants={itemVariants}
                            className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col justify-between"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <User className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg sm:text-lg font-bold text-gray-900 leading-tight mb-1">{person.name}</h4>
                                        <p className="text-xs font-semibold text-primary uppercase tracking-wide">Specialist</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`tel:${person.phone}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 text-gray-600 font-medium transition-colors group/item"
                                >
                                    <Phone className="w-4 h-4 text-gray-400 group-hover/item:text-primary transition-colors" />
                                    <span className="text-sm">{person.phone}</span>
                                </a>

                                {person.email ? (
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 text-gray-600 font-medium transition-colors group/item"
                                    >
                                        <Mail className="w-4 h-4 text-gray-400 group-hover/item:text-primary transition-colors" />
                                        <span className="text-sm break-all">{person.email}</span>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 text-gray-400">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm opacity-0 select-none">No email</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ContactSection;
