

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

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    step: 1,
    preheadline: "Para Engenheiros(as) Civis que buscam um salário de R$ 16.495/mês",
    headline: (
      <>
        A Cesgranrio usa 3 armadilhas para eliminar 92% dos engenheiros.{' '}
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
        { text: "Foco 80% do tempo em tópicos que a Cesgranrio historicamente ignora, só por segurança." },
        { text: "Estudo todo o edital de forma linear, sem priorizar o que realmente importa para a banca." },
        { text: "Tento adivinhar os temas mais quentes, mas sem uma análise de dados concreta." },
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
        { text: "Questões interdisciplinares que conectam normas técnicas com cenários práticos inesperados." },
        { text: "Pegadinhas em conceitos básicos que a maioria dos candidatos negligencia." },
        { text: "Ênfase desproporcional em temas de baixa recorrência em outros concursos." },
      ],
    },
    ctaText: "Última Pergunta",
  },
  {
    step: 4,
    headline: "Diagnóstico Estratégico: Etapa 3 de 3",
    quiz: {
      question: "Com apenas 103 vagas imediatas e um salário de R$ 16.495, qual sua posição sobre o risco?",
      options: [
        { text: "Estou disposto a arriscar com uma estratégia genérica e não validada." },
        { text: "A concorrência me assusta, mas confio que estudar 'muito' será o suficiente." },
        { text: "Não posso arriscar. Preciso de um método que anule a margem de erro e me coloque na frente." },
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
    headline: "Será que funciona? Veja quem já está no caminho certo.",
    testimonial: {
      text: "Eu estava perdido, estudando de tudo um pouco. O Método Cesgranrio Decifrado foi como um GPS para a aprovação. Em 4 meses, minha pontuação nos simulados dobrou.",
      author: "João P., Aprovado no Banco do Brasil (Cesgranrio)",
    },
    subheadline: (
       <div className="flex items-center justify-center gap-4 mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <div>
           <h3 className="font-bold text-white text-base">Garantia Incondicional de 7 Dias</h3>
           <p className="text-slate-300 text-sm">Seu risco é zero. Se não for a estratégia mais precisa que você já viu, peça seu dinheiro de volta.</p>
         </div>
       </div>
    ),
    ctaText: "ESTOU SEGURO, QUERO MINHA VAGA",
  },
  {
    step: 8,
    headline: (
        <>
            A escolha que <span className="text-amber-400">define sua aprovação</span> está em suas mãos.
        </>
    ),
    subheadline: "Você vai arriscar o seu futuro ou vai investir nele?",
    ctaText: "QUERO DECIFRAR A CESGRANRIO E GARANTIR MINHA VAGA",
  },
];