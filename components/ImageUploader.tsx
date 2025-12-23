
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!selectedImage ? (
        <div 
          onClick={triggerInput}
          className="cursor-pointer border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors duration-300 h-64"
        >
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <i className="fa-solid fa-cloud-arrow-up text-3xl text-blue-600"></i>
          </div>
          <p className="text-slate-700 font-medium text-lg">Clique para enviar uma foto</p>
          <p className="text-slate-500 text-sm mt-1">PNG, JPG ou JPEG (Máx 5MB)</p>
        </div>
      ) : (
        <div className="relative group rounded-2xl overflow-hidden shadow-lg h-64 bg-slate-200">
          <img 
            src={selectedImage} 
            alt="Upload Preview" 
            className="w-full h-full object-cover"
          />
          <div 
            onClick={triggerInput}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <span className="text-white font-medium flex items-center gap-2">
              <i className="fa-solid fa-rotate"></i> Trocar Imagem
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
