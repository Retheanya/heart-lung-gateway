import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    const { id } = useParams();
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
                <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src={coursesHeroBg} alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    </div>
                    <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                            Fellowship in <span className="text-[#FFB800]">Heart & Lung</span> <br className="hidden md:block" />
                            Transplantation
                        </h2>
                    </div>
                </section>

                <section className="bg-white py-12 sm:py-20 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
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
                            <div className="space-y-12">
                                {activeTab === "Overview" && (
                                    <div className="space-y-12">
                                        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl">
                                            <img src={uxiImage} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                                    <Play className="w-8 h-8 text-primary ml-1 fill-current" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-bold text-[#0A291E]">Program Overview</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                This curriculum follows the global standards set by the International Society for Heart and Lung Transplantation (INSHLT), offering a deep dive into the latest surgical protocols and immunosuppressive therapies.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Session" && (
                                    <div className="space-y-6">
                                        {sessionsData.map((session) => (
                                            <div key={session.number} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                                                <button onClick={() => toggleSession(session.number)} className="w-full text-left px-8 py-7 flex items-center justify-between">
                                                    <div className="space-y-2">
                                                        <span className="text-xl font-extrabold text-[#0A291E]">Session {session.number}</span>
                                                        <h4 className="text-gray-500 font-medium">{session.title}</h4>
                                                    </div>
                                                    <ChevronDown className={`w-6 h-6 transform transition-transform ${openSessions.includes(session.number) ? "rotate-180" : ""}`} />
                                                </button>
                                                {openSessions.includes(session.number) && (
                                                    <div className="px-8 pb-8 space-y-2">
                                                        {session.lessons.map((lesson, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                                                <div className="flex items-center gap-4">
                                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                                    <span className="text-[#0A291E] font-semibold">{lesson.name}</span>
                                                                </div>
                                                                <span className="text-sm font-bold text-gray-400">{lesson.duration}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === "FAQ" && (
                                    <div className="space-y-4">
                                        {faqData.map((faq, idx) => (
                                            <div key={idx} className="border border-gray-100 rounded-[1.5rem]">
                                                <button onClick={() => toggleFaq(idx)} className="w-full text-left px-8 py-6 flex items-center justify-between">
                                                    <span className="text-lg font-bold text-[#0A291E]">{faq.question}</span>
                                                    <ChevronDown className={`w-5 h-5 transform transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                                                </button>
                                                {openFaq === idx && (
                                                    <div className="px-8 pb-7">
                                                        <p className="text-gray-500 leading-relaxed text-lg">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-10 lg:sticky lg:top-32">
                                <div className="bg-[#FAF9F6] rounded-[2.5rem] p-8 sm:p-10 space-y-8 border border-gray-100 shadow-xl">
                                    <h4 className="text-2xl font-bold text-[#0A291E]">Course Includes:</h4>
                                    <div className="space-y-5">
                                        {[
                                            { label: "Price", value: "$499.00", icon: Tag, isPrice: true },
                                            { label: "Duration", value: "4 Months", icon: Clock },
                                            { label: "Level", value: "Advanced Clinical", icon: BarChart },
                                            { label: "Instructor", value: "Dr. Robert Chen", icon: User },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <item.icon className="w-5 h-5 text-primary/70" />
                                                    <span className="font-semibold text-sm">{item.label}:</span>
                                                </div>
                                                <span className={`text-sm font-bold ${item.isPrice ? "text-[#1E6B4F] text-lg" : "text-[#0A291E]"}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        to={`/register?courseId=${id}`}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/20 text-center"
                                    >
                                        Enroll Now
                                        <ArrowUpRight className="w-5 h-5 shadow-sm" />
                                    </Link>
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
