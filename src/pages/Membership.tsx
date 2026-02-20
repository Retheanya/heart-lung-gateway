import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { UserPlus, CheckCircle2, ShieldCheck, Heart, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Membership = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" } as const,
        },
    };

    const benefits = [
        "Exclusive access to national thoracic transplant clinical guidelines",
        "Voting rights in the society's general assembly and elections",
        "Opportunities to participate in scientific committees and boards",
        "Discounted registration for all INSHLT annual conferences and workshops",
        "Global networking opportunities with ISHLT members and international experts",
        "Subscription to clinical updates and research publications",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white relative overflow-hidden">
            <Header />

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03),transparent_70%)]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.02),transparent_70%)]" />
            </div>

            <main className="flex-grow py-16 lg:py-24 relative z-10">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

                    {/* Header Section */}
                    <div className="max-w-3xl mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest bg-primary/5 mb-6"
                        >
                            <UserPlus size={16} className="animate-pulse" />
                            Society Membership
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight"
                        >
                            Join the Forefront of <span className="text-primary italic">Transplant Medicine</span> in India
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
                        >
                            Membership: Life membership is available for specialized medical professionals like cardiologists, pulmonologists, and surgeons.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Side: Detail & Benefits */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-red-900/5 border border-neutral-100 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <ShieldCheck className="text-primary" />
                                    The Value of Professional Membership
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    The Indian Society for Heart and Lung Transplantation (INSHLT) is more than just an organization; it is a collaborative ecosystem for the best medical minds in the country. Our members are dedicated to establishing high standards of care and advancing research in thoracic organ transplants.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-muted/30 p-4 rounded-2xl">
                                        <Users className="text-primary mb-2" size={20} />
                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wide">Network</h4>
                                        <p className="text-xs text-gray-500 italic">500+ Active Members</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-2xl">
                                        <Heart className="text-primary mb-2" size={20} />
                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wide">Impact</h4>
                                        <p className="text-xs text-gray-500 italic">National Registry Data</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-primary mb-6">Membership Benefits</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 hover:bg-white transition-all duration-300">
                                            <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
                                            <p className="text-sm md:text-base text-gray-600 font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: CTA & Inquiry */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                {/* Decorative circle */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />

                                <h3 className="text-3xl font-bold mb-6 relative z-10">Start Your Professional Journey</h3>
                                <p className="text-white/70 mb-8 leading-relaxed relative z-10">
                                    Apply today to become a life member and contribute to the growth of heart and lung transplantation in India. Our membership committee reviews applications monthly.
                                </p>

                                <div className="space-y-6 relative z-10 mb-8">
                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">01</div>
                                        <div>
                                            <h4 className="font-bold text-sm">Verify Eligibility</h4>
                                            <p className="text-xs text-white/50">MD/MS or equivalent specialization required</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">02</div>
                                        <div>
                                            <h4 className="font-bold text-sm">Submit Credentials</h4>
                                            <p className="text-xs text-white/50">Professional CV and medical registration</p>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/register">
                                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group/btn">
                                        Inquire Membership
                                        <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Link>

                                <p className="mt-6 text-center text-sm text-white/40">
                                    Questions? Email us at <span className="text-white/80 font-semibold">membership@inshlt.org</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Membership;
