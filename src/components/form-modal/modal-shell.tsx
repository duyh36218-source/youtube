'use client';

import YoutubePremiumLogo from '@/assets/images/youtube-premium-logo.png';
import { store } from '@/store/store';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

export const MODAL_INPUT_CLASS =
    'youtube-modal-input h-[50px] w-full rounded-lg border border-[#3f3f3f] bg-[#212121] px-3 py-2 text-base text-white placeholder:text-[#717171] transition-colors focus:border-[#3ea6ff] focus:shadow-[0_0_0_3px_rgba(62,166,255,0.15)]';

export const MODAL_TEXTAREA_CLASS =
    'youtube-modal-input min-h-[100px] w-full rounded-lg border border-[#3f3f3f] bg-[#212121] px-3 py-2 text-base text-white placeholder:text-[#717171] transition-colors focus:border-[#3ea6ff] focus:shadow-[0_0_0_3px_rgba(62,166,255,0.15)]';

export const MODAL_BTN_PRIMARY =
    'flex h-[50px] w-full items-center justify-center rounded-full bg-[#3ea6ff] text-sm font-medium text-[#0f0f0f] transition-all hover:bg-[#65b8ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#3ea6ff]';

export const MODAL_LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-[#aaa]';

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
            <div className={`youtube-modal flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#212121] shadow-2xl ${className}`}>
                {(title || showClose) && (
                    <div className='flex items-start justify-between gap-4 border-b border-[#3f3f3f] px-5 pt-5 pb-4'>
                        <div>
                            {title && <h2 className='text-2xl font-bold text-white'>{title}</h2>}
                            {subtitle && (
                                <div className='mt-2 flex items-center gap-2'>
                                    <Image src={YoutubePremiumLogo} alt='YouTube Premium' width={100} height={16} className='h-4 w-auto' />
                                    <span className='text-sm text-[#aaa]'>{subtitle}</span>
                                </div>
                            )}
                        </div>
                        {showClose && (
                            <button
                                type='button'
                                onClick={handleClose}
                                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3f3f3f] text-[#aaa] transition-colors hover:border-[#3ea6ff]/40 hover:bg-[#2a2a2a] hover:text-white'
                                aria-label='Close modal'
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </div>
                )}
                <div className='flex flex-1 flex-col overflow-y-auto'>{children}</div>
                <div className='flex items-center justify-center border-t border-[#3f3f3f] px-5 py-4'>
                    <Image src={YoutubePremiumLogo} alt='YouTube Premium' width={100} height={16} className='h-4 w-auto opacity-70' />
                </div>
            </div>
        </div>
    );
};

export const ModalSpinner = () => (
    <div className='h-5 w-5 animate-spin rounded-full border-2 border-[#0f0f0f] border-b-transparent border-l-transparent' />
);
