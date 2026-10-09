import { ShoppingCart, Star, ShieldCheck, ArrowRight, PenTool, X, ChevronLeft, ChevronRight, MessageCircle, ChevronDown, Sparkles, Ghost, Flame } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const faqs = [
  {
    icon: "🎃",
    question: "Para quem é indicado o Manual Para Desenhar - Edição de Halloween?",
    answer: "O Manual é para todas as idades e níveis de experiência! Desde quem está dando os primeiros passos no desenho e quer se divertir criando personagens assustadoramente fofos, até quem já desenha e quer destravar seu repertório com monstros, abóboras, poções, fantasminhas e criaturas mágicas."
  },
  {
    icon: "⭐",
    question: "Quem comprar agora receberá as próximas atualizações?",
    answer: "Sim! Ao adquirir o Manual, você recebe gratuitamente todas as próximas atualizações, melhorias e novos elementos temáticos que forem acrescentados, sem precisar pagar nada a mais."
  },
  {
    icon: "📖",
    question: "O que vou encontrar dentro desta edição especial?",
    answer: "Você encontrará referências para criar rostos assustadoramente expressivos, olhinhos arrepiantes, bocas monstrífluas, cabelos estilosos, abóboras com diferentes caretas, fantasmas, poções, morcegos, criaturas místicas, cenários de Halloween e muito mais para combinar do seu próprio jeito!"
  },
  {
    icon: "🖨️",
    question: "Posso imprimir as páginas para desenhar?",
    answer: "Com certeza! As páginas foram diagramadas no formato A4 em alta resolução, perfeitas para imprimir, colorir, calcar, consultar na mesa ou montar seu próprio grimório criativo de desenhos."
  },
  {
    icon: "📱",
    question: "Como funciona o acesso após a compra?",
    answer: "Após a confirmação do pagamento, seu acesso é liberado instantaneamente. Você receberá um e-mail com todas as instruções e poderá consultar o material sempre que quiser no celular, tablet ou computador."
  }
];

const productImages = [
  "/images/imagem-01.webp",
  "/images/imagem-02.webp",
  "/images/imagem-03.webp",
  "/images/imagem-04.webp",
];

const testimonialImages = [
  "/images/testimonials/depo-01.webp",
  "/images/testimonials/depo-02.webp",
  "/images/testimonials/depo-03.webp",
  "/images/testimonials/depo-04.webp",
  "/images/testimonials/depo-05.webp",
  "/images/testimonials/depo-06.webp",
  "/images/testimonials/depo-07.webp"
];

// Spooky Hand-Drawn Spiderweb SVG (Clean, no creatures)
function SpiderWebDecor({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`pointer-events-none select-none opacity-40 text-[#c77dff] ${className}`} 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L90,90 M0,0 L45,95 M0,0 L95,45" />
      <path d="M20,0 Q18,18 0,20" />
      <path d="M40,0 Q36,36 0,40" />
      <path d="M60,0 Q54,54 0,60" />
      <path d="M80,0 Q72,72 0,80" />
      <path d="M100,0 Q90,90 0,100" />
    </svg>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [lightboxData, setLightboxData] = useState<{ index: number, type: 'product' | 'testimonial' } | null>(null);
  const [direction, setDirection] = useState(0);
  const [purchaseNotification, setPurchaseNotification] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.cakto.com.br/8oqdaiy_1129483");

  useEffect(() => {
    const checkoutBaseUrl = "https://pay.cakto.com.br/8oqdaiy_1129483";
    const allowedParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "utm_id",
      "sck",
      "xcod"
    ];

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const storedParamsRaw = sessionStorage.getItem("manual_utm_params");
      let storedParams = storedParamsRaw ? JSON.parse(storedParamsRaw) : {};
      
      const hasAnyAllowedParam = allowedParams.some(param => urlParams.has(param) && urlParams.get(param));

      if (hasAnyAllowedParam) {
        storedParams = {};
        allowedParams.forEach(param => {
          if (urlParams.has(param)) {
            const val = urlParams.get(param);
            if (val) {
              storedParams[param] = val;
            }
          }
        });
        sessionStorage.setItem("manual_utm_params", JSON.stringify(storedParams));
      }

      const newCheckoutUrl = new URL(checkoutBaseUrl);
      allowedParams.forEach(key => {
        if (storedParams[key]) {
          newCheckoutUrl.searchParams.set(key, storedParams[key]);
        }
      });

      setCheckoutUrl(newCheckoutUrl.toString());
    } catch (e) {
      console.error("Error setting UTM params", e);
    }
  }, []);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const names = [
      "Ana", "Paulo", "Maria", "João", "Pedro", "Lucas", "Julia", "Marcos", "Fernanda", "Gabriel", 
      "Luana", "Carlos", "Juliana", "Rafael", "Camila", "Rodrigo", "Amanda", "Diego", "Letícia", 
      "Bruno", "Carolina", "Thiago", "Beatriz", "Felipe", "Mariana", "Gustavo", "Renata", 
      "Leonardo", "Larissa", "Ricardo", "Vanessa", "Daniel", "Patricia"
    ];

    let timeoutId: NodeJS.Timeout;

    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setPurchaseNotification(`${randomName} comprou o Manual de Halloween`);

      // Hide after 3.2 seconds
      setTimeout(() => {
        setPurchaseNotification(null);
        
        // Schedule next one between 5 to 15 seconds
        const nextDelay = Math.floor(Math.random() * 10000) + 5000;
        timeoutId = setTimeout(showRandomNotification, nextDelay);
      }, 3200);
    };

    // Initial trigger
    const initialDelay = Math.floor(Math.random() * 8000) + 4000;
    timeoutId = setTimeout(showRandomNotification, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childElement = child as HTMLElement;
        const childCenter = (childElement.offsetLeft - container.offsetLeft) + childElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const targetScrollLeft = (child.offsetLeft - container.offsetLeft) + child.offsetWidth / 2 - container.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleTestimonialScroll = () => {
    if (testimonialRef.current) {
      const container = testimonialRef.current;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childElement = child as HTMLElement;
        const childCenter = (childElement.offsetLeft - container.offsetLeft) + childElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTestimonialIndex(closestIndex);
    }
  };

  const scrollToTestimonialImage = (index: number) => {
    if (testimonialRef.current) {
      const container = testimonialRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const targetScrollLeft = (child.offsetLeft - container.offsetLeft) + child.offsetWidth / 2 - container.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const paginate = (newDirection: number) => {
    if (lightboxData) {
      setDirection(newDirection);
      setLightboxData((prev) => {
        if (!prev) return null;
        const images = prev.type === 'product' ? productImages : testimonialImages;
        let next = prev.index + newDirection;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return { ...prev, index: next };
      });
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxData(null);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    if (lightboxData !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxData]);

  return (
    <div className="min-h-screen pb-20 selection:bg-[#ff7518] selection:text-[#0c0618] overflow-x-hidden relative text-[#f3e8ff]">
      
      {/* Decorative Atmospheric Corner Webs */}
      <SpiderWebDecor className="fixed top-0 left-0 w-28 h-28 md:w-44 md:h-44 z-0" />
      <div className="fixed top-0 right-0 w-28 h-28 md:w-44 md:h-44 z-0 rotate-90 scale-x-[-1] pointer-events-none">
        <SpiderWebDecor className="w-full h-full" />
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxData !== null && (() => {
          const currentImages = lightboxData.type === 'product' ? productImages : testimonialImages;
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0618]/95 backdrop-blur-md"
          >
            <button
              onClick={() => setLightboxData(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2.5 bg-[#1e0d38] rounded-full border-2 border-[#ff7518] shadow-[2px_2px_0px_0px_#ff7518] hover:bg-[#ff7518] hover:text-[#0c0618] text-[#f3e8ff] transition-all cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              className="absolute left-4 md:left-8 z-50 p-3 bg-[#1e0d38] rounded-full border-2 border-[#ff7518] shadow-[3px_3px_0px_0px_#9d4edd] hover:bg-[#ff7518] hover:text-[#0c0618] text-[#f3e8ff] transition-all hidden md:block cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={lightboxData.index}
                  src={currentImages[lightboxData.index]}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute max-h-[65vh] md:max-h-[85vh] max-w-[85vw] md:max-w-[75vw] object-contain rounded-2xl border-4 border-[#ff7518] shadow-[8px_8px_0px_0px_#9d4edd] cursor-grab active:cursor-grabbing pointer-events-auto bg-[#170d2c]"
                />
              </AnimatePresence>
            </div>

            <button
              className="absolute right-4 md:right-8 z-50 p-3 bg-[#1e0d38] rounded-full border-2 border-[#ff7518] shadow-[3px_3px_0px_0px_#9d4edd] hover:bg-[#ff7518] hover:text-[#0c0618] text-[#f3e8ff] transition-all hidden md:block cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Próximo"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Mobile Navigation Arrows */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 md:hidden z-50">
              <button
                className="p-3 bg-[#1e0d38] text-[#f3e8ff] rounded-full border-2 border-[#ff7518] shadow-[2px_2px_0px_0px_#9d4edd] active:bg-[#ff7518] active:text-[#0c0618]"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="p-3 bg-[#1e0d38] text-[#f3e8ff] rounded-full border-2 border-[#ff7518] shadow-[2px_2px_0px_0px_#9d4edd] active:bg-[#ff7518] active:text-[#0c0618]"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        );})()}
      </AnimatePresence>

      {/* Header with New Logo - No space on top, 15% smaller */}
      <header className="pt-0 pb-2 px-2 flex justify-center items-center relative z-10 w-full">
        <img 
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisOgoznULgXpPiOVJXvMGxHWKVlf_N7tKoW06SRx9uUaGiu6coT5Vm8GWtn6G-kxk-fXbkKBpgmyoNm__6HMnmC420ixk-D0wF3QgaerC0C6EFw_u2TmohQ3FpW-kZEzUG-mg4J_xe1vwKNFZYwM8hWmK-rzKJ0YlrwYZF8R6rWuJXCKSD9yJyhstijls/w640-h360/titulo%20bg%20final.png" 
          alt="Manual Para Desenhar - Edição de Halloween" 
          width={640}
          height={360}
          fetchPriority="high"
          decoding="async"
          className="w-full max-w-[260px] md:max-w-[340px] h-auto object-contain drop-shadow-[0_4px_20px_rgba(255,117,24,0.35)] animate-scale-soft"
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Product Carousel - Full width on Mobile and Tablet */}
        <div className="relative mb-12 -mx-4 md:-mx-8 lg:mx-auto lg:max-w-4xl">
           <div 
             ref={carouselRef}
             onScroll={handleScroll}
             className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 py-4 md:py-6 no-scrollbar px-4 md:px-8 lg:px-0 scroll-smooth"
           >
              {productImages.map((url, i) => (
               <div key={i} className="w-[85vw] max-w-[280px] md:w-[42vw] md:max-w-[320px] lg:w-full lg:max-w-none shrink-0 snap-center mx-auto flex justify-center relative hover:z-10">
                  <div 
                    className={`bg-[#190e32] p-2.5 md:p-3 border-4 border-[#ff7518] shadow-[5px_5px_0px_0px_#9d4edd] rounded-2xl w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${i % 2 === 0 ? 'rotate-1 hover:rotate-2' : '-rotate-1 hover:-rotate-2'}`}
                    onClick={() => setLightboxData({ index: i, type: 'product' })}
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={url} 
                        alt={`Preview do produto ${i + 1}`} 
                        width={480}
                        height={640}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        decoding="async"
                        className="w-full aspect-[3/4] object-cover rounded-xl border-2 border-dashed border-[#9d4edd]/50 pointer-events-none" 
                      />
                    </div>
                  </div>
               </div>
             ))}
           </div>
           
           <div className="flex lg:hidden items-center justify-center gap-2 mt-1 text-[#c77dff] text-sm">
             <span className="animate-pulse">👈</span> Deslize para espiar as páginas <span className="animate-pulse">👉</span>
           </div>
           
           <div className="flex lg:hidden justify-center gap-3 mt-3">
             {productImages.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => scrollToImage(i)}
                 aria-label={`Ver imagem ${i + 1}`}
                 className={`w-3.5 h-3.5 rounded-full border-2 border-[#ff7518] cursor-pointer transition-all ${activeIndex === i ? 'bg-[#ff7518] scale-125' : 'bg-[#190e32]'}`}
               />
             ))}
           </div>
        </div>

        {/* Short Description & Buy Section (Halloween Dark Hero Card) */}
        <section className="mb-12 bg-gradient-to-b from-[#1e0f39] to-[#160a2b] p-6 md:p-9 rounded-3xl border-4 border-[#ff7518] shadow-[7px_7px_0px_0px_#9d4edd] -rotate-1 relative z-10 max-w-3xl mx-auto overflow-visible">
          
          {/* Subtle Haunted Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#9d4edd]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#ff7518]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Top Rating with Pumpkin Glow Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-3 text-[#ff9233] drop-shadow-[0_0_8px_rgba(255,146,51,0.6)]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-current w-5 h-5 md:w-6 md:h-6 animate-scale-pulse" style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight text-center md:text-left text-[#ffffff]">
            Um Manual Para Destravar Sua Criatividade e Criar Desenhos <span className="text-[#ff7518] underline decoration-wavy decoration-[#9d4edd]">Assustadoramente Incríveis!</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-6 text-[#e9d5ff] opacity-95 text-center md:text-left leading-relaxed">
            Escolha formas, olhos misteriosos, bocas assustadoras, cabelos malucos, abóboras, fantasmas, poções, morcegos e centenas de outros elementos para criar ilustrações únicas de Halloween, mesmo que você nunca tenha desenhado!
          </p>

          {/* Pricing & CTA Box */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-[#251347]/90 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-[#ff7518]/60 shadow-[3px_3px_0px_0px_#0c0618] relative">
            <div className="flex flex-col items-center md:items-start shrink-0">
               <span className="line-through text-[#c4b5fd]/70 text-[18px] font-bold">De R$ 75,40</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-[34px] font-bold text-[#ff9233] drop-shadow-[0_0_12px_rgba(255,117,24,0.6)]">
                   Por R$ 27,90
                 </span>
               </div>
               <span className="text-xs text-[#c77dff] font-medium">Acesso vitalício + todas atualizações</span>
            </div>
            
            {/* CTA Button with 63% OFF badge */}
            <div className="relative w-full md:w-auto shrink-0 mt-2 sm:mt-0">
              <div className="absolute -top-3.5 -right-2 md:-right-3 z-20 pointer-events-none rotate-12">
                <span className="inline-block bg-[#ff7518] text-[#0c0618] text-xs md:text-sm font-black px-2.5 sm:px-3 py-1 rounded-full border-2 border-[#0c0618] shadow-[2px_2px_0px_0px_#9d4edd] animate-scale-pulse tracking-wide">
                  🎃 63% OFF
                </span>
              </div>

              <a 
                href={checkoutUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full md:w-auto bg-gradient-to-r from-[#ff7518] to-[#ff9233] hover:from-[#ff8800] hover:to-[#ffa64d] text-[#0c0618] text-lg md:text-xl font-black py-3.5 md:py-4 px-6 md:px-8 rounded-2xl border-4 border-[#0c0618] shadow-[5px_5px_0px_0px_#9d4edd] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#9d4edd] transition-all flex items-center justify-center gap-2.5 animate-shine cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle text-[#0c0618]" />
                <span className="text-center leading-tight whitespace-nowrap tracking-wide">QUERO O MANUAL</span>
              </a>
            </div>
          </div>
        </section>

        {/* Updates Highlight (Halloween Cauldron & Star Badge with Centered Content & Overlapping 100% Grátis) */}
        <section className="mb-12 max-w-3xl mx-auto relative">
          {/* Overlapping 100% Grátis Badge on Top Layer (outside overflow:hidden card) */}
          <div className="absolute -top-3.5 right-2 md:-top-4 md:right-4 z-30 pointer-events-none rotate-6">
            <span className="inline-block bg-[#ff7518] text-[#0c0618] text-xs md:text-sm font-black px-3 py-1 rounded-full border-2 border-[#0c0618] shadow-[2px_2px_0px_0px_#9d4edd] animate-scale-pulse tracking-wide">
              100% GRÁTIS
            </span>
          </div>

          <div className="bg-gradient-to-r from-[#29134a] via-[#35185e] to-[#29134a] p-6 md:p-8 rounded-3xl border-4 border-[#ff7518] shadow-[6px_6px_0px_0px_#9d4edd] flex flex-col items-center justify-center text-center gap-3 animate-shine rotate-1 hover:-rotate-1 transition-transform relative">
            <span className="text-5xl md:text-6xl animate-wiggle inline-block shrink-0 drop-shadow-[0_0_10px_rgba(255,146,51,0.5)]">
              🎃
            </span>
            
            <h3 className="text-2xl md:text-3xl font-bold text-[#ffffff]">
              Atualizações Vitalícias Sem Truques!
            </h3>
            
            <p className="text-lg md:text-xl text-[#e9d5ff] font-medium leading-relaxed max-w-xl">
              Você receberá todas as novas páginas, novos monstros e temas futuros <strong className="text-[#ff9233]">sem pagar nenhum centavo a mais</strong>.
            </p>
          </div>
        </section>

        {/* Long Description Sections */}
        <section className="mb-12 space-y-8 max-w-3xl mx-auto">
          
          {/* Para quem é este manual? */}
          <div className="bg-[#190e33] p-6 md:p-9 rounded-3xl border-4 border-[#9d4edd] shadow-[6px_6px_0px_0px_#ff7518] rotate-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-3 text-[#ffffff]">
              <span className="bg-[#ff7518] text-[#0c0618] p-2 rounded-xl border-3 border-[#0c0618] shadow-[2px_2px_0px_0px_#9d4edd] animate-wiggle inline-block text-xl">
                🧙‍♀️
              </span> 
              Para quem é este manual de Halloween?
            </h2>
            <ul className="space-y-4 text-lg md:text-xl text-[#e9d5ff]">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '0ms' }} />
                <span>Crianças, adolescentes e adultos que querem soltar a imaginação criando personagens divertidos e misteriosos.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '100ms' }} />
                <span>Quem ama o clima de Halloween, mas trava diante da folha em branco sem saber por onde começar.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '200ms' }} />
                <span>Para quem quer desenhar monstros, bruxas, poções e abóboras sem precisar inventar cada detalhe do zero.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '300ms' }} />
                <span>Aqueles que procuram traços simples, intuitivos e fáceis de observar e reproduzir no papel ou tablet.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '400ms' }} />
                <span>Para quem quer ter um acervo visual sempre à mão para rabiscar a qualquer hora.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#ff7518] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '500ms' }} />
                <span>Educadores e professores que conduzem oficinas criativas e buscam atividades temáticas envolventes para as aulas.</span>
              </li>
            </ul>
          </div>

          {/* O que você vai receber? */}
          <div className="bg-[#1b0d36] p-6 md:p-9 rounded-3xl border-4 border-[#ff7518] border-dashed shadow-[6px_6px_0px_0px_#9d4edd] -rotate-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 text-[#ffffff]">
              <PenTool className="w-8 h-8 text-[#ff9233] animate-wiggle" />
              O que você vai receber no seu grimório?
            </h2>
            <p className="text-lg md:text-xl mb-6 text-[#e9d5ff] leading-relaxed">
              Nada de teorias cansativas ou regras chatas! O Manual funciona como uma biblioteca visual mágica, cheia de referências ilustradas prontas para você misturar, combinar, adaptar e criar seus próprios desenhos com estilo.
            </p>
            <ul className="space-y-4 text-lg md:text-xl mb-4">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#ff7518] text-[#0c0618] border-2 border-[#0c0618] rounded-full font-black text-base shadow-[2px_2px_0px_0px_#9d4edd] animate-float" style={{ animationDelay: '0ms' }}>
                  1
                </span>
                <span className="text-[#f3e8ff]">
                  Centenas de olhos arrepiantes, bocas monstrífluas, cabelos espetados, abóboras expressivas, fantasmas fofos, chapéus de bruxa e poções mágicas!
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#9d4edd] text-white border-2 border-[#0c0618] rounded-full font-black text-base shadow-[2px_2px_0px_0px_#ff7518] animate-float" style={{ animationDelay: '200ms' }}>
                  2
                </span>
                <span className="text-[#f3e8ff]">
                  Um desafio temático de "Histórinha em Quadrinhos de Halloween" para você soltar o roteirista dentro de você!
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#ff9233] text-[#0c0618] border-2 border-[#0c0618] rounded-full font-black text-base shadow-[2px_2px_0px_0px_#9d4edd] animate-float" style={{ animationDelay: '400ms' }}>
                  3
                </span>
                <span className="text-[#f3e8ff]">
                  Um método leve e prático para transformar qualquer folha em branco em uma obra cheia de personalidade e diversão.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Video / Animated GIF Showcase */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#ffffff] flex items-center justify-center gap-2">
            <span className="animate-wiggle inline-block">📖</span>
            Veja o Manual em mãos!
            <span className="animate-wiggle inline-block">✨</span>
          </h2>
          
          <div className="relative bg-[#1a0d35] border-4 border-[#ff7518] rounded-3xl p-3.5 shadow-[8px_8px_0px_0px_#9d4edd] rotate-1 max-w-sm mx-auto">
            <picture>
              <source srcSet="/images/manual-animado.webp" type="image/webp" />
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEge-bYBSyOazpnBOFwSAL6YXSSbnRKwcfufY3gy02kb8_ZVTQX4PTJ-mgCySkXfF4m2o7_sN0unc9R0tN-EiBCoRnw5Tt2K6vSlVmc9ng_45lg3iJCXwFU6OsQCeSRUEfs2OddZ-FrfV_OqzWER9mtxPuwWsd4g5hyphenhyphenSzCWmcqkRKrn4NKu3UGNz1G7R0hQ/s0/novo%20gif%20manual%20(reduzindo).gif" 
                alt="Manual por dentro" 
                loading="lazy"
                decoding="async"
                width={480}
                height={641}
                className="w-full aspect-[3/4] object-cover border-4 border-dashed border-[#9d4edd] rounded-2xl" 
              />
            </picture>
            
            {/* Spooky Sketchy decorations */}
            <div className="absolute -top-6 -right-6 text-4xl animate-bounce">🎃</div>
            <div className="absolute -bottom-6 -left-6 text-4xl animate-wiggle inline-block">👻</div>
          </div>
        </section>

        {/* Intermediate Buy Button */}
        <div className="flex justify-center mb-14 px-2">
          <a 
            href={checkoutUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full max-w-sm bg-gradient-to-r from-[#9d4edd] to-[#b5179e] hover:from-[#aa58ea] hover:to-[#c726b0] text-white text-xl md:text-2xl font-bold py-3.5 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#0c0618] shadow-[5px_5px_0px_0px_#ff7518] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#ff7518] transition-all flex items-center justify-center gap-2 animate-shine cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle" />
            <span className="text-center leading-tight whitespace-nowrap">QUERO MEU MANUAL AGORA</span>
          </a>
        </div>

        {/* Depoimentos Recentes */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#ffffff] flex justify-center items-center gap-3">
             <span className="animate-wiggle inline-block">💜</span>
             O que diz quem já desenha com o Manual
             <span className="animate-wiggle inline-block">🎃</span>
          </h2>
          
          <div className="relative mb-12 -mx-4 md:-mx-8 lg:mx-auto lg:max-w-4xl">
             <div 
               ref={testimonialRef}
               onScroll={handleTestimonialScroll}
               className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 py-4 md:py-6 no-scrollbar px-4 md:px-8 lg:px-0 scroll-smooth"
             >
                {testimonialImages.map((url, i) => (
                 <div key={i} className="w-[85vw] max-w-[280px] md:w-[42vw] md:max-w-[320px] lg:w-full lg:max-w-none shrink-0 snap-center mx-auto flex justify-center relative hover:z-10">
                    <div 
                      className={`bg-[#1a0e33] p-2.5 md:p-3 border-4 border-[#9d4edd] shadow-[5px_5px_0px_0px_#ff7518] rounded-2xl w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${i % 2 === 0 ? 'rotate-1 hover:rotate-2' : '-rotate-1 hover:-rotate-2'}`}
                      onClick={() => setLightboxData({ index: i, type: 'testimonial' })}
                    >
                      <img 
                        src={url} 
                        alt={`Depoimento ${i + 1}`} 
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={640}
                        className="w-full aspect-[3/4] object-cover rounded-xl border-2 border-dashed border-[#ff7518]/40 pointer-events-none" 
                      />
                    </div>
                 </div>
               ))}
             </div>
             
             <div className="flex lg:hidden items-center justify-center gap-2 mt-1 text-[#c77dff] text-sm">
               <span className="animate-pulse">👈</span> Deslize para ver os depoimentos <span className="animate-pulse">👉</span>
             </div>
             
             <div className="flex lg:hidden justify-center gap-3 mt-3">
               {testimonialImages.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => scrollToTestimonialImage(i)}
                   aria-label={`Ver depoimento ${i + 1}`}
                   className={`w-3.5 h-3.5 rounded-full border-2 border-[#9d4edd] cursor-pointer transition-all ${activeTestimonialIndex === i ? 'bg-[#ff7518] scale-125' : 'bg-[#1a0e33]'}`}
                 />
               ))}
             </div>
          </div>
        </section>

        {/* Guarantee (Dark Halloween Cauldron Card) */}
        <section className="mb-12 max-w-3xl mx-auto">
           <div className="bg-gradient-to-br from-[#261044] via-[#1a0b31] to-[#120624] text-white p-6 md:p-10 rounded-[2.5rem] border-4 border-[#ff7518] shadow-[8px_8px_0px_0px_#9d4edd] flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff7518]/15 rounded-full -mr-16 -mt-16 blur-2xl"></div>
             
             <div className="p-4 bg-[#ff7518]/10 rounded-3xl border-2 border-[#ff7518] shadow-[3px_3px_0px_0px_#ff7518] shrink-0">
               <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-[#ff9233] animate-scale-pulse" />
             </div>
             
             <div className="relative z-10 text-center md:text-left">
               <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#ffffff]">
                  Garantia de 7 Dias Sem Medo
                </h3>
               <p className="text-lg md:text-xl text-[#e9d5ff] leading-relaxed">
                 Teste o Manual por 7 dias inteiros. Se você achar que ele não ajudou você a se divertir e destravar sua criatividade, basta pedir que devolvemos 100% do seu dinheiro. Sem pegadinhas, sem burocracia.
               </p>
             </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-14 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#ffffff] flex items-center justify-center gap-2">
            <span>Perguntas Frequentes</span>
            <span className="text-[#ff7518]">❓</span>
          </h3>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-[#170d2c] rounded-2xl border-4 transition-all overflow-hidden ${
                  openFaqIndex === index 
                    ? 'border-[#ff7518] shadow-[4px_4px_0px_0px_#9d4edd]' 
                    : 'border-[#2d1752] hover:border-[#9d4edd] shadow-[3px_3px_0px_0px_#0c0618]'
                }`}
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-bold text-lg md:text-xl cursor-pointer"
                >
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className="text-2xl md:text-3xl animate-wiggle inline-block shrink-0">{faq.icon}</span>
                    <span className="leading-tight text-[#ffffff]">{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-6 h-6 shrink-0 text-[#ff7518] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-5 pt-0 pl-14 md:pl-[4.5rem] text-[#e9d5ff] text-base md:text-lg leading-relaxed border-t border-dashed border-[#ff7518]/30 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Ready to draw section */}
        <section className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#ffffff]">
            Pronto para desenhar neste Halloween? 🎃
          </h2>
          <p className="text-lg md:text-xl text-[#c77dff] mb-6 max-w-md mx-auto">
            Pegue seu papel, caneta e solte os monstros e criaturas da sua imaginação!
          </p>
          <div className="flex justify-center px-2">
            <a 
              href={checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full max-w-sm bg-gradient-to-r from-[#ff7518] to-[#ff9233] hover:from-[#ff8800] hover:to-[#ffa64d] text-[#0c0618] text-xl md:text-2xl font-black py-3.5 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#0c0618] shadow-[5px_5px_0px_0px_#9d4edd] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#9d4edd] transition-all flex items-center justify-center gap-2 animate-shine cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle text-[#0c0618]" />
              <span className="text-center leading-tight whitespace-nowrap">QUERO MEU MANUAL</span>
            </a>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="mb-14 text-center max-w-md mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#ffffff]">Ainda tem dúvidas?</h3>
          <p className="text-base md:text-lg text-[#c4b5fd] mb-5">
            Fale direto comigo no WhatsApp e tire qualquer dúvida antes de comprar!
          </p>
          <div className="flex justify-center px-2">
            <a 
              href="https://wa.me/5519988508110?text=Ol%C3%A1!%20Vim%20do%20site%20do%20manual%20de%20Halloween.%20Tenho%20uma%20d%C3%BAvida." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full max-w-sm bg-[#25D366] hover:bg-[#1DA851] text-white text-xl font-bold py-3.5 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#0c0618] shadow-[5px_5px_0px_0px_#ff7518] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#ff7518] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
               <MessageCircle className="w-6 h-6 shrink-0 animate-wiggle" />
               <span className="text-center leading-tight whitespace-nowrap">Falar no WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Quem criou o Manual? */}
        <section className="mb-14 max-w-3xl mx-auto">
          <div className="bg-[#180c30] p-6 md:p-10 rounded-3xl border-4 border-[#ff7518] shadow-[7px_7px_0px_0px_#9d4edd] text-center relative overflow-hidden">
            
            <div className="absolute top-4 right-4 text-3xl opacity-30 pointer-events-none">🎨</div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-30 pointer-events-none">🦇</div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#ffffff]">
              Quem criou o Manual?
            </h2>

            <div className="flex justify-center mb-6">
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full shadow-[6px_6px_0px_0px_#ff7518] bg-[#271348] p-2 flex items-center justify-center">
                {/* Rotating dashed border in Halloween Orange */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-[#ff7518] border-dashed animate-spin-slow pointer-events-none"
                  aria-hidden="true"
                />
                <img
                  src="/images/ju.webp"
                  alt="Junior Launther - Criador do Manual"
                  className="w-full h-full object-cover rounded-full relative z-10 border-2 border-[#9d4edd]"
                  width={208}
                  height={208}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="space-y-4 text-lg md:text-xl text-[#e9d5ff] leading-relaxed max-w-2xl mx-auto">
              <p>
                Oi! Eu sou o Junior Launther, artista e criador do <strong className="font-bold text-[#ff9233] underline decoration-[#ff7518]">@ateliedoju</strong>. Compartilho minhas criações e ideias para despertar a criatividade, inclusive de quem acha que não nasceu com o dom do desenho!
              </p>
              <p>
                Estou há mais de 17 anos criando na internet e também produzo conteúdo para A Casa do Ju, somando mais de 350 mil seguidores. Esta <span className="text-[#ff9233] font-bold">Edição de Halloween</span> nasceu para trazer uma pitada mágica, divertida e misteriosa aos seus cadernos de desenho!
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Button with 63% OFF Badge */}
        <section className="mb-14 flex justify-center px-2">
          <div className="relative w-full max-w-sm">
            {/* Floating Offer Badge in Halloween Spooky Style */}
            <div className="absolute -top-4 -right-2 md:-right-3 z-20 pointer-events-none rotate-12">
              <span className="inline-block bg-[#ff7518] text-[#0c0618] text-xs md:text-sm font-black px-3 py-1 rounded-full border-2 border-[#0c0618] shadow-[2px_2px_0px_0px_#9d4edd] animate-scale-pulse tracking-wide">
                🎃 63% OFF
              </span>
            </div>

            <a 
              href={checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-gradient-to-r from-[#ff7518] to-[#ff9233] hover:from-[#ff8800] hover:to-[#ffa64d] text-[#0c0618] text-xl md:text-2xl font-black py-4 px-6 md:px-8 rounded-2xl border-4 border-[#0c0618] shadow-[5px_5px_0px_0px_#9d4edd] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#9d4edd] transition-all flex items-center justify-center gap-2.5 animate-shine cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle text-[#0c0618]" />
              <span className="text-center leading-tight whitespace-nowrap">COMPRAR AGORA</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-[#c4b5fd]/80 text-sm max-w-4xl mx-auto px-4 relative z-10">
        <div className="absolute top-0 left-1/4 right-1/4 h-1 border-t-2 border-dashed border-[#ff7518]/40"></div>

        <div className="flex justify-center mb-6 mt-8">
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisOgoznULgXpPiOVJXvMGxHWKVlf_N7tKoW06SRx9uUaGiu6coT5Vm8GWtn6G-kxk-fXbkKBpgmyoNm__6HMnmC420ixk-D0wF3QgaerC0C6EFw_u2TmohQ3FpW-kZEzUG-mg4J_xe1vwKNFZYwM8hWmK-rzKJ0YlrwYZF8R6rWuJXCKSD9yJyhstijls/w640-h360/titulo%20bg%20final.png" 
            alt="Manual Para Desenhar - Edição de Halloween" 
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="h-16 md:h-24 w-auto object-contain drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        <p className="mt-4 font-medium text-base text-[#ffffff]">
          🎃 Manual Para Desenhar - Edição Especial de Halloween 🎃
        </p>
        <p className="mt-1">Todos os direitos reservados - Ateliê do Ju</p>
        <p className="text-xs text-[#c4b5fd]/60 mt-1">CNPJ 51.041.767/0001-08</p>
      </footer>

      {/* Fake Purchase Notification (Halloween Themed) */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-[#1f0e3a] text-[#ffffff] px-5 py-3 rounded-2xl border-3 border-[#ff7518] shadow-[5px_5px_0px_0px_#0c0618] flex items-center gap-3 font-bold text-sm md:text-base pointer-events-none"
          >
            <div className="w-8 h-8 bg-[#ff7518] rounded-full flex items-center justify-center shrink-0 border border-[#0c0618]">
              <span className="text-base">🎃</span>
            </div>
            <span className="text-[#f3e8ff]">{purchaseNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
