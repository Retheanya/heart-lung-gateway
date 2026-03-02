import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutsectionGif from "@/assets/aboutsection.gif";
import { motion } from "framer-motion";
import { Stethoscope, Calendar, Activity, UserCheck, Heart, LucideIcon, LucideProps } from "lucide-react";

interface BadgeProps {
    icon: LucideIcon;
    text: string;
}

const Badge = ({ icon: Icon, text }: BadgeProps) => (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold tracking-wide hover:bg-red-100 transition duration-300">
        <Icon size={16} className="text-red-500" />
        {text}
    </div>
);

interface SectionProps {
    badgeIcon: LucideIcon;
    badgeText: string;
    title: string;
    text: string;
    image: string;
    reverse?: boolean;
    isGif?: boolean;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", damping: 25, stiffness: 100 } as const
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const Section = ({ badgeIcon, badgeText, title, text, image, reverse = false, isGif = false }: SectionProps) => (
    <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerContainer}
        className="relative py-2 lg:py-3"
    >
        <div className="max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-6 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                    variants={staggerContainer}
                    className={`space-y-4 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
                >
                    <motion.div variants={fadeInUp}>
                        <Badge icon={badgeIcon} text={badgeText} />
                    </motion.div>
                    <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                        {title}
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-sm md:text-base text-neutral-500 leading-relaxed font-medium">
                        {text}
                    </motion.p>
                </motion.div>
                <motion.div
                    variants={fadeInUp}
                    className={`${reverse ? 'lg:order-1' : 'lg:order-2'} group`}
                >
                    <div className="rounded-2xl shadow-lg border border-neutral-200 overflow-hidden relative aspect-[16/9] bg-neutral-50">
                        <img
                            src={image}
                            alt={title}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isGif ? 'object-contain p-4' : ''}`}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"; // Unique high-quality fallback
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
);

const About = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-neutral-50/50 to-red-50/20 selection:bg-primary selection:text-white font-inter">
            <Header />

            <main className="flex-grow pt-2">
                {/* --- HERO HEADER --- */}
                <section className="pt-2 pb-2">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="max-w-3xl"
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 text-red-600 font-bold tracking-wider text-sm mb-2 px-3 py-1 rounded-full bg-red-50/50 border border-red-100"
                            >
                                <Activity size={12} />
                                About The Society
                            </motion.span>
                            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 mb-2 leading-none">
                                INSHLT
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl font-medium">
                                Advancing the field of heart and lung transplantation through research, education, and advocacy.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                <div className="space-y-0 pb-8">
                    {/* SECTION 1: WHO WE ARE */}
                    <Section
                        badgeIcon={Stethoscope}
                        badgeText="Who We Are"
                        title="The Indian Society for Heart and Lung Transplantation"
                        text="INSHLT is a professional medical organization dedicated to advancing heart and lung transplant medicine in India. We verify the quality of care and promote scientific research to improve patient outcomes."
                        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
                    />

                    {/* SECTION 2: CONFERENCES */}
                    <Section
                        badgeIcon={Calendar}
                        badgeText="Academic Stewardship"
                        title="Annual Conferences"
                        text="The society hosts major academic events, such as the 6th Annual Conference (INSHLT 2025) in Jaipur (3-5 October 2025), serving as a nexus for international clinical exchange."
                        image="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                        reverse={true}
                    />

                    {/* SECTION 3: GUIDELINES */}
                    <Section
                        badgeIcon={Activity}
                        badgeText="Clinical Excellence"
                        title="Clinical Guidelines"
                        text="We provide specific recommendations for thoracic organ transplants, including specialized protocols for pandemic situations, ensuring physician readiness under all clinical variables."
                        image="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800"
                    />

                    {/* SECTION 4: REGISTRY */}
                    <Section
                        badgeIcon={Heart}
                        badgeText="Data Initiatives"
                        title="Heart & Lung Registry"
                        text="The society launched a full registry in 2024, modeled after UNOS and ISHLT standards, to consolidate nationwide transplant data and improve longitudinal patient outcomes."
                        image={aboutsectionGif}
                        reverse={true}
                        isGif={true}
                    />

                    {/* SECTION 5: MEMBERSHIP */}
                    <Section
                        badgeIcon={UserCheck}
                        badgeText="Professional Network"
                        title="Membership Details"
                        text="Membership: Life membership is available for specialized medical professionals like cardiologists, pulmonologists, surgeons, and intensive care specialists dedicated to elevating the standard of thoracic transplantation in India."
                        image="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
