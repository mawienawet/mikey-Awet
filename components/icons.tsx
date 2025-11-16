import React from 'react';

type IconProps = {
    className?: string;
};

export const RobotIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2zM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 16a3 3 0 1 1 6 0H9z" />
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a1 1 0 1 0-2 0v4H6V6h4a1 1 0 1 0 0-2zm10-1a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V6.414l-6.293 6.293a1 1 0 0 0 1.414 1.414L19.586 7H18a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
    </svg>
);

export const AiStatusIcon: React.FC<IconProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M14.829 14.829-12 12l2.829-2.829 2.828 2.828L17.657 9.17l1.414 1.414-5.656 5.659z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const SyncIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 5.657-2.343l-1.414-1.414A5.969 5.969 0 0 1 12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6a5.962 5.962 0 0 1 4.414 1.97l-2.414 2.414H20V4l-2.543 2.543A7.957 7.957 0 0 0 12 4z" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 6.87344L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 17.1266L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.93413 16.0659L6.87344 17.1266" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.93413 7.93413L6.87344 6.87344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);


export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M16 13v-2H7v-2h9V7l4 4-4 4zm-5 7h-2v-2H5v-2h4v-2h2v2h2v-2h2v2h-2v2h-2v-2H9v2zm-4-9H3V4h2V2H3a2 2 0 0 0-2 2v7h2v-2z" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export const BombIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M15.061 8.939 12 12l-3.061-3.061-1.414 1.414L10.586 12l-3.061 3.061 1.414 1.414L12 13.414l3.061 3.061 1.414-1.414L13.414 12l3.061-3.061z" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 7.5a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V7.5zM12 15a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.47 14.47-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.65 5.66z" />
    </svg>
);

export const SkullIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.53 13.53-1.41 1.41L12 13.41l-2.12 2.12-1.41-1.41L10.59 12l-2.12-2.12 1.41-1.41L12 10.59l2.12-2.12 1.41 1.41L13.41 12l2.12 2.12z" />
    </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M13 7h-2v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
);

export const ResetIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
);

// Platform Logos
const PremierBetLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M24 4L4 24L24 44L44 24L24 4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M34 14L14 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const BetWinWinsLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 14L24 4L44 14V34L24 44L4 34V14Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M4 14L24 24L44 14M24 44V24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const GalSportLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 4C29.5228 4 34 8.47715 34 14C34 19.5228 29.5228 24 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const OneXLiteLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 14L34 34M34 14L14 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 4H40" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const MelBetLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 24H19L24 16L29 32L34 24H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const BetWinnerLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M24 4V44M4 24H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 14L14 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const LineBetLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 17.7143H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M4 30.2857H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const MegaPariLogo: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M24 4V44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PLATFORM_LOGOS: Record<string, React.FC<IconProps>> = {
    premierbet: PremierBetLogo,
    betwinwins: BetWinWinsLogo,
    galsport: GalSportLogo,
    '1xlite': OneXLiteLogo,
    melbet: MelBetLogo,
    betwinner: BetWinnerLogo,
    linebet: LineBetLogo,
    megapari: MegaPariLogo,
};

export const PlatformLogo: React.FC<{ platformId: string; className?: string }> = ({ platformId, className }) => {
    const LogoComponent = PLATFORM_LOGOS[platformId];
    return LogoComponent ? <LogoComponent className={className} /> : null;
};
