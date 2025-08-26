import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Zap, Play, Square } from 'lucide-react';

interface ProcessButtonProps {
  isProcessing: boolean;
  progress: number;
  onProcess: () => void;
  onCancel: () => void;
  disabled: boolean;
}

export function ProcessButton({ 
  isProcessing, 
  progress, 
  onProcess, 
  onCancel, 
  disabled 
}: ProcessButtonProps) {
  return (
    <div className="space-y-2">
      <motion.div
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <Button
          onClick={isProcessing ? onCancel : onProcess}
          disabled={disabled && !isProcessing}
          size="sm"
          className={`
            w-full h-10 text-sm font-semibold relative overflow-hidden
            ${isProcessing 
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }
          `}
        >
          {/* Background animation */}
          {isProcessing && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          )}
          
          <div className="flex items-center gap-2 relative z-10">
            {isProcessing ? (
              <>
                <Square className="w-4 h-4" />
                Zrušit zpracování
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Spustit přenos stylu
              </>
            )}
          </div>
        </Button>
      </motion.div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <Progress value={progress} className="h-1" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Zpracovávám...</span>
            <span className="font-mono">{progress.toFixed(0)}%</span>
          </div>
        </motion.div>
      )}

      {!isProcessing && !disabled && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-muted-foreground"
        >
          Připraven ke zpracování • ~2min
        </motion.p>
      )}

      {disabled && !isProcessing && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-muted-foreground"
        >
          Nahrajte obrázek pro pokračování
        </motion.p>
      )}
    </div>
  );
}