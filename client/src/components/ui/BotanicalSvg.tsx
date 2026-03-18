interface BotanicalSvgProps {
  className?: string
  variant?: 'palm' | 'hibiscus' | 'leaf'
}

export function BotanicalSvg({ className = '', variant = 'palm' }: BotanicalSvgProps) {
  if (variant === 'palm') {
    return (
      <svg className={className} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 280C100 280 60 200 30 160C0 120 10 80 40 60C70 40 100 80 100 80C100 80 130 40 160 60C190 80 200 120 170 160C140 200 100 280 100 280Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M100 280V80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M100 200C80 180 50 170 30 160"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M100 200C120 180 150 170 170 160"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M100 150C85 135 60 120 40 110"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M100 150C115 135 140 120 160 110"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    )
  }

  if (variant === 'hibiscus') {
    return (
      <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 60C100 60 85 30 100 15C115 30 100 60 100 60Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M100 60C100 60 130 45 145 55C135 70 100 60 100 60Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M100 60C100 60 125 85 120 105C105 95 100 60 100 60Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M100 60C100 60 75 85 80 105C95 95 100 60 100 60Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M100 60C100 60 70 45 55 55C65 70 100 60 100 60Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="100" cy="60" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <path d="M100 70V180" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M100 120C85 110 65 115 55 120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M100 150C115 140 135 145 145 150" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 190C50 190 20 140 15 100C10 60 30 30 50 20C70 30 90 60 85 100C80 140 50 190 50 190Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M50 190V20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
