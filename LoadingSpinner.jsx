import React from 'react';
import { Compass, Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Navegando por el tiempo..." }) => {
  return (
    <div className="min-h-screen bg-gradient-mystical flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        {/* Spinner principal */}
        <div className="relative">
          <div className="absolute inset-0 bg-gold/20 rounded-full animate-glow"></div>
          <Compass className="h-16 w-16 text-gold animate-spin" />
        </div>
        
        {/* Mensaje de carga */}
        <div className="space-y-2">
          <h2 className="text-2xl font-cinzel text-white">{message}</h2>
          <div className="flex items-center justify-center space-x-2 text-gold/80">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-playfair">Preparando tu aventura filosófica...</span>
          </div>
        </div>

        {/* Barra de progreso animada */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-gold animate-pulse"></div>
        </div>

        {/* Cita filosófica */}
        <div className="max-w-md text-center">
          <p className="text-white/70 text-sm italic font-playfair">
            "El viaje de mil millas comienza con un solo paso"
          </p>
          <p className="text-gold/60 text-xs mt-1">- Lao Tzu</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

