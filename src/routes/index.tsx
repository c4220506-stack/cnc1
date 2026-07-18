import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

const REPO = "https://github.com/c4220506-stack/Cncimages/raw/main/public";
const VIDEO = `${REPO}/Cnc_cutting.mp4`;
const IMAGES = [
  `${REPO}/Cnc1.jpg`,
  `${REPO}/Cnc2.jpeg`,
  `${REPO}/Cnc3.png`,
  `${REPO}/Cnc4.jpeg`,
  `${REPO}/Cnc5.png`,
  `${REPO}/Hero.jpg`,
];
const STACK_A = [
  `${REPO}/Cnc-sheet-metal-cutting-services-in-ahmedabad.jpg`,
  `${REPO}/high-precision-laser-cutting-machine.webp`,
];
const STACK_B = [
  `${REPO}/2-min-1.jpg`,
  `${REPO}/mechanical-parts-laser-cutting-services-500x500.png`,
  `${REPO}/metal-cutting-services.jpg`,
];
const WHATSAPP = "https://wa.me/919999999999";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 900ms ease-out ${delay}ms, transform 900ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.688.244-1.045 0-.058 0-.144-.03-.215-.1-.172-2.434-1.233-2.678-1.433zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.35a8.98 8.98 0 0 1-1.72-5.284c0-4.955 4.04-8.995 8.997-8.995S25.2 10.82 25.2 15.776c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.55 5.574L5 27.176l5.974-1.548a10.71 10.71 0 0 0 5.228 1.34c5.96 0 10.8-4.842 10.8-10.8s-4.84-10.8-10.8-10.8z"/>
    </svg>
  );
}

function Index() {
  const [showWA, setShowWA] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "center" },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    const onScroll = () => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const passed = rect.top + rect.height / 2 < window.innerHeight * 0.5;
      setShowWA(passed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast.success("Inquiry received", { description: "We'll respond within 24 hours." });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "blur(3px)", transform: "scale(1.05)" }}
          src={VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 h-px w-16 bg-white/60" />
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-white/80">
            Est. Nagpur · India
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-light leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            SAIFY LASER<br />
            <span className="italic">Cutting</span> Nagpur
          </h1>
          <p className="mt-8 max-w-xl text-sm font-light tracking-[0.25em] text-white/85 uppercase sm:text-base">
            Precision CNC Metal Cutting
          </p>
          <p className="mt-2 text-xs font-light tracking-[0.3em] text-white/70 uppercase">
            PAN India Order &amp; Delivery
          </p>
          <a
            href="#inquiry"
            className="mt-12 inline-flex items-center gap-3 border border-white/40 px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-black"
          >
            Request a Quote
          </a>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/60">
          Scroll
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-card px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            The Craft
          </p>
          <h2 className="text-balance text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Millimeter-precise cuts on <span className="italic">every</span> plate.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            From single prototypes to production batches, our CNC laser facility delivers
            architectural-grade precision on mild steel, stainless, aluminium and brass —
            shipped anywhere in India.
          </p>
        </div>
      </section>

      {/* SLIDER */}
      <section ref={sliderRef} className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
                Portfolio
              </p>
              <h2 className="text-4xl font-light sm:text-5xl">Recent Work</h2>
            </div>
          </div>

          <div className="group/carousel relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="relative min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] lg:basis-[45%]"
                  >
                    <div className="group/image aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={src}
                        alt={`CNC precision cut ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/image:scale-[1.04]"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Piece No. {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant hover arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/20 bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 hover:bg-foreground hover:text-background group-hover/carousel:left-4 group-hover/carousel:opacity-100 sm:h-14 sm:w-14"
            >
              <ChevronLeft size={18} strokeWidth={1.25} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/20 bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 hover:bg-foreground hover:text-background group-hover/carousel:right-4 group-hover/carousel:opacity-100 sm:h-14 sm:w-14"
            >
              <ChevronRight size={18} strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-card px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Capabilities
            </p>
            <h2 className="text-4xl font-light leading-tight sm:text-5xl">
              Materials we <span className="italic">master</span>.
            </h2>
          </div>

          <div className="grid gap-12 sm:gap-16 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Mild Steel (MS)",
                d: "High-speed precision cutting engineered for industrial applications and structural work.",
              },
              {
                n: "02",
                t: "Stainless Steel (SS)",
                d: "Clean, burr-free edges for architectural, decorative and food-grade fabrication.",
              },
              {
                n: "03",
                t: "Aluminum & Exotic Metals",
                d: "Specialty cutting for Brass, Copper and aluminium alloys with fine tolerance control.",
              },
            ].map((c) => (
              <div key={c.n} className="border-t border-border pt-8">
                <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  {c.n}
                </div>
                <h3 className="mt-6 text-2xl font-light sm:text-3xl">{c.t}</h3>
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-20 max-w-2xl text-center text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">
            Equipped with high-power fiber laser technology for extreme precision and minimal tolerance.
          </p>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-background px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              The Process
            </p>
            <h2 className="text-4xl font-light sm:text-5xl">How We Work</h2>
          </div>

          <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
            {[
              {
                n: "I",
                t: "Design Submission",
                d: "Share your CAD / DXF files or drawings via our form or WhatsApp.",
              },
              {
                n: "II",
                t: "Precision Execution",
                d: "High-fidelity CNC laser cutting engineered at our Nagpur hub.",
              },
              {
                n: "III",
                t: "Nationwide Logistics",
                d: "Secure, industrial-grade wooden crate packaging with tracked shipping to any state across India.",
              },
            ].map((s) => (
              <div key={s.n} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 bg-background font-display text-lg italic">
                  {s.n}
                </div>
                <h3 className="mt-8 text-xl font-light sm:text-2xl">{s.t}</h3>
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC ADVANTAGE */}
      <section className="bg-card px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Strategic Advantage
          </p>
          <h2 className="text-balance text-4xl font-light leading-tight sm:text-5xl">
            Centrally Located for <span className="italic">Fast Delivery</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            Operating from Nagpur — the geographical heart of India — allows us to optimize
            shipping routes, reducing transit times and logistics costs to Northern,
            Southern, Eastern and Western states alike.
          </p>
          <div className="mx-auto mt-12 h-px w-16 bg-border" />
        </div>
      </section>

      {/* SPECS */}
      <section className="bg-background px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
          {[
            { k: "0.1mm", v: "Cutting tolerance" },
            { k: "PAN India", v: "Delivery network" },
            { k: "24/7", v: "Production capacity" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-4xl font-light sm:text-5xl">{s.k}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INQUIRY */}
      <section id="inquiry" className="relative bg-card px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-olive/40 to-transparent" />
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Contact
            </p>
            <h2 className="text-balance text-4xl font-light leading-tight sm:text-5xl">
              Begin your <span className="italic">order</span>.
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-muted-foreground">
              Share your specifications and our team will respond with a detailed quote
              within one business day.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={14} /> Nagpur, Maharashtra, India
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone size={14} /> +91 99999 99999
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={14} /> orders@saifylaser.in
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
            ].map((f) => (
              <div key={f.name}>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {f.label}
                </label>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="w-full border-b border-border bg-transparent py-3 text-base font-light outline-none transition-colors focus:border-foreground"
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Order Requirements
              </label>
              <textarea
                required
                name="requirements"
                rows={4}
                className="w-full resize-none border-b border-border bg-transparent py-3 text-base font-light outline-none transition-colors focus:border-foreground"
                placeholder="Material, thickness, quantity, dimensions..."
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-olive-foreground transition-all hover:opacity-90 hover:tracking-[0.4em]"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="font-display text-lg">Saify Laser Cutting</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Nagpur · Since 2010
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-olive hover:bg-olive hover:text-olive-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${
          showWA ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
        }`}
        style={{ backgroundColor: "#25D366", color: "#ffffff" }}
      >
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}
