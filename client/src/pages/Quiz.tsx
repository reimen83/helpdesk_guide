import { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'O que é SLA em Help Desk?',
    options: [
      'Service Level Agreement - Acordo que define o tempo máximo de resposta e resolução',
      'System Load Analyzer - Ferramenta de análise de carga do sistema',
      'Software License Agreement - Contrato de licença de software',
      'Secure Local Access - Acesso seguro local a servidores',
    ],
    correctAnswer: 0,
    explanation: 'SLA (Service Level Agreement) é um acordo que define os tempos máximos de resposta e resolução para diferentes tipos de incidentes.',
    category: 'ITIL 4',
  },
  {
    id: 2,
    question: 'Qual é a diferença entre Incidente e Problema em ITIL?',
    options: [
      'Não há diferença, são sinônimos',
      'Incidente é uma interrupção não planejada; Problema é a causa raiz do incidente',
      'Problema é mais grave que incidente',
      'Incidente é planejado; Problema é não planejado',
    ],
    correctAnswer: 1,
    explanation: 'Em ITIL, Incidente é uma interrupção não planejada do serviço, enquanto Problema é a causa raiz que gera um ou mais incidentes.',
    category: 'ITIL 4',
  },
  {
    id: 3,
    question: 'Qual comando Linux lista os arquivos de um diretório?',
    options: ['cd', 'ls', 'mkdir', 'pwd'],
    correctAnswer: 1,
    explanation: 'O comando "ls" (list) é usado para listar os arquivos e diretórios. "cd" muda de diretório, "mkdir" cria diretório, "pwd" mostra o caminho atual.',
    category: 'Linux',
  },
  {
    id: 4,
    question: 'O que é Active Directory?',
    options: [
      'Um antivírus para Windows',
      'Um serviço de diretório centralizado para gerenciar usuários e recursos em rede',
      'Um programa de backup automático',
      'Uma ferramenta de monitoramento de rede',
    ],
    correctAnswer: 1,
    explanation: 'Active Directory é um serviço de diretório centralizado do Windows que gerencia usuários, computadores, grupos e permissões em uma rede corporativa.',
    category: 'Servidores Windows',
  },
  {
    id: 5,
    question: 'Qual é a regra 3-2-1 de backup?',
    options: [
      '3 cópias, 2 tipos de mídia, 1 cópia offsite',
      '3 servidores, 2 datacenters, 1 nuvem',
      '3 horas, 2 dias, 1 semana de retenção',
      '3 GB, 2 MB, 1 KB de espaço',
    ],
    correctAnswer: 0,
    explanation: 'A regra 3-2-1 recomenda: 3 cópias dos dados, em 2 tipos de mídia diferentes, com 1 cópia armazenada offsite para segurança máxima.',
    category: 'Backup',
  },
  {
    id: 6,
    question: 'O que é TCP/IP?',
    options: [
      'Um tipo de cabo de rede',
      'Um protocolo de comunicação fundamental da internet',
      'Um software de firewall',
      'Uma marca de roteador',
    ],
    correctAnswer: 1,
    explanation: 'TCP/IP é o conjunto de protocolos fundamentais que permite a comunicação entre computadores na internet e em redes locais.',
    category: 'Redes',
  },
  {
    id: 7,
    question: 'Qual é a função de um switch em uma rede?',
    options: [
      'Conectar a rede local à internet',
      'Filtrar tráfego de rede',
      'Conectar múltiplos dispositivos em uma rede local (LAN)',
      'Amplificar o sinal de Wi-Fi',
    ],
    correctAnswer: 2,
    explanation: 'Um switch conecta múltiplos dispositivos em uma rede local (LAN), permitindo comunicação entre eles através de portas Ethernet.',
    category: 'Redes',
  },
  {
    id: 8,
    question: 'O que é um ERP?',
    options: [
      'Um tipo de vírus de computador',
      'Enterprise Resource Planning - Sistema que integra processos de negócio',
      'Uma ferramenta de edição de imagens',
      'Um protocolo de segurança de rede',
    ],
    correctAnswer: 1,
    explanation: 'ERP (Enterprise Resource Planning) é um sistema integrado que gerencia recursos e processos de negócio em uma organização.',
    category: 'Sistemas Senior',
  },
  {
    id: 9,
    question: 'Qual é o primeiro passo ao atender um chamado técnico?',
    options: [
      'Desligar o computador do usuário',
      'Registrar o chamado e coletar informações do problema',
      'Reinstalar o sistema operacional',
      'Culpar o usuário pelo problema',
    ],
    correctAnswer: 1,
    explanation: 'O primeiro passo é sempre registrar o chamado no sistema de tickets e coletar informações detalhadas sobre o problema do usuário.',
    category: 'Atendimento',
  },
  {
    id: 10,
    question: 'O que é BIOS?',
    options: [
      'Um sistema operacional',
      'Basic Input/Output System - Firmware que inicializa o computador',
      'Um programa antivírus',
      'Uma rede de computadores',
    ],
    correctAnswer: 1,
    explanation: 'BIOS (Basic Input/Output System) é o firmware que inicializa o hardware do computador antes do sistema operacional carregar.',
    category: 'Hardware',
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswerClick = (optionIndex: number) => {
    if (answered) return;

    setSelectedOption(optionIndex);
    setSelectedAnswers([...selectedAnswers, optionIndex]);

    const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswers([]);
    setAnswered(false);
    setSelectedOption(null);
  };

  const downloadCertificate = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const certificateContent = `
CERTIFICADO DE CONCLUSÃO
Help Desk Guide - Quiz de Conhecimento

Parabéns! Você completou o quiz com sucesso.

Pontuação: ${score} de ${quizQuestions.length} (${percentage}%)
Data: ${new Date().toLocaleDateString('pt-BR')}

Este certificado confirma que você demonstrou conhecimento em:
- ITIL 4 e Gestão de Atendimento
- Hardware e Periféricos
- Servidores Windows e Linux
- Redes e Infraestrutura
- Sistemas ERP
- Backup e Recuperação de Dados

Parabéns pela dedicação!
    `;

    const element = document.createElement('a');
    const file = new Blob([certificateContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `certificado-helpdesk-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (showResults) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            {passed ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-12">
                <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
                <h1 className="text-4xl font-bold text-green-900 mb-4">Parabéns!</h1>
                <p className="text-xl text-green-800 mb-6">
                  Você passou no quiz com <strong>{percentage}%</strong> de acerto!
                </p>
                <div className="bg-white rounded-lg p-6 mb-6">
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="text-gray-600">Questões respondidas corretamente</p>
                </div>
                <Button
                  onClick={downloadCertificate}
                  className="bg-green-600 hover:bg-green-700 text-white mb-4 gap-2"
                >
                  <Award size={20} />
                  Baixar Certificado
                </Button>
              </div>
            ) : (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-12">
                <XCircle size={64} className="mx-auto mb-4 text-yellow-600" />
                <h1 className="text-4xl font-bold text-yellow-900 mb-4">Quase lá!</h1>
                <p className="text-xl text-yellow-800 mb-6">
                  Você obteve <strong>{percentage}%</strong> de acerto. Estude mais e tente novamente!
                </p>
                <div className="bg-white rounded-lg p-6 mb-6">
                  <p className="text-3xl font-bold text-yellow-600 mb-2">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="text-gray-600">Questões respondidas corretamente</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRestartQuiz}
              className="gap-2"
            >
              <RotateCcw size={20} />
              Tentar Novamente
            </Button>
            <a href="/">
              <Button variant="outline">Voltar ao Guia</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="min-h-screen bg-background">
      {/* Botão de Retorno */}
      <div className="bg-blue-50 border-b border-blue-200 py-4">
        <div className="container max-w-2xl">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 flex items-center">
              <ArrowLeft size={20} />
              Voltar para Página Inicial
            </Button>
          </Link>
        </div>
      </div>

      <div className="container max-w-2xl py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-primary">Quiz - Help Desk</h1>
            <span className="text-lg font-semibold text-muted-foreground">
              {currentQuestion + 1}/{quizQuestions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border-2 border-border rounded-lg p-8 mb-8 shadow-lg">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {question.category}
            </span>
            <h2 className="text-2xl font-bold text-foreground">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedOption === index
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : answered && index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-border hover:border-primary'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{option}</span>
                  {selectedOption === index && (
                    isCorrect ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <XCircle size={24} className="text-red-600" />
                    )
                  )}
                  {answered && index === question.correctAnswer && selectedOption !== index && (
                    <CheckCircle size={24} className="text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <div className={`p-4 rounded-lg mb-8 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'}`}>
              <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-900' : 'text-blue-900'}`}>
                {isCorrect ? '✓ Resposta Correta!' : 'Explicação:'}
              </p>
              <p className={isCorrect ? 'text-green-800' : 'text-blue-800'}>
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <Button
              onClick={handleNextQuestion}
              className="w-full bg-primary hover:bg-blue-800 text-white"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Ver Resultados' : 'Próxima Questão'}
            </Button>
          )}
        </div>

        {/* Score Preview */}
        <div className="text-center text-muted-foreground">
          <p>Pontuação atual: <strong className="text-primary">{score}/{currentQuestion}</strong></p>
        </div>
      </div>
    </div>
  );
}
