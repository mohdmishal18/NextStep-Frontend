import logoUrl from '../../../public/logos/NextStepBlackWhite.svg';

const BlackWhiteLogo = () => {
  return (
    <div>
      <img src={logoUrl} alt="Black and White Logo" className="w-28 h-28"/> {/* Tailwind classes */}
    </div>
  );
};

export default BlackWhiteLogo;