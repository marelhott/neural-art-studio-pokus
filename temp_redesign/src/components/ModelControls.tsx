import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Layers, 
  Palette, 
  Zap, 
  Target, 
  Sparkles,
  Activity,
  Save,
  Trash2,
  Plus
} from 'lucide-react';

interface ModelControlsProps {
  model: string;
  setModel: (value: string) => void;
  preset: string;
  setPreset: (value: string) => void;
}

const models = [
  { id: 'neural-style', name: 'Neural Style Transfer', description: 'Klasický umělecký přenos stylu' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', description: 'Moderní AI-powered stylování' },
  { id: 'cyclegan', name: 'CycleGAN', description: 'Model adaptace domén' },
  { id: 'wavenet-style', name: 'WaveNet Style', description: 'Experimentální texturový model' }
];

const defaultPresets = [
  { id: 'balanced', name: 'Vyvážené', icon: Target, description: 'Dobrá rovnováha stylu a obsahu' },
  { id: 'artistic', name: 'Umělecké', icon: Palette, description: 'Silná umělecká interpretace' },
  { id: 'photorealistic', name: 'Fotorealistické', icon: Activity, description: 'Zachovává fotorealismus' },
  { id: 'experimental', name: 'Experimentální', icon: Sparkles, description: 'Experimentální efekty' },
];

export function ModelControls({
  model,
  setModel,
  preset,
  setPreset,
}: ModelControlsProps) {
  const [savedPresets, setSavedPresets] = useState<Array<{id: string, name: string, icon: any, description: string}>>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const allPresets = [...defaultPresets, ...savedPresets];

  const saveCurrentPreset = () => {
    if (newPresetName.trim()) {
      const newPreset = {
        id: `custom-${Date.now()}`,
        name: newPresetName.trim(),
        icon: Save,
        description: 'Custom saved preset'
      };
      setSavedPresets(prev => [...prev, newPreset]);
      setNewPresetName('');
      setShowSaveForm(false);
      setPreset(newPreset.id);
    }
  };

  const deletePreset = (presetId: string) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
    if (preset === presetId) {
      setPreset('balanced');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Layers className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Model a předvolby</h2>
          <p className="text-xs text-muted-foreground">AI model a stylová konfigurace</p>
        </div>
      </div>

      {/* Model Selection */}
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-sm font-medium">AI Model</h3>
        </div>
        
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Vyberte model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">{m.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Presets */}
      <Card className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-muted-foreground" />
            <h3 className="text-sm font-medium">Stylové předvolby</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setShowSaveForm(!showSaveForm)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        {/* Save Form */}
        {showSaveForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-3 p-2 border border-border rounded-lg space-y-2"
          >
            <Input
              placeholder="Název předvolby..."
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && saveCurrentPreset()}
              className="h-7 text-xs"
            />
            <div className="flex gap-1">
              <Button size="sm" onClick={saveCurrentPreset} className="h-6 text-xs px-2">
                <Save className="w-3 h-3 mr-1" />
                Uložit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSaveForm(false)} className="h-6 text-xs px-2">
                Zrušit
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Preset Grid */}
        <div className="grid grid-cols-1 gap-1">
          {allPresets.map((p) => (
            <motion.div
              key={p.id}
              className={`
                group relative p-2 rounded-lg border transition-all duration-200 cursor-pointer
                ${preset === p.id 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }
              `}
              onClick={() => setPreset(p.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-2">
                <p.icon className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                </div>
                {savedPresets.find(sp => sp.id === p.id) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePreset(p.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Model Status */}
      <Card className="p-3 bg-accent/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div>
            <p className="text-xs font-medium">Model připraven</p>
            <p className="text-xs text-muted-foreground font-mono">
              {models.find(m => m.id === model)?.name} • GPU akcelerace
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}