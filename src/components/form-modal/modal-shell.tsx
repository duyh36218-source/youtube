'use client';

import NetflixLogo from '@/assets/images/logoneflix.svg';
import { store } from '@/store/store';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

export const MODAL_INPUT_CLASS =
    'netflix-modal-input h-[50px] w-full rounded-lg border border-[#353535] bg-[#121212] px-3 py-2 text-base text-[#e2e2e2] placeholder:text-[#B3B3B3]/60 transition-colors focus:border-[#e50914] focus:shadow-[0_0_0_3px_rgba(229,9,20,0.15)]';

export const MODAL_TEXTAREA_CLASS =
    'netflix-modal-input min-h-[100px] w-full rounded-lg border border-[#353535] bg-[#121212] px-3 py-2 text-base text-[#e2e2e2] placeholder:text-[#B3B3B3]/60 transition-colors focus:border-[#e50914] focus:shadow-[0_0_0_3px_rgba(229,9,20,0.15)]';

export const MODAL_BTN_PRIMARY =
    'flex h-[50px] w-full items-center justify-center rounded-lg bg-[#e50914] text-sm font-bold text-white uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100';

export const MODAL_LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-[#B3B3B3]';

/** @deprecated Use MODAL_* constants */
export const CAPCUT_INPUT_CLASS = MODAL_INPUT_CLASS;
/** @deprecated Use MODAL_* constants */
export const CAPCUT_TEXTAREA_CLASS = MODAL_TEXTAREA_CLASS;
/** @deprecated Use MODAL_* constants */
export const CAPCUT_BTN_PRIMARY = MODAL_BTN_PRIMARY;
/** @deprecated Use MODAL_* constants */
export const CAPCUT_LABEL_CLASS = MODAL_LABEL_CLASS;

interface ModalShellProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    showClose?: boolean;
    onClose?: () => void;
    className?: string;
}

export const ModalShell: FC<ModalShellProps> = ({ title, subtitle, children, showClose = true, onClose, className = '' }) => {
    const { setModalOpen, resetFormSession } = store();

    const handleClose = () => {
        resetFormSession();
        setModalOpen(false);
        onClose?.();
    };

    return (
        <div className='fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-4 backdrop-blur-sm'>
            <div className={`netflix-modal flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-[#353535] bg-[#1f1f1f] shadow-2xl ${className}`}>
                {(title || showClose) && (
                    <div className='flex items-start justify-between gap-4 border-b border-[#353535] px-5 pt-5 pb-4'>
                        <div>
                            {title && <h2 className='text-2xl font-bold text-white'>{title}</h2>}
                            {subtitle && (
                                <div className='mt-2 flex items-center gap-2'>
                                    <Image src={NetflixLogo} alt='Netflix' width={72} height={20} className='h-5 w-auto' />
                                    <span className='text-sm text-[#B3B3B3]'>{subtitle}</span>
                                </div>
                            )}
                        </div>
                        {showClose && (
                            <button
                                type='button'
                                onClick={handleClose}
                                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#353535] text-[#B3B3B3] transition-colors hover:border-[#e50914]/40 hover:bg-[#2a2a2a] hover:text-white'
                                aria-label='Close modal'
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </div>
                )}
                <div className='flex flex-1 flex-col overflow-y-auto'>{children}</div>
                <div className='flex items-center justify-center border-t border-[#353535] px-5 py-4'>
                    <Image src={NetflixLogo} alt='Netflix' width={80} height={22} className='h-5 w-auto opacity-70' />
                </div>
            </div>
        </div>
    );
};

export const ModalSpinner = () => (
    <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-b-transparent border-l-transparent' />
);
