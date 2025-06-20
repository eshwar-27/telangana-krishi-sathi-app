import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
interface LanguageToggleProps {
  language: string;
  setLanguage: (lang: string) => void;
}
const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  setLanguage
}) => {
  return <Button variant="outline" size="sm" onClick={() => setLanguage(language === 'en' ? 'te' : 'en')} aria-label={language === 'en' ? 'Switch to Telugu' : 'Switch to English'} className="flex items-center space-x-2 text-white border-white bg-whitetext-green-700 font-medium">
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="bg-white ">
        {language === 'en' ? 'తెలుగు' : 'English'}
      </span>
    </Button>;
};
export default LanguageToggle;