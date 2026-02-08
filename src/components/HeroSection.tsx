import { motion } from "framer-motion";
import { ChevronRight, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/hero-doctor.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-hero overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-medium text-lg"
            >
              Indian Society for Heart & Lung Transplantation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
            >
              Advancing{" "}
              <span className="text-primary">Transplant</span>{" "}
              Education & Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              Empowering medical professionals with cutting-edge knowledge in heart
              and lung transplantation through comprehensive learning programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button variant="hero" size="lg" className="gap-2 text-base px-8 py-6">
                <ChevronRight size={18} />
                Explore Courses
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                    >
                      <Heart size={14} className="text-primary" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Trusted by</p>
                  <p className="text-sm font-bold text-primary">500+ Professionals</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-start gap-4 max-w-md mt-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground/80 text-sm italic leading-relaxed">
                  "The ISHLT LMS has transformed how we approach transplant education across our institution."
                </p>
                <p className="text-primary text-sm font-semibold mt-2">— Dr. Priya Mehta</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroDoctor}
                alt="Medical professional in transplant surgery"
                className="w-full h-[500px] lg:h-[600px] object-cover object-top"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-8 left-0 lg:-left-8 bg-stat rounded-2xl shadow-xl p-5 border border-border/50"
            >
              <p className="text-3xl font-bold text-foreground">95%</p>
              <p className="text-primary font-semibold text-sm mt-1">Completion Rate</p>
              <p className="text-muted-foreground text-xs mt-1 max-w-[180px]">
                of enrolled professionals complete their certifications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
