import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { DropZone } from './components/DropZone';
import { ParameterControls } from './components/ParameterControls';
import { ModelControls } from './components/ModelControls';
import { ImageComparison } from './components/ImageComparison';
import { ProcessButton } from './components/ProcessButton';
import { Card } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Parameter controls state
  const [strength, setStrength] = useState(0.75);
  const [steps, setSteps] = useState(20);
  const [seed, setSeed] = useState(42);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [adaptorConditioning, setAdaptorConditioning] = useState(1.0);
  const [useRandomSeed, setUseRandomSeed] = useState(true);

  // Model controls state  
  const [model, setModel] = useState('neural-style');
  const [preset, setPreset] = useState('balanced');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleProcess = async () => {
    if (!originalImage) {
      toast.error('Nejprve nahrajte obrázek s obsahem');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, use the original image as result
      // In real app, this would be the actual style transfer result
      const mockResult = URL.createObjectURL(originalImage);
      setResultImage(mockResult);
      setProgress(100);
      
      toast.success('Přenos stylu byl úspěšně dokončen!');
    } catch (error) {
      toast.error('Zpracování selhalo. Zkuste to prosím znovu.');
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
    toast.info('Zpracování bylo zrušeno');
  };

  const handleDownload = () => {
    toast.success('Stahování zahájeno');
  };

  const handleShare = () => {
    toast.success('Odkaz pro sdílení byl zkopírován do schránky');
  };

  const canProcess = originalImage && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Parameters Only */}
          <div className="lg:col-span-4">
            <Card className="p-4 sticky top-24">
              <ParameterControls
                strength={strength}
                setStrength={setStrength}
                steps={steps}
                setSteps={setSteps}
                seed={seed}
                setSeed={setSeed}
                guidanceScale={guidanceScale}
                setGuidanceScale={setGuidanceScale}
                adaptorConditioning={adaptorConditioning}
                setAdaptorConditioning={setAdaptorConditioning}
                useRandomSeed={useRandomSeed}
                setUseRandomSeed={setUseRandomSeed}
              />
            </Card>
          </div>

          {/* Main Content - Process, Upload & Result */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Process Button */}
              <ProcessButton
                isProcessing={isProcessing}
                progress={progress}
                onProcess={handleProcess}
                onCancel={handleCancel}
                disabled={!canProcess}
              />
              
              {/* Upload Zone */}
              <DropZone
                title="Vstupní obrázek"
                subtitle="Nahrajte obrázek ke stylizování"
                uploadedFile={originalImage}
                onFileUpload={setOriginalImage}
              />

              {/* Result */}
              <ImageComparison
                originalImage={originalImage}
                resultImage={resultImage}
                isProcessing={isProcessing}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            </motion.div>
          </div>

          {/* Right Sidebar - Model & Presets */}
          <div className="lg:col-span-3">
            <Card className="p-4 sticky top-24">
              <ModelControls
                model={model}
                setModel={setModel}
                preset={preset}
                setPreset={setPreset}
              />
            </Card>
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}