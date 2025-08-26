import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Share2, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface ImageComparisonProps {
  originalImage: File | null;
  resultImage: string | null;
  isProcessing: boolean;
  onDownload: () => void;
  onShare: () => void;
}

export function ImageComparison({
  originalImage,
  resultImage,
  isProcessing,
  onDownload,
  onShare,
}: ImageComparisonProps) {
  return (
    <div className="w-full">
      {/* Result Image */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Výsledek</h3>
          {resultImage && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <Card className="aspect-square overflow-hidden relative">
          {isProcessing ? (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
                <div>
                  <p className="font-medium">Zpracovávám...</p>
                  <p className="text-sm text-muted-foreground">Vytvářím váš stylizovaný obrázek</p>
                </div>
              </div>
            </div>
          ) : resultImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <img
                src={resultImage}
                alt="Výsledek"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white">
                  Dokončeno
                </Badge>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Výsledek se zobrazí zde</p>
                <p className="text-xs text-muted-foreground mt-1">Nahrajte obrázek a spusťte zpracování</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}