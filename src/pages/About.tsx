import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import section1 from "@/assets/section1.jpg";
import section3 from "@/assets/section3.jpg";
import section4 from "@/assets/section4.jpg";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F5F5F5] selection:bg-black selection:text-white font-inter">
            <Header />

            <main className="flex-grow">
                {/* Section 1 */}
                <section className="container mx-auto px-6 lg:px-20 py-16 lg:py-24 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Column */}
                        <div className="flex flex-col pt-4">
                            <span className="text-[15px] text-[#1a1a1a]/60 font-medium mb-5">About INSHLT</span>

                            <h1 className="text-3xl lg:text-[2.85rem] font-bold text-[#1a1a1a] leading-[1.15] mb-11 max-w-[720px] tracking-tight text-left">
                                INSHLT helps creators deliver this through a professional, structured, and conversion-optimized platform. <span className="text-[#1a1a1a]/40 font-semibold italic lg:not-italic">Learners want practical skills, and flexible learning.</span>
                            </h1>

                            <div className="mb-14 text-left">
                                <button className="flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-full hover:bg-black/95 transition-all group shadow-xl shadow-black/10">
                                    <span className="text-[13px] font-bold uppercase tracking-[0.12em]">Contact Us</span>
                                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform ml-2">
                                        <ArrowRight size={16} className="text-black" />
                                    </div>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 bg-white/50 rounded-2xl border border-gray-100 overflow-hidden max-w-[650px] text-left">
                                <div className="p-8 lg:p-10 border-r border-gray-100">
                                    <div className="text-4xl font-bold text-[#1a1a1a] mb-2 tracking-tighter">70%+</div>
                                    <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed font-semibold">
                                        learners report career improvement
                                    </p>
                                </div>
                                <div className="p-8 lg:p-10 border-r border-gray-100">
                                    <div className="text-4xl font-bold text-[#1a1a1a] mb-2 tracking-tighter">25000+</div>
                                    <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed font-semibold">
                                        students enrolled our INSHLT courses
                                    </p>
                                </div>
                                <div className="p-8 lg:p-10">
                                    <div className="text-4xl font-bold text-[#1a1a1a] mb-2 tracking-tighter">100%</div>
                                    <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed font-semibold">
                                        Student satisfaction. this is our first priority
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="relative lg:block">
                            <div className="rounded-[44px] overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.005]">
                                <img
                                    src={section1}
                                    alt="Professional in workspace"
                                    className="w-full h-full object-cover aspect-[1.1/1]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 - Values */}
                <section className="container mx-auto px-6 lg:px-20 pb-24 lg:pb-32">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <h2 className="text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight">
                            The values that drive
                        </h2>
                        <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                            Designed for better learning. Built for real success. Designed for better learning.<br className="hidden lg:block" /> Built for real success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-200 flex flex-col items-start">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                    <path d="M9 18h6" />
                                    <path d="M10 22h4" />
                                </svg>
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                                Clarity over excess complexity
                            </h3>
                            <p className="text-gray-500 font-medium leading-[1.6]">
                                Pick from career-focused learning programs.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-200 flex flex-col items-start">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                    <path d="m9 16 2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                                Premium learning experience
                            </h3>
                            <p className="text-gray-500 font-medium leading-[1.6]">
                                We focus on practical knowledge, hands-on projects..
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-200 flex flex-col items-start">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                                Professional platform experience
                            </h3>
                            <p className="text-gray-500 font-medium leading-[1.6]">
                                INSHLT delivers a full LMS-style experience.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-200 flex flex-col items-start">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                                Outcome-driven learning process
                            </h3>
                            <p className="text-gray-500 font-medium leading-[1.6]">
                                Every course is designed with a clear goal
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3 - Mission & Vision */}
                <section className="container mx-auto px-6 lg:px-20 py-24 lg:py-32 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Column - Image */}
                        <div className="relative order-2 lg:order-1">
                            <div className="rounded-[44px] overflow-hidden shadow-xl transition-transform duration-500">
                                <img
                                    src={section3}
                                    alt="Mission and Vision"
                                    className="w-full h-full object-cover aspect-[1.1/1]"
                                />
                            </div>
                        </div>

                        {/* Right Column - Text */}
                        <div className="flex flex-col pt-4 order-1 lg:order-2">
                            <span className="text-[14px] text-gray-800 font-medium mb-5">Mission & Vision</span>

                            <h2 className="text-3xl lg:text-[2.75rem] font-bold text-[#1a1a1a] leading-[1.15] mb-8 max-w-[550px] tracking-tight">
                                To empower anyone to start, grow, and scale
                            </h2>

                            <p className="text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mb-12 max-w-[500px] font-medium">
                                From course pages to sales funnels to learning dashboards every element is built to attract learners.
                            </p>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h3 className="text-[19px] font-bold text-[#1a1a1a] mb-5">Our Mission</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                                        To be the go-to growth partner for bold, forward-thinking companies worldwide
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[19px] font-bold text-[#1a1a1a] mb-5">Our Vision</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                                        We envision a future where brands connect more meaningfully with people
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 - Community */}
                <section className="container mx-auto px-6 lg:px-20 py-24 lg:py-32 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Column - Text */}
                        <div className="flex flex-col pt-4">
                            <span className="text-[14px] text-gray-500 font-medium mb-5">Our community</span>

                            <h2 className="text-3xl lg:text-[2.75rem] font-bold text-[#1a1a1a] leading-[1.15] mb-8 max-w-[550px] tracking-tight">
                                We have global learning Community
                            </h2>

                            <p className="text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mb-10 max-w-[500px] font-medium">
                                Our platform is built to scale into a multi-course, multi-instructor global academy.
                            </p>

                            <div className="space-y-4 mb-14">
                                {[
                                    "Thousands of learners",
                                    "Instructors from diverse industries",
                                    "Students from multiple countries"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-white" strokeWidth={3} />
                                        </div>
                                        <span className="text-[16px] font-semibold text-[#1a1a1a]">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <button className="flex items-center gap-2 bg-black text-white pl-7 pr-1.5 py-1.5 rounded-full hover:bg-black/90 transition-all group border border-black shadow-lg shadow-black/5">
                                    <span className="text-[13px] font-bold uppercase tracking-[0.15em]">join our community</span>
                                    <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={18} className="text-black" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative">
                            <div className="rounded-[44px] overflow-hidden shadow-xl transition-transform duration-500">
                                <img
                                    src={section4}
                                    alt="Global Learning Community"
                                    className="w-full h-full object-cover aspect-[1.1/1]"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
