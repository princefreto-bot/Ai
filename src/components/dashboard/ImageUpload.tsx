import { useState, useCallback } from 'react';
import { Upload, Image, X, Loader2, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useStore } from '@/store/useStore';
import { analyzeChart } from '@/services/aiAnalysis';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

export function ImageUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isAnalyzing, setIsAnalyzing, addAnalysis, user } = useStore();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !user?.isSubscribed) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeChart(selectedImage);
      addAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const isSubscribed = user?.isSubscribed;

  return (
    <Card className="p-6 shadow-xl shadow-slate-200/50 border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Analyser un graphique</h3>
        {isSubscribed && (
          <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
            ✓ Abonnement actif
          </span>
        )}
      </div>

      {!isSubscribed ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-pink-500" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">
            Abonnement requis
          </h4>
          <p className="text-slate-600 mb-6 max-w-sm mx-auto">
            Souscrivez à un abonnement Pro pour accéder aux analyses IA illimitées.
          </p>
          <Link to="/pricing">
            <Button size="lg" className="shadow-lg shadow-pink-200/50">
              Voir les tarifs - 20$/mois
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {!selectedImage ? (
            <div
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300',
                dragActive 
                  ? 'border-pink-500 bg-pink-50 scale-[1.02]' 
                  : 'border-slate-300 hover:border-pink-400 hover:bg-pink-50/30'
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-200/50 transform hover:rotate-6 transition-transform">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    Glissez votre image ici
                  </p>
                  <p className="text-slate-500 mt-2">
                    ou cliquez pour sélectionner un fichier
                  </p>
                </div>
                <p className="text-sm text-slate-400">
                  PNG, JPG, WEBP jusqu'à 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={selectedImage}
                  alt="Chart to analyze"
                  className="w-full h-72 object-contain bg-slate-100 rounded-2xl border border-slate-200"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors group-hover:scale-110"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Image prête</p>
                  <p className="text-sm text-slate-500">Cliquez sur le bouton pour lancer l'analyse</p>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  'Lancer l\'analyse IA'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
