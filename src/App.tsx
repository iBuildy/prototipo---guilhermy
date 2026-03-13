import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Brain,
  Target,
  Zap,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Music2, // Using Music2 for TikTok
  Clock,
  ShieldCheck,
  Menu,
  X,
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    {subtitle && (
      <span className="text-[#FFE100] font-display font-semibold text-sm uppercase tracking-widest mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
      {children}
    </h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-[#FFE100] transition-colors"
      >
        <span className="text-lg font-display font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BOOKING_CONFIG = {
  // Option: WhatsApp Direct (Zero friction, high conversion)
  booking: 'https://wa.me/554797066007?text=Olá%20Guilhermy!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20estratégica.',
  whatsapp: 'https://wa.me/554797066007?text=Olá%20Guilhermy!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20tirar%20uma%20dúvida.',
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  const handleBooking = () => {
    window.open(BOOKING_CONFIG.booking, '_blank');
  };

  const handleWhatsApp = () => {
    window.open(BOOKING_CONFIG.whatsapp, '_blank');
  };

  const testimonials = [
    {
      name: "Rafael Carneiro",
      role: "Empresário & Creator",
      text: "O Guilhermy entende a pressão de quem vive do digital. Em poucas sessões, consegui reorganizar minha rotina e parar de me sentir culpado por descansar."
    },
    {
      name: "Mariana Silva",
      role: "Infoprodutora",
      text: "Terapia para quem escala não pode ser lenta. O método direto dele me ajudou a tomar decisões mais lúcidas no meu lançamento."
    },
    {
      name: "Lucas Mendes",
      role: "Gestor de Tráfego",
      text: "Minha ansiedade estava impactando meu faturamento. Hoje tenho clareza e foco total no que realmente importa."
    },
    {
      name: "Ana Clara",
      role: "Content Creator",
      text: "Finalmente alguém que entende o que é a pressão de uma audiência de 500k pessoas. Me sinto muito mais segura e focada."
    },
    {
      name: "Roberto S.",
      role: "Gestor de Tráfego",
      text: "Parei de procrastinar tarefas críticas. O método é direto ao ponto e muito prático para quem não tem tempo a perder."
    },
    {
      name: "Fernando Costa",
      role: "Especialista em Vendas",
      text: "Eu estava à beira de um burnout com tantos lançamentos seguidos. A terapia focada me deu ferramentas práticas para blindar minha mente."
    },
    {
      name: "Juliana Martins",
      role: "Copywriter",
      text: "O bloqueio criativo estava me destruindo. Entender como minha mente funciona sob pressão mudou completamente meu jogo no trabalho."
    },
    {
      name: "Thiago Oliveira",
      role: "CEO de Agência",
      text: "Gerir uma equipe grande no remoto é solitário. O suporte de elite com o Guilhermy é meu porto seguro para decisões estratégicas."
    },
    {
      name: "Camila Rocha",
      role: "Estrategista Digital",
      text: "Eu não tinha tempo para terapias tradicionais lentas. O Guilhermy entregou resultados reais para minha sobrecarga mental desde o primeiro mês."
    },
    {
      name: "Bruno Albuquerque",
      role: "E-commerce",
      text: "Passei a lucrar mais quando entendi que investir na minha saúde mental não era gasto, mas sim o maior investimento pra escalar a empresa."
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isTestimonialPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isTestimonialPaused, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#FFE100]/30 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFE100] rounded-lg flex items-center justify-center font-display font-extrabold text-black text-xs">GJ</div>
            <span className="font-display font-bold text-xl tracking-tighter">@psicologododigital</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Dores', 'Método', 'Sobre', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={handleBooking}
              className="bg-[#FFE100] hover:bg-[#FFD700] text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-[#FFE100]/20"
            >
              Agendar Agora
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Dores', 'Método', 'Sobre', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-display font-bold text-white"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={handleBooking}
                className="bg-[#FFE100] text-black px-8 py-4 rounded-full text-lg font-bold mt-4"
              >
                Agendar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFE100]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFE100]/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE100]/10 border border-[#FFE100]/20 text-[#FFE100] text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" /> Foco em Alta Performance
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 text-gradient">
              O Suporte de <span className="text-[#FFE100] italic">Elite</span> para quem escala o Digital.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
              Proteja o seu maior ativo: sua mente. Terapia estratégica para empresários, creators e players que buscam alta performance sem burnout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBooking}
                className="bg-[#FFE100] hover:bg-[#FFD700] text-black px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-[#FFE100]/20"
              >
                Agendar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('método')}
                className="px-8 py-4 rounded-full text-lg font-bold border border-white/10 hover:bg-white/5 transition-all text-center"
              >
                Conhecer o Método
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/68.jpg"
                ].map((url, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={url} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>+200 profissionais digitais atendidos</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-t from-[#332B00]/40 to-black relative group">
                <img
                  src="https://ugc.production.linktr.ee/aa621d04-79a7-49fb-af3c-edc7618872c9_IMG-3825.jpeg"
                  alt="Guilhermy Joseph"
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-2xl">
                  <p className="text-xs font-bold text-[#FFE100] uppercase tracking-widest mb-1">Psicólogo do Digital</p>
                  <p className="text-lg font-display font-bold">Guilhermy Joseph</p>
                  <p className="text-xs text-gray-400">CRP 12/17648</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFE100]/20 blur-2xl rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFE100]/10 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </header>

      {/* Pain Points Section */}
      <section id="dores" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="O Custo da Performance">Você se identifica com isso?</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-[#FFE100]" />,
                title: "Procrastinação Crônica",
                desc: "Você sabe o que precisa ser feito, mas a paralisia te impede de começar, gerando um ciclo infinito de culpa."
              },
              {
                icon: <Brain className="w-8 h-8 text-[#FFE100]" />,
                title: "Overthinking Digital",
                desc: "O excesso de informação e a comparação constante nas redes drenam sua energia antes mesmo do dia começar."
              },
              {
                icon: <Zap className="w-8 h-8 text-[#FFE100]" />,
                title: "Sintomas de Burnout",
                desc: "A sensação de que você nunca faz o suficiente, mesmo trabalhando 12h por dia. O corpo está pedindo socorro."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl glass-card border-white/5 hover:border-[#FFE100]/30 transition-all"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="método" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid gap-6">
                {[
                  {
                    title: "Foco Clínico em Performance",
                    desc: "Não é apenas terapia tradicional. É psicologia aplicada à realidade de quem escala negócios e cria conteúdo."
                  },
                  {
                    title: "Gestão de Ansiedade e Stress",
                    desc: "Ferramentas práticas para lidar com lançamentos, prazos e a pressão da audiência."
                  },
                  {
                    title: "Resgate da Rotina Saudável",
                    desc: "Construção de hábitos que sustentam o sucesso a longo prazo, sem sacrificar sua saúde física e mental."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-[#FFE100] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[#FFE100] font-display font-semibold text-sm uppercase tracking-widest mb-4 block">A Solução</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Um método desenhado para a <span className="text-[#FFE100] italic">sua realidade.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                O mercado digital não dorme, mas você precisa. Meu acompanhamento une a profundidade da psicologia clínica com o dinamismo que o seu negócio exige.
              </p>
              <button
                onClick={handleBooking}
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#FFE100] transition-all"
              >
                Agendar Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Processo de Elite">Como funciona o Jornada?</SectionTitle>

          <div className="grid md:grid-cols-3 gap-12 relative mt-16">
            {[
              {
                step: "01",
                title: "Diagnóstico de Performance",
                desc: "Identificamos os gargalos mentais que estão travando sua produtividade e saúde emocional."
              },
              {
                step: "02",
                title: "Intervenção Estratégica",
                desc: "Aplicamos técnicas de terapia cognitivo-comportamental focadas na realidade do mercado digital."
              },
              {
                step: "03",
                title: "Manutenção de Elite",
                desc: "Acompanhamento contínuo para garantir que você mantenha o topo sem comprometer sua qualidade de vida."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group cursor-default">
                <div className="text-7xl font-display font-black text-[#FFE100] opacity-20 group-hover:opacity-100 transition-all duration-500 mb-4">
                  {item.step}
                </div>
                <h3 className="text-[#FFE100] text-xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-[#FFE100]/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white/5 relative z-10">
              <img
                src="https://ugc.production.linktr.ee/aa621d04-79a7-49fb-af3c-edc7618872c9_IMG-3825.jpeg"
                alt="Guilhermy Joseph"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FFE100]/5 blur-[100px] rounded-full" />
          </div>
          <div>
            <SectionTitle subtitle="O Especialista">Guilhermy Joseph</SectionTitle>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Sou Psicólogo (CRP 12/17648) e dedico minha carreira a entender as nuances do comportamento humano no ambiente digital.
              </p>
              <p>
                Entendo que o seu "CNPJ" só prospera se o "CPF" estiver saudável. Minha missão é ser o suporte estratégico para que você possa performar no topo, sem perder a essência e a saúde no caminho.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="https://instagram.com/psicologododigital" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFE100] hover:border-[#FFE100] transition-all group">
                  <Instagram className="w-5 h-5 group-hover:text-black" />
                </a>
                <a href="https://www.linkedin.com/in/guilhermy-joseph-evaristo-costa-28a78511b/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFE100] hover:border-[#FFE100] transition-all group">
                  <Linkedin className="w-5 h-5 group-hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 overflow-hidden bg-black/50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <SectionTitle subtitle="Resultados Reais">O que dizem os mentorados</SectionTitle>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <div
            className="relative"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
            onTouchStart={() => setIsTestimonialPaused(true)}
            onTouchEnd={() => setIsTestimonialPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="p-8 md:p-12 rounded-3xl glass-card border border-white/5 bg-black flex flex-col justify-center min-h-[350px]">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-5 h-5 text-[#FFE100] fill-[#FFE100]" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-8 leading-relaxed text-lg md:text-xl">"{testimonials[currentTestimonialIndex].text}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-14 h-14 rounded-full bg-[#FFE100]/10 flex items-center justify-center font-bold text-[#FFE100] border border-[#FFE100]/20 text-xl">
                        {testimonials[currentTestimonialIndex].name[0]}
                      </div>
                      <div className="text-left">
                        <p className="font-display font-bold text-lg text-white">{testimonials[currentTestimonialIndex].name}</p>
                        <p className="text-sm text-gray-500">{testimonials[currentTestimonialIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-[#FFE100] rounded-full flex items-center justify-center text-black z-10 shadow-lg hover:bg-white transition-colors border-2 border-black focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-[#FFE100] rounded-full flex items-center justify-center text-black z-10 shadow-lg hover:bg-white transition-colors border-2 border-black focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonialIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none ${currentTestimonialIndex === idx ? 'bg-[#FFE100]' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle subtitle="Dúvidas Frequentes">Transparência Total</SectionTitle>
          <div className="mt-12">
            <FAQItem
              question="Como funciona a primeira sessão?"
              answer="A primeira sessão é um momento de acolhimento e diagnóstico. Vamos entender suas principais travas, rotina e objetivos para desenhar um plano terapêutico personalizado."
            />
            <FAQItem
              question="As sessões são online?"
              answer="Sim, todos os atendimentos são realizados via videoconferência em uma plataforma segura e sigilosa, permitindo que você faça sua terapia de qualquer lugar do mundo."
            />
            <FAQItem
              question="Qual a duração do tratamento?"
              answer="A psicologia não é uma ciência exata, mas meu foco é em resultados. O tempo varia conforme a demanda, mas muitos pacientes relatam melhoras significativas na gestão de ansiedade e foco nas primeiras 4 a 8 semanas."
            />
            <FAQItem
              question="Você atende convênios?"
              answer="Atendo apenas na modalidade particular para garantir a exclusividade e qualidade do acompanhamento. No entanto, emito recibos para que você possa solicitar reembolso junto ao seu plano de saúde."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FFE100]/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Pronto para retomar o <span className="text-[#FFE100]">controle</span> da sua mente?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Não espere o burnout chegar para agir. O próximo nível do seu negócio exige um novo nível de saúde mental.
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-[#FFE100] hover:bg-[#FFD700] text-black px-12 py-6 rounded-full text-xl font-bold transition-all shadow-2xl shadow-[#FFE100]/40 flex items-center justify-center gap-3 mx-auto group"
          >
            <MessageCircle className="w-6 h-6" /> Falar no WhatsApp
          </button>
          <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Atendimento 100% sigiloso e ético
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FFE100] rounded flex items-center justify-center font-display font-extrabold text-black text-[10px]">GJ</div>
            <span className="font-display font-bold text-lg tracking-tighter">@psicologododigital</span>
          </div>
          <div className="text-sm text-gray-500 text-center">
            <a href="https://ibuildy.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              © 2024 Guilhermy Joseph | Psicólogo do Digital by <span className="text-[#FFE100] font-bold hover:underline">iBuildy</span>
            </a>
            <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> CRP 12/17648
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com/psicologododigital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FFE100] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://tiktok.com/@psicologododigital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FFE100] transition-colors"><Music2 className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/guilhermy.joseph" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FFE100] transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="https://www.youtube.com/@guilhermy.joseph" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FFE100] transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/guilhermy-joseph-evaristo-costa-28a78511b/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FFE100] transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
