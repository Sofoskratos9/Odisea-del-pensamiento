import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-blue/90 backdrop-blur-sm border-t border-gold/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del proyecto */}
          <div className="space-y-4">
            <h3 className="text-lg font-cinzel text-gold">La Odisea del Pensamiento</h3>
            <p className="text-white/80 text-sm">
              Una aplicación educativa gamificada que transforma el aprendizaje de la Historia del Pensamiento 
              en una aventura interactiva para estudiantes de secundaria.
            </p>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>para la educación</span>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair text-gold">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-gold transition-colors">
                  Guía del Estudiante
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-gold transition-colors">
                  Manual del Profesor
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-gold transition-colors">
                  Soporte Técnico
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-gold transition-colors">
                  Términos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair text-gold">Contacto</h3>
            <div className="space-y-3">
              <a 
                href="mailto:contacto@odiseapensamiento.edu"
                className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>contacto@odiseapensamiento.edu</span>
              </a>
              <a 
                href="https://github.com/odisea-pensamiento"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors text-sm"
              >
                <Github className="h-4 w-4" />
                <span>Código Fuente</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold/30 mt-8 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2024 La Odisea del Pensamiento. Desarrollado con fines educativos.
          </p>
          <p className="text-white/40 text-xs mt-2">
            Inspirado en los grandes pensadores de la historia para formar las mentes del futuro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

