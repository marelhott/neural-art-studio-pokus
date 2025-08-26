import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from './ui/button';

interface DropZoneProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  title: string;
  subtitle?: string;
}

export function DropZone({ onFileUpload, uploadedFile, title, subtitle }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const removeFile = useCallback(() => {
    onFileUpload(null as any);
  }, [onFileUpload]);

  return (
    <motion.div
      className={`
        relative border-2 border-dashed rounded-2xl transition-all duration-300 h-[280px]
        ${isDragOver 
          ? 'border-primary bg-accent/50 scale-[1.02]' 
          : uploadedFile 
            ? 'border-accent bg-card' 
            : 'border-muted-foreground/20 bg-muted/30 hover:border-muted-foreground/40 hover:bg-muted/50'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={!uploadedFile ? { scale: 1.01 } : {}}
      whileTap={!uploadedFile ? { scale: 0.99 } : {}}
    >
      {uploadedFile ? (
        <div className="relative h-full">
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={removeFile}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4 mr-2" />
              Odebrat
            </Button>
          </div>
          <div className="absolute top-2 left-2 glassmorphism rounded-lg px-2 py-1">
            <p className="text-xs font-medium text-white">
              {uploadedFile.name.length > 20 ? uploadedFile.name.substring(0, 20) + '...' : uploadedFile.name}
            </p>
            <p className="text-xs text-white/70 font-mono">
              {(uploadedFile.size / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <motion.div
            className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4"
            animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
          </motion.div>
          
          <h3 className="text-base font-semibold mb-2">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
          )}
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Přetáhněte obrázek sem
            </p>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id="file-input"
              />
              <Button
                variant="outline"
                size="default"
                className="relative cursor-pointer hover:bg-accent"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Procházet soubory
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground font-mono">
              JPG, PNG, WEBP do 10MB
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}