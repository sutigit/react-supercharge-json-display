export default function ChevronUp(size: number, color: string): JSX.Element {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 15.9142C5.39052 16.3047 6.02369 16.3047 6.41421 15.9142L11.7071 10.6213L17 15.9142C17.3905 16.3047 18.0237 16.3047 18.4142 15.9142L19.1213 15.2071C19.5118 14.8166 19.5118 14.1834 19.1213 13.7929L12.7678 7.43934C12.182 6.85355 11.2322 6.85355 10.6464 7.43934L4.29289 13.7929C3.90237 14.1834 3.90237 14.8166 4.29289 15.2071L5 15.9142Z" fill={color} />
        </svg>
    )
}