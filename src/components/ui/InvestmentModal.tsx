import React from 'react';
import { EnquiryModal } from '../enquiry/EnquiryModal';
import type { InvestSectorId } from '../../data/investSectors';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSector?: InvestSectorId | null;
}

/** Investor enquiry. Thin wrapper over the shared, theme-aware EnquiryModal. */
export const InvestmentModal: React.FC<Props> = ({ isOpen, onClose, initialSector }) => (
  <EnquiryModal kind="investment" isOpen={isOpen} onClose={onClose} initialSector={initialSector} />
);
