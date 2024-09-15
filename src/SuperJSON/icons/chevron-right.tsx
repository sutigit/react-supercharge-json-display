export default function ChevronRight({ size, color}: { size: number, color: string }): JSX.Element {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.08586 5.41412C7.69534 5.80465 7.69534 6.43781 8.08586 6.82834L13.3788 12.1212L8.08586 17.4141C7.69534 17.8046 7.69534 18.4378 8.08586 18.8283L8.79297 19.5354C9.18349 19.926 9.81666 19.926 10.2072 19.5354L16.5607 13.1819C17.1465 12.5961 17.1465 11.6464 16.5607 11.0606L10.2072 4.70702C9.81666 4.31649 9.18349 4.31649 8.79297 4.70702L8.08586 5.41412Z" fill={color} />
        </svg>
    )
}