
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
          className="cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300 h-48"
        >
          <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
            <i className="fa-solid fa-cloud-arrow-up text-2xl text-blue-600"></i>
          </div>
          <p className="text-slate-700 font-bold text-sm">Carregar Foto</p>
          <p className="text-slate-400 text-[10px] mt-1 font-medium">PNG, JPG (Máx 5MB)</p>
        </div>
      ) : (
        <div className="relative group rounded-2xl overflow-hidden shadow-md h-48 bg-slate-100 border border-slate-200">
          <img 
            src={selectedImage} 
            alt="Upload Preview" 
            className="w-full h-full object-cover"
          />
          <div 
            onClick={triggerInput}
            className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm"
          >
            <span className="text-white text-xs font-black flex items-center gap-2 uppercase tracking-wider">
              <i className="fa-solid fa-rotate"></i> Trocar Foto
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
