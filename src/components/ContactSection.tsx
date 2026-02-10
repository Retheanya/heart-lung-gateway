import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, AtSign, PhoneCall, ChevronDown, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const infoCards = [
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "support@ishltindia.org",
    },
    {
        icon: <Phone className="w-5 h-5" />,
        label: "Phone",
        value: "+91 123 456 7890",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: "Location",
        value: "New Delhi, India",
    },
];

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Top Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4"
                        >
                            <span className="bg-primary/10 px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider">
                                Get In Touch
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
                        >
                            Ready to start your journey in
                            transplantation medicine?
                        </motion.h2>
                    </div>

                    <div className="flex flex-row gap-4 overflow-x-auto pb-4 lg:pb-0 lg:flex-nowrap scrollbar-hide">
                        {infoCards.map((card, index) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="bg-white border border-border/50 rounded-2xl p-5 shadow-sm min-w-[240px] flex-shrink-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">{card.label}</h4>
                                        <p className="text-foreground text-sm font-semibold whitespace-nowrap">{card.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="h-px w-full bg-border/50 mb-16" />

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary px-1">Name*</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                </div>
                            </div>

                            {/* Email field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary px-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                </div>
                            </div>

                            {/* Phone field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary px-1">Phone*</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    <PhoneCall className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                                </div>
                            </div>

                            {/* Schedule field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary px-1">Schedule*</label>
                                <div className="relative">
                                    <select className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer">
                                        <option>Select Subject</option>
                                        <option>Heart Failure Course</option>
                                        <option>Transplantation Course</option>
                                        <option>General Inquiry</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Message field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary px-1">Message*</label>
                            <div className="relative">
                                <textarea
                                    rows={4}
                                    placeholder="Write Message..."
                                    className="w-full bg-[#fafafa] border-none rounded-2xl p-4 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                />
                                <MessageSquare className="absolute right-4 top-6 w-5 h-5 text-muted-foreground/50" />
                            </div>
                        </div>

                        <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-14 text-base font-bold transition-all hover:scale-105">
                            Contact Now
                        </Button>
                    </motion.div>

                    {/* Right Column - Image & Hours */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* <div className="mb-6 text-muted-foreground leading-relaxed font-medium">
                            If you or a loved one are seeking advanced certification in cardiac and lung transplantation. Contact us today to learn more about our upcoming programs.
                        </div> */}

                        <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop"
                                alt="Medical Consultation"
                                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Opening Hours Overlay Card */}
                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-primary/90 backdrop-blur-md rounded-3xl p-8 text-white"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Office Hours</h3>
                                        <Calendar className="w-6 h-6 text-white/70" />
                                    </div>

                                    <div className="space-y-4 font-medium">
                                        <div className="flex justify-between items-center border-b border-white/20 pb-3">
                                            <span>Monday - Friday</span>
                                            <span>10:00 - 18:00</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/20 pb-3">
                                            <span>Saturday</span>
                                            <span>10:00 - 12:00</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Sunday</span>
                                            <span>12:00 - 15:00</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
