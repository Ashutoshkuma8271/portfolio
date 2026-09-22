import React from 'react';
import { EnquiryModal } from '../enquiry/EnquiryModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** Collaboration enquiry. Thin wrapper over the shared EnquiryModal. */
export const CollaborateModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <EnquiryModal kind="collaborate" isOpen={isOpen} onClose={onClose} />
);
