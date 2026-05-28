import { useState, useEffect, useRef } from "react";
const crewnecks = [
  {
    name: "ASCEND Autumn",
    price: "70 €",
    description: "Les feuilles tombent, tes anciennes habitudes aussi.",
    image: "https://images.unsplash.com/photo-1617952739368-36eedafeb3f4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Winter",
    price: "70 €",
    description: "Le meilleur moment pour redéfinir qui tu es vraiment.",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Fall",
    price: "70 €",
    description: "Tu récoltes ce que tu sèmes. Un beau jardin, c'est toujours agréable.",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Summer",
    price: "70 €",
    description: "Le soleil brille, toi aussi.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=1200&auto=format&fit=crop",
  },
];
const tshirts = [
  {
    name: "ASCEND Autumn",
    price: "30 €",
    description: "Les feuilles tombent, tes anciennes habitudes aussi.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Winter",
    price: "30 €",
    description: "Le meilleur moment pour redéfinir qui tu es vraiment.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Fall",
    price: "30 €",
    description: "Tu récoltes ce que tu sèmes. Un beau jardin, c'est toujours agréable.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ASCEND Summer",
    price: "30 €",
    description: "Le soleil brille, toi aussi.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop",
  },
];
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"crewnecks" | "tshirts">("crewnecks");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toggleSize = (key: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [key]: prev[key] === size ? "" : size }));
  };
  const activeProducts = activeTab === "crewnecks" ? crewnecks : tshirts;
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500" style={{ backdropFilter: "blur(16px)", background: scrolled ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl tracking-[0.4em] font-light select-none">ASCEND</h1>
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest text-white/70">
            {[{ label: "Collection", href: "#collection" }, { label: "Philosophie", href: "#philosophy" }, { label: "À propos", href: "#about" }, { label: "Contact", href: "#contact" }].map((item) => (
              <a key={item.label} href={item.href} className="relative group text-white/70 hover:text-white transition-colors duration-300">
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#collection" className="hidden md:block border border-white/60 px-5 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full">Panier</a>
            <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              <span className="block w-6 h-px bg-white transition-all duration-300" style={{ transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "" }} />
              <span className="block w-6 h-px bg-white transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-6 h-px bg-white transition-all duration-300" style={{ transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "" }} />
            </button>
          </div>
        </div>
        <div className="md:hidden overflow-hidden transition-all duration-500" style={{ maxHeight: menuOpen ? "300px" : "0" }}>
          <div className="px-6 pb-6 flex flex-col gap-5 border-t border-white/10 pt-5">
            {[{ label: "Collection", href: "#collection" }, { label: "Philosophie", href: "#philosophy" }, { label: "À propos", href: "#about" }, { label: "Contact", href: "#contact" }].map((item) => (
              <a key={item.label} href={item.href} className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </div>
        </div>
      </header>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" alt="ASCEND" className="absolute inset-0 w-full h-full object-cover scale-105" style={{ animation: "slowZoom 18s ease-out forwards" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="uppercase tracking-[0.6em] text-white/50 text-xs mb-8" style={{ animation: "fadeUp 1s ease 0.2s both" }}>Casual Minimalist Clothing</p>
          <h2 className="text-7xl md:text-9xl font-extralight tracking-[0.2em] leading-none mb-8" style={{ animation: "fadeUp 1s ease 0.4s both" }}>ASCEND</h2>
          <p className="md:text-2xl text-white/75 max-w-xl mx-auto font-light text-[29px]" style={{ animation: "fadeUp 1s ease 0.6s both" }}>Les saisons changent, donc toi aussi.</p>
          <p className="uppercase tracking-[0.4em] text-white/35 mt-3 text-[19px]" style={{ animation: "fadeUp 1s ease 0.7s both" }}>Seasons change, so do you.</p>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fadeUp 1s ease 0.9s both" }}>
            <a href="#collection" className="bg-white text-black px-10 py-4 rounded-full uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300">Découvrir la collection</a>
            <a href="#about" className="border border-white/30 px-10 py-4 rounded-full uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300">Voir la marque</a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12 bg-white/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white" style={{ animation: "scrollLine 2s ease infinite" }} />
          </div>
        </div>
      </section>
      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-36 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <RevealSection>
            <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-10">Philosophy</p>
            <h3 className="text-4xl md:text-6xl leading-tight font-extralight max-w-4xl mx-auto">Des vêtements simples, élégants et conçus pour accompagner chaque nouvelle version de toi‑même.</h3>
          </RevealSection>
          <RevealSection delay={200}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mt-14 leading-relaxed">ASCEND représente l'évolution personnelle. Une esthétique minimaliste, des coupes intemporelles et une identité pensée pour ceux qui avancent.</p>
          </RevealSection>
        </div>
      </section>
      {/* MARQUEE */}
      <div className="border-y border-white/5 py-5 overflow-hidden bg-black">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.5em] text-white/20 shrink-0">Minimalism &nbsp;·&nbsp; Évolution &nbsp;·&nbsp; Confiance &nbsp;·&nbsp; Intemporel &nbsp;·&nbsp; ASCEND</span>
          ))}
        </div>
      </div>
      {/* COLLECTION */}
      <section id="collection" className="py-36 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-6">Collection</p>
                <h3 className="text-6xl md:text-8xl font-extralight">Essentials.</h3>
              </div>
              <p className="text-white/40 max-w-xs leading-relaxed text-sm">Peu de pièces. Beaucoup d'identité. Chaque vêtement ASCEND est pensé pour durer au‑delà des tendances.</p>
            </div>
            <div className="flex gap-2 mb-14">
              {(["crewnecks", "tshirts"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300" style={{ background: activeTab === tab ? "white" : "transparent", color: activeTab === tab ? "black" : "rgba(255,255,255,0.45)", border: activeTab === tab ? "1px solid white" : "1px solid rgba(255,255,255,0.15)" }}>
                  {tab === "crewnecks" ? "Crewnecks" : "T-Shirts"}
                </button>
              ))}
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeProducts.map((product, index) => {
              const sizeKey = `${activeTab}-${index}`;
              return (
                <RevealSection key={`${activeTab}-${index}`} delay={index * 100}>
                  <div className="group bg-[#0F0F0F] rounded-[28px] overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-500">
                    <div className="overflow-hidden h-[520px] relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <h4 className="text-xl font-light mb-2">{product.name}</h4>
                          <p className="text-white/45 text-sm leading-relaxed max-w-xs">{product.description}</p>
                        </div>
                        <span className="text-xl text-white/70 font-light shrink-0">{product.price}</span>
                      </div>
                      <div className="flex gap-2.5 flex-wrap mb-8">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button key={size} onClick={() => toggleSize(sizeKey, size)} className="w-11 h-11 rounded-full text-xs font-light transition-all duration-200" style={{ background: selectedSizes[sizeKey] === size ? "white" : "transparent", color: selectedSizes[sizeKey] === size ? "black" : "rgba(255,255,255,0.6)", border: selectedSizes[sizeKey] === size ? "1px solid white" : "1px solid rgba(255,255,255,0.15)" }}>{size}</button>
                        ))}
                      </div>
                      <button className="w-full bg-white text-black py-4 rounded-full uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-200 font-medium">Ajouter au panier</button>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>
      {/* FOUNDERS */}
      <section className="py-36 border-t border-white/5 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-8">Fondateurs</p>
              <h3 className="text-5xl md:text-6xl font-extralight leading-tight max-w-3xl mx-auto">Deux visions. Une seule direction.</h3>
              <p className="text-white/50 mt-8 leading-relaxed text-base max-w-2xl mx-auto">ASCEND est née de l'ambition de deux jeunes hommes de 25 ans convaincus qu'il manquait une marque capable d'incarner l'évolution personnelle à travers des pièces simples et durables.</p>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <RevealSection delay={0}>
              <div className="group">
                <div className="rounded-[28px] overflow-hidden border border-white/8 h-[600px] mb-8 relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" alt="Fondateur 1" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-1">Co-fondateur</p>
                    <h4 className="text-2xl font-light">[ Votre prénom ]</h4>
                  </div>
                </div>
                <p className="text-white/50 leading-relaxed text-sm px-2">Il a su trouver la direction d'ASCEND et surtout en définir l'esprit — celui de l'évolution personnelle qu'il a toujours voulu partager. Sa conviction profonde : chaque personne a en elle le pouvoir d'évoluer et de briller à sa manière. ASCEND est sa façon de le rappeler, à travers chaque pièce.</p>
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <div className="group">
                <div className="rounded-[28px] overflow-hidden border border-white/8 h-[600px] mb-8 relative">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop" alt="Fondateur 2" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-1">Co-fondateur</p>
                    <h4 className="text-2xl font-light">[ Votre prénom ]</h4>
                  </div>
                </div>
                <p className="text-white/50 leading-relaxed text-sm px-2">Entrepreneur dans l'âme, il structure la stratégie et l'identité de marque d'ASCEND. Sa conviction : une marque qui dure, c'est une marque qui sait exactement ce qu'elle représente.</p>
              </div>
            </RevealSection>
          </div>
          <RevealSection delay={200}>
            <div className="mt-20 border-t border-white/8 pt-16 text-center">
              <p className="text-2xl md:text-3xl font-extralight text-white/70 max-w-3xl mx-auto leading-relaxed italic">« On ne construit pas ASCEND pour suivre les tendances. On la construit pour ceux qui choisissent de les ignorer. »</p>
            </div>
          </RevealSection>
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" className="py-36 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <RevealSection>
            <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-10">About ASCEND</p>
            <h3 className="text-5xl md:text-6xl font-extralight leading-tight">Une marque pensée pour ceux qui évoluent.</h3>
            <p className="mt-14 text-white/50 leading-relaxed text-base max-w-2xl mx-auto">Dans un monde saturé de tendances rapides, ASCEND choisit la simplicité. Des pièces intemporelles, une esthétique épurée et une vision tournée vers l'évolution personnelle.</p>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/8 pt-14">
              {[{ value: "2024", label: "Fondée" }, { value: "100%", label: "Coton premium" }, { value: "∞", label: "Intemporel" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-extralight mb-2">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-white/35">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
      {/* NEWSLETTER */}
      <section className="py-36 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <RevealSection>
            <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-10">Newsletter</p>
            <h3 className="text-5xl md:text-6xl font-extralight mb-4">Rejoins l'évolution.</h3>
            <p className="text-white/40 text-sm mb-12">Nouvelles collections, accès anticipé et inspirations exclusives.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Ton adresse email" className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white text-sm outline-none placeholder:text-white/25" style={{ background: "rgba(255,255,255,0.05)" }} />
              <button className="bg-white text-black px-8 py-4 rounded-full uppercase tracking-widest text-xs hover:opacity-90 font-medium whitespace-nowrap">S'inscrire</button>
            </div>
          </RevealSection>
        </div>
      </section>
      {/* CONTACT */}
      <section id="contact" className="py-36 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <RevealSection>
            <p className="uppercase tracking-[0.5em] text-xs text-white/35 mb-10">Contact</p>
            <h3 className="text-4xl md:text-5xl font-extralight leading-tight">Construisons quelque chose d'intemporel.</h3>
            <p className="text-white/40 mt-8 text-sm leading-relaxed">Une question, une collaboration, une idée ?<br />Écris-nous.</p>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="space-y-4">
              <input type="text" placeholder="Nom" className="w-full rounded-2xl px-6 py-4 text-sm outline-none text-white placeholder:text-white/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }} />
              <input type="email" placeholder="Email" className="w-full rounded-2xl px-6 py-4 text-sm outline-none text-white placeholder:text-white/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }} />
              <textarea placeholder="Message" rows={5} className="w-full rounded-2xl px-6 py-4 text-sm outline-none text-white placeholder:text-white/30 resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }} />
              <button className="bg-white text-black px-8 py-4 rounded-full uppercase tracking-widest text-xs hover:opacity-90 font-medium">Envoyer</button>
            </div>
          </RevealSection>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-white/8 py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div>
            <h4 className="text-xl tracking-[0.4em] font-light">ASCEND</h4>
            <p className="text-white/30 mt-2 text-xs tracking-widest uppercase">Seasons change, so do you.</p>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-white/35">
            {["Instagram", "TikTok", "Conditions", "Privacy"].map((link) => (
              <a key={link} href="#" className="hover:text-white/70 transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2025 ASCEND. Tous droits réservés.</p>
        </div>
      </footer>
      <style>{`
        @keyframes slowZoom { from { transform: scale(1.05); } to { transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
