import React, { useState, useEffect, useCallback } from 'react';
import { MonitorSmartphone, Network, Server, FileCode, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    title: "Diagrama de Implantação",
    description: "Uma visão estática da arquitetura física do sistema. Ele mostra o mapeamento de artefatos de software para os nós de hardware onde serão executados.",
    opacities: { client: 'opacity-15', conn1: 'opacity-15', proxy: 'opacity-15', conn2: 'opacity-15', server: 'opacity-15', artifact: 'opacity-15', conn3: 'opacity-15', db: 'opacity-15' }
  },
  {
    title: "A Visão Macro",
    description: "Aqui temos a topologia completa. Todos os componentes físicos e de software trabalhando juntos para entregar a aplicação ao usuário final.",
    opacities: { client: 'opacity-100', conn1: 'opacity-100', proxy: 'opacity-100', conn2: 'opacity-100', server: 'opacity-100', artifact: 'opacity-100', conn3: 'opacity-100', db: 'opacity-100' }
  },
  {
    title: "O Nó / Node",
    description: "Um Nó representa um recurso computacional físico ou virtual. É o hardware ou ambiente de execução, como o dispositivo do usuário ou o servidor Linux.",
    opacities: { client: 'opacity-100', conn1: 'opacity-15', proxy: 'opacity-15', conn2: 'opacity-15', server: 'opacity-100', artifact: 'opacity-15', conn3: 'opacity-15', db: 'opacity-15' }
  },
  {
    title: "O Artefato / Artifact",
    description: "Artefatos são os elementos de software reais (arquivos, scripts, binários) implantados nos Nós. Aqui, nosso código Node.js é o artefato rodando no servidor.",
    opacities: { client: 'opacity-15', conn1: 'opacity-15', proxy: 'opacity-15', conn2: 'opacity-15', server: 'opacity-15', artifact: 'opacity-100', conn3: 'opacity-15', db: 'opacity-15' }
  },
  {
    title: "Caminhos de Comunicação",
    description: "As conexões mostram como os Nós se comunicam. Elas representam protocolos de rede e rotas de dados entre os componentes físicos.",
    opacities: { client: 'opacity-15', conn1: 'opacity-100', proxy: 'opacity-15', conn2: 'opacity-100', server: 'opacity-15', artifact: 'opacity-15', conn3: 'opacity-100', db: 'opacity-15' }
  },
  {
    title: "Arquitetura Forte",
    description: "Compreender o Diagrama de Implantação permite planejar escalabilidade, segurança e infraestrutura com precisão. Esta é a base de sistemas robustos.",
    opacities: { client: 'opacity-100', conn1: 'opacity-100', proxy: 'opacity-100', conn2: 'opacity-100', server: 'opacity-100', artifact: 'opacity-100', conn3: 'opacity-100', db: 'opacity-100' }
  }
];

const Node = ({ icon: Icon, title, subtitle, opacityClass, isCyan }: any) => (
  <div className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-opacity duration-700 ease-in-out w-36 h-36 bg-black z-10 shrink-0
    ${isCyan ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'border-white/20'} 
    ${opacityClass}`}>
    <Icon className={`w-10 h-10 mb-3 ${isCyan ? 'text-[#00E5FF]' : 'text-white'}`} />
    <span className="text-white font-bold text-center text-sm">{title}</span>
    {subtitle && <span className="text-gray-400 text-[11px] text-center mt-1">{subtitle}</span>}
  </div>
);

const Connection = ({ label, opacityClass }: any) => (
  <div className={`flex flex-col items-center justify-center w-20 relative transition-opacity duration-700 ease-in-out shrink-0 ${opacityClass}`}>
    <span className="text-[#00E5FF] text-xs font-mono mb-2 absolute -top-7 whitespace-nowrap">&lt;&lt;{label}&gt;&gt;</span>
    <div className="w-full h-[2px] bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)]"></div>
  </div>
);

const ServerNode = ({ serverOpacity, artifactOpacity }: any) => (
  <div className="relative flex items-center justify-center w-56 h-64 z-10 shrink-0">
    {/* Server Background/Border */}
    <div className={`absolute inset-0 border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)] rounded-xl bg-black flex flex-col items-center pt-5 transition-opacity duration-700 ease-in-out ${serverOpacity}`}>
      <Server className="w-10 h-10 text-[#00E5FF] mb-2" />
      <span className="text-white font-bold text-sm text-center px-2">Servidor de Aplicação</span>
      <span className="text-gray-400 text-xs mt-1">(Linux/Docker)</span>
    </div>
    
    {/* Artifact */}
    <div className={`relative z-10 border border-white/20 bg-[#0a0a0a] p-4 rounded-lg flex flex-col items-center mt-16 transition-opacity duration-700 ease-in-out ${artifactOpacity} shadow-lg`}>
      <FileCode className="w-8 h-8 text-white mb-2" />
      <span className="text-white font-bold text-sm">App Backend</span>
      <span className="text-gray-400 text-xs mt-1">(Node.js)</span>
    </div>
  </div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentOpacities = slides[currentSlide].opacities;

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden font-sans">
      {/* Left Panel */}
      <div className="w-[400px] h-full bg-black border-r border-white/10 flex flex-col justify-between p-10 shrink-0 relative z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        {/* Top */}
        <div className="text-[#00E5FF] font-mono text-sm tracking-widest uppercase flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.8)] animate-pulse"></div>
          Slide {currentSlide + 1} de {slides.length}
        </div>

        {/* Middle */}
        <div className="flex flex-col relative h-[300px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-6 absolute inset-x-0"
            >
              <h1 className="text-4xl font-bold text-white leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-4 rounded-full border border-white/20 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
            aria-label="Slide Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex-1 py-4 px-6 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] font-bold hover:bg-[#00E5FF]/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-30 disabled:hover:bg-[#00E5FF]/10 disabled:hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            Próximo <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Panel (Stage) */}
      <div className="flex-1 flex items-center justify-center bg-black overflow-x-auto p-8 relative">
        {/* Subtle background grid for technical feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        
        <div className="flex items-center justify-center min-w-max relative z-10 px-10">
          <Node 
            icon={MonitorSmartphone} 
            title="Dispositivo do Usuário" 
            opacityClass={currentOpacities.client} 
            isCyan={true} 
          />
          <Connection 
            label="HTTPS" 
            opacityClass={currentOpacities.conn1} 
          />
          <Node 
            icon={Network} 
            title="Load Balancer" 
            subtitle="(Nginx)" 
            opacityClass={currentOpacities.proxy} 
            isCyan={true} 
          />
          <Connection 
            label="TCP/IP" 
            opacityClass={currentOpacities.conn2} 
          />
          <ServerNode 
            serverOpacity={currentOpacities.server} 
            artifactOpacity={currentOpacities.artifact} 
          />
          <Connection 
            label="SQL" 
            opacityClass={currentOpacities.conn3} 
          />
          <Node 
            icon={Database} 
            title="Servidor DB" 
            subtitle="(PostgreSQL)" 
            opacityClass={currentOpacities.db} 
            isCyan={true} 
          />
        </div>
      </div>
    </div>
  );
}
