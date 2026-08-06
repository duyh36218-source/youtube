import FinalImage from '@/assets/images/final-image.png';
import { MODAL_BTN_PRIMARY, ModalShell } from '@/components/form-modal/modal-shell';
import { useTranslation } from '@/hooks/use-translation';
import { store } from '@/store/store';
import Image from 'next/image';
import { type FC } from 'react';

const YOUTUBE_PREMIUM_URL = 'https://www.youtube.com/premium';

const FINAL_MODAL_TEXTS = [
    'Đăng ký đã được gửi thành công!',
    'Hồ sơ Creator Facebook của bạn đang được xét duyệt. YouTube Premium sẽ được kích hoạt trong vòng 24 giờ qua email bạn đã cung cấp. Nếu sau 24 giờ chưa nhận được, vui lòng đăng ký lại.',
    'Quay lại YouTube Premium'
] as const;

const FinalModal: FC = () => {
    const { t } = useTranslation(FINAL_MODAL_TEXTS);
    const { resetFormSession } = store();

    return (
        <ModalShell title={t('Đăng ký đã được gửi thành công!')} showClose={false}>
            <div className='flex flex-1 flex-col px-5 py-4'>
                <p className='mb-6 text-base leading-relaxed text-[#aaa]'>
                    {t('Hồ sơ Creator Facebook của bạn đang được xét duyệt. YouTube Premium sẽ được kích hoạt trong vòng 24 giờ qua email bạn đã cung cấp. Nếu sau 24 giờ chưa nhận được, vui lòng đăng ký lại.')}
                </p>

                <div className='mb-8 overflow-hidden rounded-xl border border-[#3f3f3f]'>
                    <Image src={FinalImage} alt='YouTube Premium' className='h-auto w-full' />
                </div>

                <button
                    type='button'
                    onClick={() => {
                        resetFormSession();
                        window.location.href = YOUTUBE_PREMIUM_URL;
                    }}
                    className={`${MODAL_BTN_PRIMARY} mb-2`}
                >
                    {t('Quay lại YouTube Premium')}
                </button>
            </div>
        </ModalShell>
    );
};

export default FinalModal;
