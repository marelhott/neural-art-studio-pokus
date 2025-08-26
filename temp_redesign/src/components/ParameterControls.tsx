import React from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Settings2, 
  Layers, 
  Target, 
  Zap,
  Hash,
  RotateCcw
} from 'lucide-react';

interface ParameterControlsProps {
  strength: number;
  setStrength: (value: number) => void;
  steps: number;
  setSteps: (value: number) => void;
  seed: number;
  setSeed: (value: number) => void;
  guidanceScale: number;
  setGuidanceScale: (value: number) => void;
  adaptorConditioning: number;
  setAdaptorConditioning: (value: number) => void;
  useRandomSeed: boolean;
  setUseRandomSeed: (value: boolean) => void;
}

export function ParameterControls({
  strength,
  setStrength,
  steps,
  setSteps,
  seed,
  setSeed,
  guidanceScale,
  setGuidanceScale,
  adaptorConditioning,
  setAdaptorConditioning,
  useRandomSeed,
  setUseRandomSeed,
}: ParameterControlsProps) {
  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 999999));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Settings2 className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Parametry</h2>
          <p className="text-xs text-muted-foreground">Jemné nastavení generování</p>
        </div>
      </div>

      {/* Strength */}
      <Card className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">Síla</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Síla denoising</label>
            <Badge variant="outline" className="font-mono text-xs px-1 py-0">
              {strength.toFixed(2)}
            </Badge>
          </div>
          <Slider
            value={[strength]}
            onValueChange={([value]) => setStrength(value)}
            min={0.0}
            max={1.0}
            step={0.01}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Řídí míru změny obrázku (0.0 = žádná změna, 1.0 = maximální změna)
          </p>
        </div>
      </Card>

      {/* Steps */}
      <Card className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">Kroky inference</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Počet kroků</label>
            <Badge variant="outline" className="font-mono text-xs px-1 py-0">
              {steps}
            </Badge>
          </div>
          <Slider
            value={[steps]}
            onValueChange={([value]) => setSteps(value)}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Více kroků obecně zlepšuje kvalitu, ale trvá déle
          </p>
        </div>
      </Card>

      {/* Guidance Scale */}
      <Card className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">Škála vedení</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">CFG škála</label>
            <Badge variant="outline" className="font-mono text-xs px-1 py-0">
              {guidanceScale.toFixed(1)}
            </Badge>
          </div>
          <Slider
            value={[guidanceScale]}
            onValueChange={([value]) => setGuidanceScale(value)}
            min={1.0}
            max={20.0}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Jak přesně následovat stylovací referenci (vyšší = věrnější)
          </p>
        </div>
      </Card>

      {/* Adaptor Conditioning */}
      <Card className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">Adaptér conditioning</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Škála conditioning</label>
            <Badge variant="outline" className="font-mono text-xs px-1 py-0">
              {adaptorConditioning.toFixed(2)}
            </Badge>
          </div>
          <Slider
            value={[adaptorConditioning]}
            onValueChange={([value]) => setAdaptorConditioning(value)}
            min={0.5}
            max={2.0}
            step={0.01}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Řídí vliv adaptéru na proces generování
          </p>
        </div>
      </Card>

      {/* Seed */}
      <Card className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">Seed</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Náhodný seed</label>
            <Switch
              checked={useRandomSeed}
              onCheckedChange={setUseRandomSeed}
            />
          </div>
          
          {!useRandomSeed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Slider
                    value={[seed]}
                    onValueChange={([value]) => setSeed(value)}
                    min={0}
                    max={999999}
                    step={1}
                    className="w-full"
                  />
                </div>
                <motion.button
                  onClick={generateRandomSeed}
                  className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-3 h-3" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Hodnota seed pro reprodukovatelnost</p>
                <Badge variant="outline" className="font-mono text-xs px-1 py-0">
                  {seed}
                </Badge>
              </div>
            </motion.div>
          )}
          
          <p className="text-xs text-muted-foreground">
            Použijte stejný seed pro reprodukovatelné výsledky, nebo náhodný pro rozmanitost
          </p>
        </div>
      </Card>
    </div>
  );
}