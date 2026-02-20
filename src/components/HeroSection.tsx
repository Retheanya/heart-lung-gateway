import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroDoctor from "@/assets/hero-doctor.jpg";
import { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax for stats card
  const { scrollY } = useScroll();
  const statsY = useTransform(scrollY, [0, 500], [0, 150]);

  // Hero images for carousel
  const heroImages = [
    heroDoctor,
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=800&fit=crop",
  ];

  // Auto-change image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Partner logos placeholder data
  const partners = [
    { name: "Ebooks", icon: "📚" },
    { name: "Homey", icon: "🏠" },
    { name: "Invert", icon: "⟲" },
    { name: "Ljubljana", icon: "📍" },
    { name: "Brooklyn", icon: "🔷" },
    { name: "Brooklyn", icon: "🔷" },
    { name: "Waveless", icon: "🌊" },
    { name: "Milano", icon: "Ⓜ️" },
  ];

  // Duplicate partners for seamless scrolling
  const duplicatedPartners = [...partners, ...partners];

  // Avatar placeholder images
  const avatars = [
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Main Hero Container */}
      <div className="mx-4 lg:mx-8 my-4">
        <div className="bg-hero rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
              {/* Left Content */}
              <div className="space-y-8 h-full flex flex-col justify-center">
                {/* Intro Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="secondary" className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors">
                    Welcome to INSHLT Learning
                  </Badge>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground tracking-normal"
                >
                  Advance Your Career in
                  <br />
                  Heart Failure &
                  <br />
                  Transplantation
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted-foreground text-lg leading-relaxed max-w-xl"
                >
                  Industry-led certification programs with live expert sessions, clinical insights, assessments, and recognized certification from INSHLT India.
                </motion.p>

                {/* CTA Button + Trusted By */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-6"
                >
                  <Link to="/courses">
                    <PrimaryButton className="gap-2">
                      Explore Courses
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </PrimaryButton>
                  </Link>

                  {/* Trusted By Section */}
                  {/* <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {avatars.map((avatar, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full border-2 border-hero overflow-hidden"
                        >
                          <img
                            src={avatar}
                            alt={`User ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Trusted by</p>
                      <p className="text-sm font-semibold text-foreground">500+ Professionals</p>
                    </div>
                  </div> */}
                </motion.div>

                {/* Video Testimonial Card */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-5 mt-8 pt-4"
                >
                  <div className="relative w-44 h-28 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=250&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute bottom-3 left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause size={14} className="text-primary-foreground" fill="currentColor" />
                      ) : (
                        <Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1">
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      "This certification has significantly enhanced my clinical practice and understanding of advanced heart failure management."
                    </p>
                    <p className="text-primary text-sm font-semibold mt-3">— Dr. Rajesh Kumar</p>
                  </div>
                </motion.div> */}
              </div>

              {/* Right Image Carousel */}
              <motion.div
                ref={heroRef}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-[1.5rem] overflow-hidden">
                  {heroImages.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`Medical professional ${index + 1}`}
                      className={`w-full h-[450px] lg:h-[520px] object-cover object-top absolute inset-0 ${index === 0 ? "relative" : ""
                        }`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: currentImageIndex === index ? 1 : 0,
                        scale: currentImageIndex === index ? 1 : 1.05
                      }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  ))}

                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/70"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Card - Square with scroll parallax */}
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ y: statsY }}
                  className="absolute top-[30%] left-4 lg:-left-4 bg-white rounded-2xl shadow-xl w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] flex flex-col justify-center items-center text-center z-20"
                >
                  <p className="text-3xl lg:text-4xl font-bold text-foreground">95%</p>
                  <p className="text-primary font-semibold text-xs lg:text-sm mt-1">Trusted Learners</p>
                  <p className="text-muted-foreground text-[10px] lg:text-xs mt-1 leading-relaxed px-2">
                    satisfied with our education.
                  </p>
                </motion.div> */}
              </motion.div>
            </div>
          </div>

          {/* Partners Section - Inside hero bg */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="pb-8 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p className="text-primary font-medium text-sm">
                Collaborating with 200+ Top Institutions Worldwide
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-hero to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-hero to-transparent z-10 pointer-events-none"></div>

              <div className="flex animate-marquee">
                {duplicatedPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mx-8 shrink-0"
                  >
                    <span className="text-lg">{partner.icon}</span>
                    <span className="font-semibold text-sm whitespace-nowrap">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
