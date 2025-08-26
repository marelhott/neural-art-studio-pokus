import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Maximize2, Copy, Share2, Eye, EyeOff, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface ResultsPanelProps {
  originalImage: File | null;
  styleImage: File | null;
  resultImage: string | null;
  isProcessing: boolean;
  processingProgress: number;
  onDownload: () => void;
  onShare: () => void;
}

export function ResultsPanel({
  originalImage,
  styleImage,
  resultImage,
  isProcessing,
  processingProgress,
  onDownload,
  onShare,
}: ResultsPanelProps) {
  const [compareMode, setCompareMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const downloadImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `style-transfer-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Results</h2>
          <p className="text-sm text-muted-foreground">
            {isProcessing ? 'Processing your image...' : 'Your styled image'}
          </p>
        </div>
        
        {resultImage && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
            >
              {compareMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {compareMode ? 'Hide' : 'Compare'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Processing State */}
      {isProcessing && (
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Processing style transfer</p>
                <span className="text-sm text-muted-foreground font-mono">
                  {processingProgress}%
                </span>
              </div>
              <Progress value={processingProgress} className="h-2" />
              <div className="flex items-center gap-2 mt-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Estimated time: {Math.max(1, Math.ceil((100 - processingProgress) / 10))}min
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {!isProcessing && (
        <AnimatePresence mode="wait">
          {resultImage ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Tabs defaultValue="result" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="result">Result</TabsTrigger>
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="result" className="space-y-4">
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={resultImage}
                        alt="Style transfer result"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                      {compareMode && originalImage && (
                        <motion.div
                          className="absolute inset-0 overflow-hidden"
                          initial={{ clipPath: 'inset(0 50% 0 0)' }}
                          animate={{ clipPath: 'inset(0 0% 0 50%)' }}
                        >
                          <img
                            src={URL.createObjectURL(originalImage)}
                            alt="Original"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className="bg-black/60 text-white">
                          Style Transfer Complete
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button onClick={downloadImage} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={onShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="original">
                  {originalImage && (
                    <Card className="overflow-hidden">
                      <img
                        src={URL.createObjectURL(originalImage)}
                        alt="Original"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="style">
                  {styleImage && (
                    <Card className="overflow-hidden">
                      <img
                        src={URL.createObjectURL(styleImage)}
                        alt="Style reference"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
                <Eye className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No results yet</h3>
              <p className="text-muted-foreground">
                Upload images and run style transfer to see results here
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && resultImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resultImage}
                alt="Fullscreen result"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsFullscreen(false)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}