import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import coursesHeroBg from "../assets/modern_courses_bg.png";
import uxiImage from "../assets/uxi.png";
import {
    Play,
    Tag,
    Clock,
    BarChart,
    Award,
    User,
    ArrowUpRight,
    Code,
    Globe,
    Database,
    Cpu,
    Smartphone,
    CheckCircle2,
    FileText,
    Eye,
    ChevronDown
} from "lucide-react";

const CourseDetail = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = ["Overview", "Session", "Faculty", "FAQ", "Query"];

    const skills = [
        { name: "Thoracic Surgery", icon: Award },
        { name: "Immunology", icon: Globe },
        { name: "Organ Preservation", icon: Database },
        { name: "Critical Care", icon: Cpu },
        { name: "Clinical Research", icon: Smartphone },
    ];

    const [openSessions, setOpenSessions] = useState<string[]>(["01"]);

    const toggleSession = (num: string) => {
        setOpenSessions(prev =>
            prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]
        );
    };

    const sessionsData = [
        {
            number: "01",
            title: "Introduction to Heart Transplantation",
            lessons: [
                { name: "Historical Milestones & Future Directions", duration: "45min" },
                { name: "Anatomy & Physiology of cardiac donor selection", duration: "32min" },
                { name: "Ethical considerations in modern transplantation", duration: "25min" },
            ]
        },
        {
            number: "02",
            title: "Advanced Organ Preservation",
            lessons: [
                { name: "Mechanical perfusion technologies", duration: "50min" },
                { name: "Ischemia-reperfusion injury mechanisms", duration: "40min" },
                { name: "Organ transportation logistics and protocols", duration: "35min" },
            ]
        },
        {
            number: "03",
            title: "Surgical Techniques & Rejection",
            lessons: [
                { name: "Complex recipient surgical protocols", duration: "60min" },
                { name: "Immunological monitoring & Rejection types", duration: "55min" },
                { name: "Pharmacology of immunosuppressive therapies", duration: "45min" },
            ]
        }
    ];

    const faqData = [
        {
            question: "What are the clinical prerequisites for this fellowship?",
            answer: "Candidates must have completed a primary residency in Cardiothoracic Surgery or Pulmonology from an accredited institution. A minimum of two years of clinical practice in end-stage organ management is highly recommended for optimal participation."
        },
        {
            question: "Is board certification required before enrollment?",
            answer: "While not strictly required for enrollment, board eligibility or certification in your respective specialty is preferred. International candidates must provide equivalent documentation of their highest surgical or clinical credentials."
        },
        {
            question: "How is the clinical rotation structured during the 4 months?",
            answer: "The fellowship is divided into four intensive modules: Donor Procurement (Weeks 1-4), Surgical Techniques (Weeks 5-8), Immunology & Critical Care (Weeks 9-12), and Clinical Research & Survivorship (Weeks 13-16)."
        },
        {
            question: "Will I receive an INSHLT-compliant certificate upon completion?",
            answer: "Yes, successful candidates who pass the final clinical assessment will receive a Certificate of Clinical Excellence in Heart and Lung Transplantation, designed to meet global standards recognized by transplantation societies."
        },
        {
            question: "Are there travel grants available for international participants?",
            answer: "Limited travel grants are available through our collaborative partner hospitals. Applications for grants must be submitted at least 60 days prior to the start of the fellowship cycle."
        },
        {
            question: "Can I access the digital library after the fellowship ends?",
            answer: "All alumni of the fellowship program maintain lifetime access to the digital surgical video library and the immunological research database to support their ongoing clinical practice."
        }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (idx: number) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                {/* HERO SECTION (Same as Courses Page) */}
                <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={coursesHeroBg}
                            alt="Course Detail Hero"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    </div>

                    {/* Large Background Text */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <h1 className="text-[12vw] font-black text-white/[0.05] tracking-tighter leading-none select-none">
                            DETAILS
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                            Fellowship in <span className="text-[#FFB800]">Heart & Lung</span> <br className="hidden md:block" />
                            Transplantation
                        </h2>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-20 flex flex-col items-center">
                        <div className="w-8 h-12 rounded-full border-2 border-primary/30 flex justify-center p-1.5 backdrop-blur-sm">
                            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
                        </div>
                    </div>
                </section>

                {/* MAIN CONTENT AREA */}
                <section className="bg-white py-12 sm:py-20 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">

                        {/* Tab Navigation */}
                        <div className="flex flex-wrap gap-2 mb-10 bg-gray-50 p-1.5 rounded-2xl w-fit">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

                            {/* LEFT COLUMN: Course Content */}
                            <div className="space-y-12">
                                {activeTab === "Overview" && (
                                    <div className="space-y-12 transition-opacity duration-500">

                                        {/* Video Placeholder */}
                                        <div className="relative aspect-video rounded-[2rem] overflow-hidden group border border-gray-100 shadow-2xl">
                                            <img
                                                src={uxiImage}
                                                alt="Course Preview"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                                                    <Play className="w-8 h-8 text-primary ml-1 fill-current" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Overview Text */}
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-bold text-[#0A291E]">Program Overview</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                The Fellowship in Advanced Heart and Lung Transplantation is a premier clinical program designed for cardiothoracic surgeons and pulmonologists seeking specialized expertise in the management of end-stage organ failure. This curriculum follows the global standards set by the International Society for Heart and Lung Transplantation (INSHLT), offering a deep dive into the latest surgical protocols and immunosuppressive therapies.
                                            </p>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                Participants will gain proficiency in donor selection, ex-vivo organ perfusion, and complex recipient surgery. Beyond the operating room, the program emphasizes the multi-disciplinary approach required for successful long-term outcomes, including immunological monitoring and the management of chronic rejection.
                                            </p>
                                        </div>

                                        {/* What You'll Learn */}
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-bold text-[#0A291E]">What You'll Learn</h3>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    "Advanced surgical techniques for heart and lung transplants.",
                                                    "Pathophysiology of end-stage thoracic organ failure.",
                                                    "Immunological matching and rejection management.",
                                                    "Ethical and legal frameworks in organ donation and procurement.",
                                                    "Comprehensive post-operative patient management and critical care.",
                                                    "Hands-on training in ex-vivo organ perfusion technologies."
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-4">
                                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                                        </div>
                                                        <span className="text-gray-600 text-lg">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Why Take This Course */}
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-bold text-[#0A291E]">Why Enroll in this Program?</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                As the field of transplantation surgery continues to evolve with rapid technological advancements, staying at the forefront of clinical practice is essential. This program bridges the gap between traditional surgical training and the highly specialized requirements of modern transplant medicine, taught by globally recognized experts in cardiothoracic surgery.
                                            </p>
                                        </div>

                                        {/* Conclusion */}
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-bold text-[#0A291E]">Certification</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                Upon successful completion of the four-month intensive fellowship, candidates will be awarded a Certificate of Clinical Excellence in Heart and Lung Transplantation, recognized by leading transplant centers globally.
                                            </p>
                                        </div>

                                    </div>
                                )}

                                {activeTab === "Session" && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {sessionsData.map((session) => (
                                            <div
                                                key={session.number}
                                                className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all"
                                            >
                                                <button
                                                    onClick={() => toggleSession(session.number)}
                                                    className="w-full text-left px-8 py-7 flex items-center justify-between group"
                                                >
                                                    <div className="space-y-2">
                                                        <span className="text-xl font-extrabold text-[#0A291E]">Session {session.number}</span>
                                                        <h4 className="text-gray-500 font-medium">{session.title}</h4>
                                                    </div>
                                                    <div className={`p-2 rounded-full bg-gray-50 transition-transform duration-300 ${openSessions.includes(session.number) ? "rotate-180" : ""}`}>
                                                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                                                    </div>
                                                </button>

                                                {openSessions.includes(session.number) && (
                                                    <div className="px-8 pb-8 space-y-2">
                                                        {session.lessons.map((lesson, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group/item"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:text-primary transition-colors">
                                                                        <FileText className="w-5 h-5" />
                                                                    </div>
                                                                    <span className="text-[#0A291E] font-semibold">{lesson.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-6">
                                                                    <span className="text-sm font-bold text-gray-400">{lesson.duration}</span>
                                                                    <div className="text-gray-300 hover:text-primary cursor-pointer transition-colors">
                                                                        <Eye className="w-5 h-5" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "Faculty" && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                        {/* Instructor Profile Header */}
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className="w-full md:w-64 h-64 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                                                <img
                                                    src="https://i.pravatar.cc/300?u=robert"
                                                    alt="Dr. Robert Chen"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-3xl font-extrabold text-[#0A291E]">Dr. Robert Chen</h3>
                                                    <p className="text-primary font-bold">Senior Transplant Surgeon & Clinical Lead</p>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed text-lg italic">
                                                    "Dedicated to advancing the field of thoracic transplantation through clinical excellence and mentorship of the next generation of surgeons."
                                                </p>
                                                <div className="flex gap-4">
                                                    <div className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-500 border border-gray-100">
                                                        20+ Years Experience
                                                    </div>
                                                    <div className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-500 border border-gray-100">
                                                        500+ Successful Transplants
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Bio */}
                                        <div className="space-y-6">
                                            <h4 className="text-2xl font-bold text-[#0A291E]">About Dr. Robert Chen</h4>
                                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                                <p>
                                                    Dr. Robert Chen is a world-renowned cardiothoracic surgeon specializing in complex heart and lung transplantation. With over two decades of clinical experience at leading transplant centers, he has been at the forefront of developing ex-vivo organ perfusion protocols and improving post-operative survivorship.
                                                </p>
                                                <p>
                                                    He currently serves as the Clinical Lead for the Thoracic Transplant Program and has published over 150 peer-reviewed articles in major medical journals. His passion for education has led him to mentor hundreds of fellows who now lead transplant programs globally.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Teaching Style */}
                                        <div className="space-y-6 bg-[#FAF9F6] p-8 sm:p-10 rounded-[2.5rem] border border-gray-100">
                                            <h4 className="text-2xl font-bold text-[#0A291E]">Teaching Style</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {[
                                                    { title: "Case-Based Learning", desc: "Focusing on real-world clinical scenarios and surgical complications." },
                                                    { title: "Direct Mentorship", desc: "One-on-one guidance in surgical techniques and donor selection." },
                                                    { title: "Evidence-Based", desc: "Rooted in the latest clinical research and INSHLT guidelines." },
                                                    { title: "Holistic Approach", desc: "Emphasizing the multi-disciplinary coordination of transplant care." }
                                                ].map((style, idx) => (
                                                    <li key={idx} className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                                            <span className="font-bold text-[#0A291E]">{style.title}</span>
                                                        </div>
                                                        <p className="text-gray-500 text-sm pl-4">{style.desc}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Featured Quote */}
                                        <div className="relative p-10 bg-primary/5 rounded-[2.5rem] overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                                            <div className="relative z-10 space-y-4">
                                                <h4 className="text-xl font-bold text-primary italic">"Dr. Chen's mentorship was pivotal in my journey as a surgeon. His depth of knowledge in organ immunology is unparalleled."</h4>
                                                <p className="text-gray-500 font-bold text-sm">— Dr. Sarah Mitchell, Former Fellow</p>
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {activeTab === "FAQ" && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-extrabold text-[#0A291E]">Frequently Asked Questions</h3>
                                            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                                                Find detailed answers to common questions about the Fellowship in Heart and Lung Transplantation. From clinical rotations to certification and alumni support, we've covered everything you need to know.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {faqData.map((faq, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`border border-gray-100 rounded-[1.5rem] transition-all duration-300 ${openFaq === idx ? "shadow-lg shadow-gray-200/50 border-primary/10" : "hover:border-gray-200"
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => toggleFaq(idx)}
                                                        className="w-full text-left px-8 py-6 flex items-center justify-between group"
                                                    >
                                                        <span className={`text-lg font-bold transition-colors ${openFaq === idx ? "text-[#0A291E]" : "text-gray-600 group-hover:text-[#0A291E]"
                                                            }`}>
                                                            {faq.question}
                                                        </span>
                                                        <div className={`p-1 rounded-full transition-all duration-300 ${openFaq === idx ? "bg-primary/10 rotate-180" : "bg-gray-50"
                                                            }`}>
                                                            <ChevronDown className={`w-5 h-5 transition-colors ${openFaq === idx ? "text-primary" : "text-gray-400"
                                                                }`} />
                                                        </div>
                                                    </button>

                                                    {openFaq === idx && (
                                                        <div className="px-8 pb-7 animate-in fade-in slide-in-from-top-2 duration-300">
                                                            <div className="h-px bg-gray-100 mb-6" />
                                                            <p className="text-gray-500 leading-relaxed text-lg">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Query" && (
                                    <div className="bg-[#FAF9F6] p-10 rounded-[2.5rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="space-y-8">
                                            <h3 className="text-4xl font-extrabold text-[#0A291E]">Have any Queries?</h3>

                                            <form className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-[#0A291E] ml-1">Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your name..."
                                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-[#0A291E] ml-1">Email</label>
                                                        <input
                                                            type="email"
                                                            placeholder="Enter your email..."
                                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-[#0A291E] ml-1">Comment</label>
                                                    <textarea
                                                        rows={5}
                                                        placeholder="Write your comments..."
                                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-gray-300 resize-none"
                                                    ></textarea>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 px-10 py-4 bg-[#FFB800] hover:bg-[#F2AE00] text-[#0A291E] font-extrabold rounded-full transition-all duration-300 shadow-xl shadow-yellow-500/10 group mt-4"
                                                >
                                                    Submit Now
                                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* RIGHT COLUMN: Sticky Sidebar */}
                            <div className="space-y-10 lg:sticky lg:top-32">

                                {/* Course Includes Box */}
                                <div className="bg-[#FAF9F6] rounded-[2.5rem] p-8 sm:p-10 space-y-8 border border-gray-100/50 shadow-xl shadow-gray-200/20">
                                    <h4 className="text-2xl font-bold text-[#0A291E]">Course Includes:</h4>

                                    <div className="space-y-5">
                                        {[
                                            { label: "Price", value: "$499.00", icon: Tag, isPrice: true },
                                            { label: "Category", value: "Cardiothoracic Medicine", icon: Globe },
                                            { label: "Duration", value: "4 Months", icon: Clock },
                                            { label: "Level", value: "Advanced Clinical", icon: BarChart },
                                            { label: "Certification", value: "INSHLT Compliant", icon: Award },
                                            { label: "Instructor", value: "Dr. Robert Chen", icon: User },
                                        ].map((item: any, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200/50 last:border-0">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <item.icon className="w-5 h-5 text-primary/70" />
                                                    <span className="font-semibold text-sm">{item.label}:</span>
                                                </div>
                                                <span className={`text-sm font-bold ${item.isPrice ? "text-[#1E6B4F] text-lg" : "text-[#0A291E]"}`}>
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/20 group">
                                        Enroll Now
                                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </button>
                                </div>

                                {/* Skill Highlights */}
                                <div className="space-y-6">
                                    <h4 className="text-2xl font-bold text-[#0A291E]">Skill Highlights</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.map((skill, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-gray-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-default"
                                            >
                                                <skill.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                                <span className="text-sm font-bold text-gray-600">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CourseDetail;
