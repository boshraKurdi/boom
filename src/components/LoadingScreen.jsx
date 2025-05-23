import { Loader, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from '../assets/loading2.png'
export default function LoadingScreen() {
   const { t } = useTranslation();
 return (
    <div className="radar-container">
      <div className="radar">
        <div className="radar-sweep"></div>
      </div>
      <div className="shovel-icon">
        <img src={Image} alt='none' />
      </div>
      <p className="radar-text">{t('Scanning for hazardous zones...')}</p>
    </div>
  );
}
