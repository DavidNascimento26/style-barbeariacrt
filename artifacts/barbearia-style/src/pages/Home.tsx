import React, { useState, useEffect, FormEvent } from "react";
import {
  Menu, X, ChevronLeft, ChevronRight,
  Scissors, Star, MapPin, Clock, ChevronDown,
  Wind, ThumbsUp, Shield, Award, Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { GiRazor, GiComb } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/* ── Assets — somente carrossel + logo ─────────────────────────── */
import logoImg      from "@assets/1775022236418_1775060421717.jpg";
import allanImg     from "@assets/1775022564429_1775060421874.jpg";
import interior2Img from "@assets/1775016890364_1775018104035.jpg";
import interior3Img from "@assets/1775016763586_1775021492367.jpg";

/* ── Slides com alt descritivo (SEO + acessibilidade) ────────────── */
const HERO_SLIDES = [
  { src: allanImg,     alt: "Allan, barbeiro da Barbearia Style, segurando a máquina de corte no ambiente da barbearia em Campina Grande" },
  { src: interior2Img, alt: "Interior da Barbearia Style com decoração vintage, cartazes retrô e parede de madeira" },
  { src: interior3Img, alt: "Ambiente completo da Barbearia Style com cadeira de barbeiro e sofá de espera no bairro Dinamérica" },
];

/* ── Serviços — lista única ──────────────────────────────────────── */
const SERVICES = [
  { id: "corte-degrade",  name: "Corte Degradê",  price: "R$ 30", Icon: Scissors,
    desc: "Fade preciso e moderno que realça o contorno e dá leveza ao visual." },
  { id: "barba-terapia",  name: "Barba Terapia",   price: "R$ 25", Icon: GiRazor,
    desc: "Navalha afiada, produtos hidratantes e acabamento impecável." },
  { id: "corte-classico", name: "Corte Clássico",  price: "R$ 25", Icon: GiComb,
    desc: "Tesoura e pente com maestria — o estilo atemporal que nunca sai de moda." },
];

/* ── Atalho de slugify ───────────────────────────────────────────── */
function slugify(s: string) {
  return s.toLowerCase()
    .replace(/ç/g, "c").replace(/ã/g, "a").replace(/ó/g, "o")
    .replace(/é/g, "e").replace(/í/g, "i").replace(/ú/g, "u");
}

/* ── Classes reutilizáveis ───────────────────────────────────────── */
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold " +
  "rounded-sm uppercase tracking-widest transition-all duration-200 " +
  "hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_28px_rgba(212,175,55,0.55)] " +
  "active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold " +
  "rounded-sm uppercase tracking-widest transition-all duration-200 " +
  "hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] " +
  "active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/* ── Constante de espaçamento de seção uniforme ──────────────────── */
const SECTION_PY = "py-20 md:py-28";

export default function Home() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide,   setCurrentSlide]   = useState(0);
  const [nome,    setNome]    = useState("");
  const [servico, setServico] = useState("");
  const [data,    setData]    = useState("");
  const [hora,    setHora]    = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const nextSlide = () => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide(p => (p === 0 ? HERO_SLIDES.length - 1 : p - 1));

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!nome || !servico || !data || !hora) {
      alert("Por favor, preencha todos os campos antes de confirmar.");
      return;
    }
    try {
      const dateFormatted = format(parseISO(data), "dd/MM/yyyy", { locale: ptBR });
      const svc = SERVICES.find(s => s.id === servico);
      const msg = [
        "✂️ *NOVO AGENDAMENTO — Barbearia Style*",
        "",
        `👤 *Nome:*    ${nome}`,
        `💈 *Serviço:* ${svc?.name ?? servico} (${svc?.price ?? ""})`,
        `📅 *Data:*    ${dateFormatted}`,
        `🕐 *Hora:*    ${hora}`,
        "",
        "_Aguardo confirmação. Obrigado!_ 🙏",
      ].join("\n");
      window.open(`https://wa.me/5583987830277?text=${encodeURIComponent(msg)}`, "_blank");
    } catch {
      alert("Data inválida. Verifique a data informada.");
    }
  };

  const NAV_ITEMS = ["Serviços", "Sobre", "Localização", "Agendar"];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/96 backdrop-blur-md shadow-lg py-3 border-b border-primary/20"
            : "bg-gradient-to-b from-black/65 to-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo — Barbearia Style"
            className="font-heading font-extrabold text-primary text-base sm:text-lg md:text-xl tracking-widest uppercase transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            data-testid="header-brand"
          >
            Barbearia Style
          </button>

          {/* Nav desktop */}
          <nav aria-label="Menu principal" className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(slugify(item))}
                className="text-white/80 hover:text-primary transition-colors duration-200 uppercase tracking-wider text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("agendar")}
              className={`${BTN_PRIMARY} text-xs px-4 py-2`}
            >
              Reservar
            </button>
          </nav>

          {/* Hambúrguer — mobile */}
          <button
            className="md:hidden text-primary p-1.5 rounded-sm transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Dropdown mobile */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu mobile"
            className="md:hidden absolute top-full left-0 right-0 bg-background/97 backdrop-blur-xl border-b border-border/50 shadow-2xl py-5 px-5 flex flex-col gap-1 animate-in slide-in-from-top-2"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(slugify(item))}
                className="text-left text-sm font-semibold text-white hover:text-primary transition-colors duration-200 py-3 border-b border-border/20 last:border-0 focus-visible:outline-none"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("agendar")}
              className={`${BTN_PRIMARY} w-full mt-3 py-3 text-sm`}
            >
              <FaWhatsapp size={17} /> Reservar Agora
            </button>
          </nav>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO — carrossel + logo circular
      ══════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Barbearia Style — carrossel de fotos do ambiente"
        className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {HERO_SLIDES.map(({ src, alt }, i) => (
          <div
            key={i}
            aria-hidden={i !== currentSlide}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Logo centralizada — borda prata metálica */}
        <div className="relative z-20 flex justify-center w-full px-4" style={{ marginTop: "72px" }}>
          <div
            aria-label="Logo Allan Style Barbearia"
            role="img"
            style={{
              width: "clamp(130px, 22vw, 160px)",
              height: "clamp(130px, 22vw, 160px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #C0C0C0",
              outline: "1.5px solid rgba(192,192,192,0.3)",
              outlineOffset: "4px",
              boxShadow:
                "0 0 0 1.5px rgba(192,192,192,0.2), " +
                "0 0 24px rgba(212,175,55,0.6), " +
                "0 0 60px rgba(212,175,55,0.2)",
              flexShrink: 0,
            }}
            data-testid="logo-central"
          >
            <img
              src={logoImg}
              alt="Logomarca Allan Style Barbearia — medalha circular metálica dourada"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center mt-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <p className="text-primary text-[11px] sm:text-sm font-semibold uppercase tracking-[0.28em] mb-3">
            Dinamérica · Campina Grande — PB
          </p>
          <h1 className="font-heading font-black text-[2.4rem] sm:text-5xl md:text-7xl text-white mb-5 uppercase tracking-tighter drop-shadow-lg leading-[1.05]">
            O Estilo que <br />
            <span className="text-primary">Define Você</span>
          </h1>
          <p className="text-sm sm:text-xl text-white/85 mb-8 max-w-lg mx-auto font-light drop-shadow-md leading-relaxed px-2">
            A melhor experiência em corte e barba de Campina Grande
          </p>
          <button
            onClick={() => scrollTo("agendar")}
            className={`${BTN_PRIMARY} text-sm sm:text-base px-7 sm:px-10 py-4`}
            data-testid="hero-cta"
          >
            RESERVAR MEU HORÁRIO
          </button>
        </div>

        {/* Setas carrossel */}
        <button
          onClick={prevSlide}
          aria-label="Foto anterior"
          className="hidden md:flex absolute left-5 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Próxima foto"
          className="hidden md:flex absolute right-5 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-primary border border-white/15 hover:border-primary text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div role="tablist" aria-label="Navegar entre fotos" className="absolute bottom-7 left-0 right-0 flex justify-center gap-2.5 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`Foto ${i + 1}`}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none ${
                i === currentSlide ? "bg-primary w-7" : "bg-white/30 w-2 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SOBRE NÓS
      ══════════════════════════════════════════════════════════════ */}
      <section id="sobre" aria-labelledby="sobre-heading" className={`${SECTION_PY} bg-background`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">

          <div className="w-16 h-[3px] bg-primary mb-5 rounded-full" />
          <h2 id="sobre-heading" className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Sobre Nós
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
            Com nota <strong className="text-primary font-bold">4.8 ⭐ no Google Maps</strong>, a{" "}
            <strong className="text-white">Barbearia Style</strong> é referência no bairro{" "}
            <strong className="text-white">Dinamérica</strong>, em Campina Grande — PB.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
            Fundada com o propósito de oferecer cortes precisos e atendimento de excelência, nossa barbearia
            une técnica apurada e um ambiente acolhedor para que você saia sempre do jeito que imaginou —
            ou ainda melhor.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-12">
            Cada detalhe foi pensado para proporcionar conforto: do sofá à cadeira de barbeiro, passando
            pelo atendimento individual e personalizado que só a Barbearia Style oferece na região.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { Icon: Star,     value: "4.8 ★",      label: "Google Maps"        },
              { Icon: Wind,     value: "Climatizado", label: "Ambiente"           },
              { Icon: ThumbsUp, value: "+500",        label: "Clientes Atendidos" },
              { Icon: Shield,   value: "Higiene",     label: "Total"              },
              { Icon: Award,    value: "Qualidade",   label: "Garantida"          },
              { Icon: Users,    value: "Ter–Sáb",     label: "Atendimento"        },
            ].map(({ Icon, value, label }, i) => (
              <div
                key={i}
                className="bg-card border border-primary/25 rounded-xl p-4 text-center
                  transition-all duration-200 hover:border-primary hover:scale-[1.03]
                  hover:shadow-[0_4px_20px_rgba(212,175,55,0.12)] group flex flex-col items-center gap-2
                  shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                <Icon size={17} className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                <div className="text-sm sm:text-base font-heading font-bold text-white leading-snug break-words w-full text-center">
                  {value}
                </div>
                <div className="text-primary text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NOSSOS SERVIÇOS — seção única
      ══════════════════════════════════════════════════════════════ */}
      <section id="servicos" aria-labelledby="servicos-heading" className={`${SECTION_PY} bg-[#0d0d0d]`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">

          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-[3px] bg-primary mx-auto mb-5 rounded-full" />
            <h2 id="servicos-heading" className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3">
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
              Cada corte executado com precisão, cuidado e atenção ao detalhe — do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {SERVICES.map(({ id, name, price, Icon, desc }) => (
              <article
                key={id}
                className="group bg-card border border-primary/30 rounded-2xl p-8 sm:p-9 text-center
                  transition-all duration-300
                  shadow-[0_4px_24px_rgba(0,0,0,0.45)]
                  hover:-translate-y-2 hover:border-primary
                  hover:shadow-[0_12px_40px_rgba(212,175,55,0.18),_0_4px_24px_rgba(0,0,0,0.5)]"
                data-testid={`service-card-${id}`}
              >
                <div
                  className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/45 flex items-center justify-center mx-auto mb-6 text-primary
                    group-hover:bg-primary/20 group-hover:border-primary group-hover:scale-110 transition-all duration-300"
                  aria-hidden="true"
                >
                  <Icon size={28} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{desc}</p>
                <div className="text-3xl sm:text-4xl font-light text-primary font-heading mb-6">{price}</div>
                <button
                  onClick={() => { setServico(id); scrollTo("agendar"); }}
                  className="text-xs border border-primary/35 text-primary/75 px-5 py-2 rounded-sm
                    transition-all duration-200
                    hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-105
                    active:scale-95 uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-testid={`service-book-${id}`}
                >
                  Agendar este serviço
                </button>
              </article>
            ))}
          </div>

          {/* Diferenciais */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { title: "Sem Espera",          desc: "Agendamento rápido e simples pelo WhatsApp"    },
              { title: "Produtos Premium",     desc: "Usamos apenas produtos de alta qualidade"      },
              { title: "Resultado Garantido",  desc: "Saia com o visual exato que você imaginou"     },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-2">
                <div className="w-8 h-[2px] bg-primary rounded-full" />
                <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider">{title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AGENDAMENTO
      ══════════════════════════════════════════════════════════════ */}
      <section id="agendar" aria-labelledby="agendar-heading" className={`${SECTION_PY} bg-background`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
          <div className="bg-card border-2 border-primary/40 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-28 -right-28 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10">
              <div className="text-center mb-8 md:mb-10">
                <div className="w-14 h-[3px] bg-primary mx-auto mb-5 rounded-full" />
                <h2 id="agendar-heading" className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  Agende seu Horário
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Preencha e confirme via WhatsApp em segundos
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4 sm:space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                  <div className="space-y-1.5">
                    <label htmlFor="input-nome" className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      Nome Completo
                    </label>
                    <input
                      id="input-nome"
                      type="text" value={nome} onChange={e => setNome(e.target.value)}
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      className="w-full bg-input border border-border focus:border-primary rounded-md px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-muted-foreground/40 text-sm"
                      data-testid="input-nome"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="input-servico" className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      Serviço
                    </label>
                    <div className="relative">
                      <select
                        id="input-servico"
                        value={servico} onChange={e => setServico(e.target.value)}
                        className="w-full bg-input border border-border focus:border-primary rounded-md px-4 py-3 text-white outline-none transition-colors duration-200 appearance-none text-sm"
                        data-testid="input-servico"
                      >
                        <option value="" disabled>Selecione um serviço...</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.name} — {s.price}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="input-data" className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      Data
                    </label>
                    <input
                      id="input-data"
                      type="date" value={data} onChange={e => setData(e.target.value)}
                      className="w-full bg-input border border-border focus:border-primary rounded-md px-4 py-3 text-white outline-none transition-colors duration-200 text-sm"
                      data-testid="input-data"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="input-hora" className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      Hora
                    </label>
                    <input
                      id="input-hora"
                      type="time" value={hora} onChange={e => setHora(e.target.value)}
                      className="w-full bg-input border border-border focus:border-primary rounded-md px-4 py-3 text-white outline-none transition-colors duration-200 text-sm"
                      data-testid="input-hora"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`${BTN_PRIMARY} w-full text-sm sm:text-base py-4 mt-2 rounded-md`}
                  data-testid="btn-submit-booking"
                >
                  <FaWhatsapp size={20} aria-hidden="true" />
                  CONFIRMAR AGENDAMENTO
                </button>

                <p className="text-center text-muted-foreground/45 text-[11px] mt-1 leading-relaxed">
                  Funcionamento: Terça a Sábado · 08:30 às 19:30<br />
                  Segunda e Domingo: Fechado
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LOCALIZAÇÃO
      ══════════════════════════════════════════════════════════════ */}
      <section id="localizacao" aria-labelledby="localizacao-heading" className={`${SECTION_PY} border-t border-border/30`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">

          <div className="text-center mb-12 md:mb-16">
            <div className="w-14 h-[3px] bg-primary mx-auto mb-5 rounded-full" />
            <h2 id="localizacao-heading" className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Localização
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border/40 shadow-2xl">

            <div className="bg-card p-7 sm:p-10 md:p-12 flex flex-col justify-center gap-6">

              <address className="not-italic flex items-start gap-4">
                <div className="w-11 h-11 min-w-[44px] rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/25" aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm">Endereço</h3>
                  <p className="text-muted-foreground text-sm">Dinamérica, Campina Grande — PB, 58430-050</p>
                </div>
              </address>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 min-w-[44px] rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/25" aria-hidden="true">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm">Horário de Funcionamento</h3>
                  <p className="text-muted-foreground text-sm">Terça a Sábado: <strong className="text-white">08:30 às 19:30</strong></p>
                  <p className="text-red-400/75 text-xs mt-0.5">Segunda e Domingo: Fechado</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 min-w-[44px] rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/25" aria-hidden="true">
                  <Star size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm">Avaliação</h3>
                  <p className="text-primary font-semibold">⭐ 4.8 no Google Maps</p>
                </div>
              </div>

              <div className="pt-5 border-t border-border/35">
                <a
                  href="https://wa.me/5583987830277"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar com a Barbearia Style pelo WhatsApp"
                  className="flex items-center justify-center w-full gap-3 bg-[#25D366] text-white font-bold py-4 rounded-md
                    transition-all duration-200 hover:bg-[#1fbe5c] hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(37,211,102,0.35)]
                    active:scale-[0.98] text-sm"
                  data-testid="link-whatsapp-location"
                >
                  <FaWhatsapp size={21} aria-hidden="true" /> FALE CONOSCO NO WHATSAPP
                </a>
              </div>
            </div>

            <div className="h-[340px] sm:h-[380px] lg:h-auto min-h-[340px]">
              <iframe
                src="https://maps.google.com/maps?q=Barbearia+Style+Dinam%C3%A9rica+Campina+Grande+PB&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                title="Mapa de localização da Barbearia Style no bairro Dinamérica, Campina Grande PB"
                aria-label="Mapa do Google mostrando a Barbearia Style na Dinamérica"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer role="contentinfo" className="bg-[#080808] border-t-2 border-primary/55 pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-7 mb-10">
            <div className="text-center md:text-left">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-primary tracking-widest uppercase">
                Barbearia Style
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Dinamérica · Campina Grande, PB</p>
              <p className="text-muted-foreground/45 text-xs mt-0.5">⭐ 4.8 no Google Maps</p>
            </div>
            <nav aria-label="Links do rodapé" className="flex flex-wrap justify-center gap-5 sm:gap-7">
              {["Serviços", "Sobre", "Agendar"].map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(slugify(item))}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-5 border-t border-white/6 text-center">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Barbearia Style. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Flutuante ─────────────────────────────────────── */}
      <a
        href="https://wa.me/5583987830277"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enviar mensagem para a Barbearia Style pelo WhatsApp"
        style={{ width: 56, height: 56, animation: "pulse-wa 2.8s ease-in-out infinite" }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl
          hover:bg-[#1fbe5c] hover:scale-110 active:scale-95 transition-all duration-200"
        data-testid="whatsapp-float-button"
      >
        <FaWhatsapp size={28} aria-hidden="true" />
      </a>

      <style>{`
        @keyframes pulse-wa {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,.5); }
          55%      { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
      `}</style>
    </div>
  );
}
