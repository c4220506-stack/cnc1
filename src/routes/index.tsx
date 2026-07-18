import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Instagram, Facebook, Linkedin, MessageCircle, ChevronLeft, ChevronRight, MapPin, Mail, Phone } from "lucide-react";
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
const WHATSAPP = "https://wa.me/919999999999";

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
          style={{ filter: "blur(6px)", transform: "scale(1.08)" }}
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
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="flex h-11 w-11 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="flex h-11 w-11 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="relative min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] lg:basis-[45%]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={src}
                      alt={`CNC precision cut ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
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
        </div>
      </section>

      {/* SPECS */}
      <section className="bg-card px-6 py-24">
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
      <section id="inquiry" className="bg-background px-6 py-24 sm:py-32">
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
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-olive-foreground shadow-2xl transition-all duration-500 hover:scale-110 ${
          showWA ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
