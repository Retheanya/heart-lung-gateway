import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Pi, Send } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#111827] pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* NEWSLETTER SECTION */}
                <div className="relative rounded-[2.5rem] overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/newsletter-bg.jpg"
                            alt="Medical Newsletter"
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative py-16 px-10 md:px-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                Subscribe Our Newsletter
                            </h2>
                            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                                Get clinical insights, research highlights, and transplantation education updates delivered straight to your inbox.
                            </p>
                        </div>

                        <div className="relative max-w-md ml-auto w-full">
                            <input
                                type="email"
                                placeholder="thomas@example.com"
                                className="w-full bg-white/10 border-b-2 border-white/50 py-4 px-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors pr-12"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="pt-10 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

                        {/* Legal Links (Replacing Contact Info) */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                            {/* Terms of Use */}
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                                Terms of Use
                            </a>

                            {/* Privacy Policy */}
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                                Privacy Policy
                            </a>

                            {/* Original Contact Info Commented Out
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Email:</p>
                                    <p className="text-gray-400 text-sm">info@inshltindia.org</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Phone:</p>
                                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Location:</p>
                                    <p className="text-gray-400 text-sm">New Delhi, India</p>
                                </div>
                            </div>
                            */}
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {[Instagram, Linkedin, Twitter, Pi].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
