import { useState } from 'react';
import { useCTATracking } from '../hooks/useTracking';
import EliteContactModal from './EliteContactModal';

interface EliteModalButtonProps {
  readonly label: string;
  readonly location: string;
  readonly className?: string;
}

const DEFAULT_CLASSES =
  'inline-flex min-h-[44px] items-center rounded-full border border-ink/25 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5';

const EliteModalButton = ({ label, location, className = DEFAULT_CLASSES }: EliteModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackCTA } = useCTATracking();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackCTA('elite_contact_modal_button', label, location, {
            button_location: location,
            plan_type: 'elite',
          });
          setIsOpen(true);
        }}
        className={className}
      >
        {label}
      </button>
      <EliteContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EliteModalButton;
