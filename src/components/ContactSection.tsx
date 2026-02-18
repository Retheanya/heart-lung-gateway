import { motion } from "framer-motion";
import { Mail, Phone, User, ExternalLink } from "lucide-react";

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
        phone: "9825575933",
    },
    {
        name: "Dr Ravi Kumar",
        phone: "9840955600",
    },
];

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                            Get In Touch
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-6 tracking-tight"
                    >
                        Contact Information
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg font-medium"
                    >
                        Reach out to our specialists or our support team for any queries regarding heart and lung transplantation.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Primary Support Card */}
                    <div className="lg:col-span-12 mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#fcfcfc] border border-gray-100 rounded-[2rem] p-8 lg:p-12 text-center shadow-sm"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">General Support</h3>
                            <a
                                href="mailto:support_INHFT@gmail.com"
                                className="text-2xl lg:text-3xl font-extrabold text-primary hover:opacity-80 transition-opacity underline decoration-2 underline-offset-8"
                            >
                                support_INHFT@gmail.com
                            </a>
                        </motion.div>
                    </div>

                    {/* Specialist Contact Grid */}
                    <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
                        {contactPersons.map((person, index) => (
                            <motion.div
                                key={person.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#1a1a1a] group-hover:bg-primary group-hover:text-white transition-colors">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-lg font-bold text-[#1a1a1a]">{person.name}</h4>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-500 font-medium hover:text-primary transition-colors cursor-pointer group/item">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover/item:bg-primary/10">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <a href={`tel:${person.phone}`} className="text-[15px]">{person.phone}</a>
                                    </div>

                                    {person.email && (
                                        <div className="flex items-center gap-3 text-gray-500 font-medium hover:text-primary transition-colors cursor-pointer group/item">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover/item:bg-primary/10">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <a href={`mailto:${person.email}`} className="text-[15px] break-all">{person.email}</a>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-50">
                                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-primary transition-colors">
                                        Contact details <ExternalLink size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
