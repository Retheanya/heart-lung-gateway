import { Mail, Phone, MapPin, Clock, ChevronRight, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    const contactPersons = [
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
        }
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About INSHLT", href: "/about" },
        { name: "Courses", href: "/courses" },
        { name: "Contact", href: "/#contact" }
    ];

    return (
        <footer className="bg-[#0f1115] text-white pt-24 pb-12 font-inter">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-6 rounded-2xl inline-block shadow-xl shadow-black/20">
                            <img src={logo} alt="INSHLT Logo" className="h-14 w-auto object-contain" />
                        </div>
                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm font-medium">
                            The Indian Society for Heart and Lung Transplantation is dedicated to advancing thoracic organ transplantation through education, research, and clinical excellence.
                        </p>

                    </div>

                    {/* Specialist Contacts */}
                    <div className="lg:col-span-3 space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Specialist Contact</h3>
                        <div className="space-y-6">
                            {contactPersons.map((p, i) => (
                                <div key={i} className="group cursor-default">
                                    <h4 className="font-bold text-[16px] mb-2 group-hover:text-primary transition-colors">{p.name}</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors text-sm font-medium">
                                            <Mail size={14} className="text-primary" />
                                            {p.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors text-sm font-medium">
                                            <Phone size={14} className="text-primary" />
                                            {p.phone}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Explore</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    {link.href.includes("#") ? (
                                        <a href={link.href} className="text-white/50 hover:text-white font-medium flex items-center gap-2 transition-all group">
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform opacity-30" />
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link to={link.href} className="text-white/50 hover:text-white font-medium flex items-center gap-2 transition-all group">
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform opacity-30" />
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Operational Details */}
                    <div className="lg:col-span-3 space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Office Info</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <Clock size={16} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-white/90">Open Hours</p>
                                    <p className="text-white/40 text-[13px] font-medium mt-1">Mon - Fri: 11.00 am - 4.00 pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin size={16} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-white/90">Location</p>
                                    <p className="text-white/40 text-[13px] font-medium mt-1">New Delhi, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <Mail size={16} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-white/90">Support</p>
                                    <p className="text-white/40 text-[13px] font-medium mt-1 break-all">aiimscardiology@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider - Commented Out
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                */}

                {/* Bottom Bar - Commented Out
                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[13px] text-white/30 font-medium text-center md:text-left">
                        © 2025 Indian Society for Heart and Lung Transplantation (INSHLT). All Rights Reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {["Terms of Use", "Privacy Policy", "Sitemap"].map(link => (
                            <a key={link} href="#" className="text-[12px] text-white/30 hover:text-primary font-bold transition-colors uppercase tracking-widest">{link}</a>
                        ))}
                    </div>
                </div>
                */}

            </div>
        </footer>
    );
};

export default Footer;
