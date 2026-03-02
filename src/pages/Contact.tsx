import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                {/* Page Header */}
                <div className="relative pt-20 pb-20 bg-[#111827] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop"
                            alt="Background"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827]" />
                    </div>

                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                Contact <span className="text-primary">Us</span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                                Have questions about our programs or need assistance? Reach out to our dedicated support team. We're here to help you advance your medical career.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
                            {/* Left Column: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-12"
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                                    <p className="text-gray-500">Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name*</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-gray-900 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address*</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-gray-900 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-gray-900 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Subject*</label>
                                            <select className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-gray-900 transition-all outline-none appearance-none cursor-pointer">
                                                <option>General Inquiry</option>
                                                <option>Course Registration</option>
                                                <option>Technical Support</option>
                                                <option>Partnership</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Message*</label>
                                        <textarea
                                            rows={5}
                                            placeholder="How can we help you?"
                                            className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-gray-900 transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-5 text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20">
                                        Send Message
                                    </button>
                                </form>
                            </motion.div>

                            {/* Right Column: Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12 lg:pt-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Contact Information</h2>
                                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                        Our team is here to support you in every step of your professional development. Reach out through any of these channels.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform hover:rotate-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">Phone</h4>
                                            <p className="text-gray-600">+91 9650929005</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform hover:rotate-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">Email</h4>
                                            <p className="text-gray-600">aiimscardiology@gmail.com</p>
                                            <p className="text-sm text-gray-400 mt-1">Our team will respond within 24 hours.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform hover:rotate-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">Office</h4>
                                            <p className="text-gray-600">New Delhi, India</p>
                                            <p className="text-sm text-gray-400 mt-1">Come say hello at our headquarters.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-bold mb-4">Dedicated Support</h4>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            We offer specialized assistance for organ transplant professionals and medical institutions.
                                        </p>
                                        <a href="tel:+919650929005" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                                            Call Support Now <span className="ml-2">→</span>
                                        </a>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Contact;
