import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function ProgressBar() {
  const { getProgress, resetProgress } = useProgress();
  const { completed, total, percentage } = getProgress();

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-blue-900">Seu Progresso</h3>
          <p className="text-sm text-blue-700">
            {completed} de {total} seções concluídas
          </p>
        </div>
        <Button
          onClick={resetProgress}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RotateCcw size={16} />
          Resetar
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-3 text-center">
        <span className="text-2xl font-bold text-blue-900">{percentage}%</span>
        <p className="text-xs text-blue-600">Concluído</p>
      </div>

      {/* Motivational Message */}
      {percentage === 100 ? (
        <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-3 text-center">
          <p className="text-green-800 font-semibold">
            🎉 Parabéns! Você completou todo o guia! Agora estude os PDFs e prepare-se para a entrevista.
          </p>
        </div>
      ) : percentage >= 75 ? (
        <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-center">
          <p className="text-yellow-800 text-sm">
            ⚡ Você está quase lá! Continue estudando as últimas seções.
          </p>
        </div>
      ) : percentage >= 50 ? (
        <div className="mt-4 bg-blue-100 border border-blue-300 rounded-lg p-3 text-center">
          <p className="text-blue-800 text-sm">
            💪 Ótimo progresso! Você já completou metade do guia.
          </p>
        </div>
      ) : (
        <div className="mt-4 bg-purple-100 border border-purple-300 rounded-lg p-3 text-center">
          <p className="text-purple-800 text-sm">
            🚀 Você começou bem! Continue estudando para melhorar seu progresso.
          </p>
        </div>
      )}
    </div>
  );
}
