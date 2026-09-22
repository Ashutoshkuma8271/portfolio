import React from 'react';
import { EnquiryModal } from '../enquiry/EnquiryModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** Media enquiry. Thin wrapper over the shared EnquiryModal. */
export const MediaInquiryModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <EnquiryModal kind="media" isOpen={isOpen} onClose={onClose} />
);
