
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
      className="flex items-center space-x-2"
    >
      <Languages className="h-4 w-4" />
      <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;
