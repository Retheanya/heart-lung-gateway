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
        email: "aiimscardiology@gmail.com",
        phone: "9825575933",
    },
    {
        name: "Dr Ravi Kumar",
        email: "aiimscardiology@gmail.com",
        phone: "9840955600",
    },
];

const ContactSection = () => {
    // 1. SECTION ENTRY
    const sectionVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.1,
            } as const,
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 } as const,
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
            className="relative pt-0 pb-12 lg:pb-20 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden"
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
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Mail size={16} />
                                </motion.div>
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

                    {/* 2. General Support Card (col-span-7) */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                        className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group h-full flex flex-col justify-center transition-shadow hover:shadow-2xl hover:shadow-primary/20"
                    >
                        {/* Animated Background Mesh & Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/[0.03] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

                        {/* Floating Blobs */}
                        <motion.div
                            className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none z-0"
                            animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 20, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none z-0"
                            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -30, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />

                        {/* Top-Right Corner Shape */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700 ease-out z-0" />

                        <div className="relative z-10 flex flex-col items-start">
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/30 transition-all duration-300"
                            >
                                <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate max-w-full">General Support</h3>
                            <p className="text-sm text-gray-500 mb-6 font-medium">For general inquiries, membership details and overarching surgical assistance</p>
                            <a
                                href="mailto:aiimscardiology@gmail.com"
                                className="mt-auto px-5 py-3 rounded-xl bg-gray-50 hover:bg-primary hover:text-white text-gray-800 text-sm font-bold transition-all duration-300 inline-flex items-center gap-2 border border-gray-100 hover:border-primary w-fit shadow-sm hover:shadow-lg hover:shadow-primary/25 break-all group/btn"
                            >
                                <Mail className="w-4 h-4 text-primary group-hover/btn:text-white transition-colors" />
                                aiimscardiology@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* 3. Specialist Cards (Sandeep, Dhiren & Ravi) - col-span-4 each */}
                    {contactPersons.map((person, index) => (
                        <motion.div
                            key={person.name}
                            variants={itemVariants}
                            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/20 group h-full flex flex-col justify-between relative overflow-hidden"
                        >
                            {/* Animated Background Mesh & Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/[0.03] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

                            {/* Floating Blobs with unique delays per card */}
                            <motion.div
                                className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none z-0"
                                animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                            />
                            <motion.div
                                className="absolute -bottom-16 -left-16 w-56 h-56 bg-rose-500/10 rounded-full blur-3xl pointer-events-none z-0"
                                animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -20, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: (index * 0.5) + 1 }}
                            />

                            {/* Top-Right Corner Shape */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700 ease-out z-0" />

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/30 transition-all duration-300"
                                    >
                                        <User className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-lg sm:text-lg font-bold text-gray-900 leading-tight mb-1">{person.name}</h4>
                                        <p className="text-xs font-semibold text-primary tracking-wide">Specialist</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 relative z-10 mt-auto">
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
