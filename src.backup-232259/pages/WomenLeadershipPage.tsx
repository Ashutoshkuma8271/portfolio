import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { WomenCellInquiryForm } from '../components/forms/WomenCellInquiryForm';
import { SEO } from '../components/ui/SEO';
import { womenLeadershipData } from '../data/womenLeadership';
import { motion } from 'framer-motion';
import focusWomen from '../assets/images/focus/women.webp';
import { 
  HeartHandshake, 
  Briefcase, 
  GraduationCap, 
  Scale, 
  HeartPulse, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Quote, 
  Users,
  Check,
  ArrowRight
} from 'lucide-react';

export const WomenLeadershipPage: React.FC = () => {
  const [rsvpState, setRsvpState] = useState<{ [key: string]: boolean }>({});

  const handleRsvp = (eventId: string) => {
    setRsvpState((prev) => ({ ...prev, [eventId]: true }));
  };

  const getInitiativeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-gold-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-gold-500" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-gold-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-gold-500" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-gold-500" />;
    }
  };

  return (
    <div className="overflow-hidden bg-[#FAF6F0]">
      <SEO
        title="Women Leadership | All India Jamiatul Quresh Women Cell"
        description="Transforming grassroots female empowerment across 14 states through education, vocational incubation, and legal advocacy under the National Presidency of Zeenat Kureshi."
      />

      {/* Page Header Banner */}
      <PageHeader
        eyebrow="NATIONWIDE SOCIO-CIVIC MOVEMENT"
        title="All India Jamiatul Quresh Women Cell — Grassroots Advocacy & Economic Agency"
        description="Mobilizing over 50,000 women across 14 Indian states through vocational incubation, micro-enterprise grants, and pro-bono legal advocacy."
        mediaImage={focusWomen}
        mediaAlt="AIJQ Women Cell Nationwide Movement"
        mediaBadge="AIJQ National President"
        stats={[
          { value: '50,000+', label: 'Women Mobilized' },
          { value: '14 States', label: 'Active Chapters' },
          { value: '100 Years', label: 'Civic Heritage' },
        ]}
        actionButton={
          <a
            href="#programs"
            className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="relative z-10">Explore National Programs</span>
            <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </a>
        }
      />

      {/* 
        ======================================================================
        1. PRESIDENT'S VISION & MISSION STATEMENT
        ======================================================================
      */}
      <section id="programs" className="py-20 lg:py-28 bg-[#FAF6F0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="NATIONAL PRESIDENCY"
                title="A Quiet Revolution: Empowering Over 50,000 Women"
                subtitle="The All India Jamiatul Quresh Women Cell is a historic institution dedicated to eradicating educational deficits, institutionalizing women-led micro-enterprises, and offering pro-bono legal defense across 14 Indian states."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {womenLeadershipData.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-ivory-800 shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.015] hover:border-gold-600/40 transition-all duration-300 ease-out"
                  >
                    <div className="text-xs uppercase font-label font-bold text-gold-700 mb-2">
                      {pillar.stat}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-emerald-950 mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#081D17] to-[#04100D] text-ivory-500 p-8 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-[0_24px_56px_-12px_rgba(7,24,19,0.4),0_0_24px_rgba(199,154,61,0.15)] relative overflow-hidden">
                <Quote className="w-10 h-10 text-gold-400 mb-4" />
                <p className="font-serif italic text-lg sm:text-xl text-ivory-500 leading-relaxed mb-6">
                  "{womenLeadershipData.missionStatement.quote}"
                </p>
                <div className="pt-6 border-t border-gold-500/30">
                  <p className="font-serif font-bold text-lg text-gold-400">
                    {womenLeadershipData.missionStatement.author}
                  </p>
                  <p className="text-xs text-ivory-700">
                    {womenLeadershipData.missionStatement.designation}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        2. KEY INITIATIVES & GRASSROOTS IMPACT
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-white border-y border-ivory-800">
        <Container>
          <SectionHeading
            eyebrow="FLAGSHIP PROGRAMS"
            title="Institutional Programs Driving Structural Change"
            subtitle="Explore how targeted interventions are creating generational economic self-reliance."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {womenLeadershipData.initiatives.map((init, idx) => (
              <motion.div
                key={init.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FAF6F0] p-8 rounded-2xl border border-ivory-800 shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.015] hover:border-gold-600/40 transition-all duration-300 ease-out flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 flex items-center justify-center mb-6 border border-gold-500/40">
                    {getInitiativeIcon(init.iconName)}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-3">
                    {init.title}
                  </h3>

                  <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed mb-6">
                    {init.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-ivory-700 text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-gold-600" />
                    <span>Impact: {init.impact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-600">
                    <Users className="w-4 h-4 text-gold-600" />
                    <span>Reach: {init.beneficiaries}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        3. UPCOMING EVENTS & CONCLAVES
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-[#071913] text-ivory-500">
        <Container>
          <SectionHeading
            eyebrow="ENGAGEMENTS & CONCLAVES"
            title="Upcoming Assemblies, Exhibitions & Webinars"
            subtitle="Register to participate in nationwide conventions and community forums."
            isDark
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {womenLeadershipData.upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#0A261F]/90 border border-gold-500/35 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-luxury-lg hover:border-gold-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xs font-label uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/30">
                      {evt.type}
                    </span>
                    <Badge variant="ivory" size="sm">
                      {evt.status}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-ivory-700 leading-relaxed mb-6">
                    {evt.description}
                  </p>

                  <div className="space-y-2 text-xs text-ivory-800 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-800">
                  <button
                    onClick={() => handleRsvp(evt.id)}
                    disabled={rsvpState[evt.id]}
                    className={`w-full py-3 rounded-full text-xs uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      rsvpState[evt.id]
                        ? 'bg-emerald-700 text-ivory-500 border border-emerald-500 cursor-default'
                        : 'bg-gold-600 hover:bg-gold-500 text-emerald-950 shadow-gold-glow'
                    }`}
                  >
                    {rsvpState[evt.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Seat Reserved</span>
                      </>
                    ) : (
                      <span>Register</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        4. VOLUNTEER & MEMBERSHIP INQUIRY FORM
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-[#FAF6F0]">
        <Container size="lg">
          <SectionHeading
            eyebrow="JOIN THE MISSION"
            title="Lend Your Voice, Skills, or Resources"
            subtitle="Whether an advocate, educator, donor partner, or passionate volunteer, connect with our national secretariat."
            center
          />

          <div className="mt-12">
            <WomenCellInquiryForm />
          </div>
        </Container>
      </section>
    </div>
  );
};
