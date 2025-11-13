

import React from 'react';
import type { FunnelStep } from './types';

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Quiz Icons
const iconClasses = "h-8 w-8 text-amber-400 group-hover:text-green-400 transition-colors duration-300";

const UnfocusedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0-6l6 6M9 9a3 3 0 100-6 3 3 0 000 6zm0 0l-1.5 1.5M9 9V3m0 0a2.5 2.5 0 00-5 0v3m5-3a2.5 2.5 0 015 0v3" />
    </svg>
);
const LinearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const GuessingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.635-1.634L12.75 18.5l1.188-.648a2.25 2.25 0 001.634-1.635L16.25 15l.648 1.188a2.25 2.25 0 001.635 1.634L19.75 18.5l-1.188.648a2.25 2.25 0 00-1.634 1.635z" />
    </svg>
);
const InterdisciplinaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);
const TrapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);
const LowRecurrenceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);
const GenericIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);
const OverworkingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);
const ValidatedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);


export const FUNNEL_STEPS: FunnelStep[] = [
  {
    step: 1,
    preheadline: (
      <>
        Para Engenheiros(as) Civis que buscam um salário de R$ 16.495/mês{" "}
        <span className="opacity-80 font-medium">+ R$ 2.000 VA</span>
      </>
    ),
    headline: (
      <>
        A Cesgranrio usará 3 armadilhas para eliminar 92% dos engenheiros.{' '}
        <span className="text-amber-400">O Método Decifrado blinda você contra elas.</span>
      </>
    ),
    ctaText: "CONHECER O MÉTODO",
  },
  {
    step: 2,
    headline: "Diagnóstico Estratégico: Etapa 1 de 3",
    quiz: {
      question: "Como você descreveria seu foco de estudo atual para o concurso?",
      options: [
        { text: "Foco 80% do tempo em tópicos que a Cesgranrio historicamente ignora, só por segurança.", icon: <UnfocusedIcon /> },
        { text: "Estudo todo o edital de forma linear, sem priorizar o que realmente importa para a banca.", icon: <LinearIcon /> },
        { text: "Tento adivinhar os temas mais quentes, mas sem uma análise de dados concreta.", icon: <GuessingIcon /> },
      ],
    },
    ctaText: "Próxima Pergunta",
  },
  {
    step: 3,
    headline: "Diagnóstico Estratégico: Etapa 2 de 3",
    quiz: {
      question: "Qual erro fatal a Cesgranrio usa para eliminar 92% dos Engenheiros Civis despreparados?",
      options: [
        { text: "Questões interdisciplinares que conectam normas técnicas com cenários práticos inesperados.", icon: <InterdisciplinaryIcon /> },
        { text: "Pegadinhas em conceitos básicos que a maioria dos candidatos negligencia.", icon: <TrapIcon /> },
        { text: "Ênfase desproporcional em temas de baixa recorrência em outros concursos.", icon: <LowRecurrenceIcon /> },
      ],
    },
    ctaText: "Última Pergunta",
  },
  {
    step: 4,
    headline: "Diagnóstico Estratégico: Etapa 3 de 3",
    quiz: {
      question: "Com apenas 103 vagas imediatas e um salário de R$ 16.495/mês + R$ 2.000 VA, qual sua posição sobre o risco?",
      options: [
        { text: "Estou disposto a arriscar com uma estratégia genérica e não validada.", icon: <GenericIcon /> },
        { text: "A concorrência me assusta, mas confio que estudar 'muito' será o suficiente.", icon: <OverworkingIcon /> },
        { text: "Não posso arriscar. Preciso de um método que anule a margem de erro e me coloque na frente.", icon: <ValidatedIcon /> },
      ],
    },
    ctaText: "VER MEU DIAGNÓSTICO",
  },
  {
    step: 5,
    headline: "Seu Diagnóstico: Rota de Colisão com o Padrão Cesgranrio.",
    subheadline: (
      <>
        Você tem a base, mas sua estratégia atual não está alinhada com a mentalidade da banca.
        <br />
        <span className="text-amber-400 font-bold">A Margem de Erro Cesgranrio é Zero.</span> Sua aprovação exige um Método Decifrado.
      </>
    ),
    ctaText: "CONTINUAR",
  },
  {
    step: 6,
    headline: "O Método Cesgranrio Decifrado: A Engenharia da Sua Aprovação.",
    subheadline: "A única estratégia que mapeia, direciona e simula o caminho para a sua vaga.",
    pillars: [
      {
        icon: <ChartIcon />,
        title: "Mapeamento de Recorrência",
        description: "Foco a Laser 80/20. Analisamos +5.000 questões para você estudar apenas os tópicos que mais caem e garantir sua pontuação.",
      },
      {
        icon: <TargetIcon />,
        title: "Conteúdo Verticalizado",
        description: "Estudo sem 'gordura'. Aulas e materiais 100% focados no padrão Cesgranrio, para você não perder um minuto com o que não cai.",
      },
      {
        icon: <DocumentIcon />,
        title: "Simulação de Provas",
        description: "Simulação Realista. Nossos simulados replicam a pressão e o estilo da prova real, para que o dia do concurso seja apenas mais um treino.",
      },
    ],
    ctaText: "QUERO ESSA ESTRATÉGIA",
  },
  {
    step: 7,
    headline: "Não é sorte, é método. Veja quem já está na frente.",
    testimonial: {
        text: "Eu estava perdido, estudando de tudo um pouco. O Método Cesgranrio Decifrado foi como um GPS para a aprovação. Em 4 meses, minha pontuação nos simulados dobrou.",
        author: "João P., Aprovado no Banco do Brasil (Cesgranrio)",
    },
    ctaText: "QUERO SER O PRÓXIMO APROVADO",
  },
  {
    step: 8,
    headline: (
      <>
          A escolha que <span className="text-amber-400">define sua aprovação</span> está em suas mãos.
      </>
    ),
    subheadline: "Você vai arriscar o seu futuro ou vai investir nele?",
    ctaText: "FAZER A ESCOLHA CERTA", // Placeholder, this step has custom interaction
  },
  {
    step: 9,
    preheadline: "SUA VAGA ESTÁ A UMA DECISÃO DE DISTÂNCIA",
    headline: (
      <>
        O método para <span className="text-amber-400">conquistar seu salário de R$ 16.495</span>.
      </>
    ),
    subheadline: "Depois de 12 anos, a oportunidade apareceu. A concorrência será brutal. Esta é a sua única chance de usar uma estratégia precisa e deixar a sorte de lado. O tempo está acabando.",
    ctaText: "GARANTIR MINHA VAGA POR R$ 27,90",
  },
];
