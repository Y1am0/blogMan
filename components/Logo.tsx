import React from 'react'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 95 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
    >
      <path d="M92 11.0092H93.8482V0.990826H92V0H95V12H92V11.0092Z" fill="#FAFF0E"/>
      <path d="M88.5394 3C88.6994 3 88.8354 3.056 88.9474 3.168L89.8114 4.032C89.9234 4.144 89.9794 4.28 89.9794 4.44V4.68C89.9794 4.888 89.9234 5.06 89.8114 5.196C89.6994 5.332 89.5554 5.4 89.3794 5.4C89.2034 5.4 89.0594 5.344 88.9474 5.232C88.8354 5.12 88.7794 4.976 88.7794 4.8V4.2H85.7794V5.76L88.5394 6.24C88.6194 6.256 88.6914 6.276 88.7554 6.3C88.8274 6.316 88.8914 6.352 88.9474 6.408L89.8114 7.272C89.9234 7.384 89.9794 7.52 89.9794 7.68V8.76C89.9794 8.92 89.9234 9.056 89.8114 9.168L88.9474 10.032C88.8354 10.144 88.6994 10.2 88.5394 10.2H86.0194C85.8594 10.2 85.7234 10.144 85.6114 10.032L84.7474 9.168C84.6354 9.056 84.5794 8.92 84.5794 8.76V8.52C84.5794 8.312 84.6354 8.14 84.7474 8.004C84.8594 7.868 85.0034 7.8 85.1794 7.8C85.3554 7.8 85.4994 7.856 85.6114 7.968C85.7234 8.08 85.7794 8.224 85.7794 8.4V9H88.7794V7.44L86.0194 6.96C85.9394 6.944 85.8674 6.928 85.8034 6.912C85.7394 6.896 85.6754 6.856 85.6114 6.792L84.7474 5.928C84.6354 5.816 84.5794 5.68 84.5794 5.52V4.44C84.5794 4.28 84.6354 4.144 84.7474 4.032L85.6114 3.168C85.7234 3.056 85.8594 3 86.0194 3H88.5394Z" fill="white"/>
      <path d="M77 10.3125C77 10.1475 77.0519 10.0125 77.1556 9.9075C77.2593 9.8025 77.3926 9.75 77.5556 9.75C77.7185 9.75 77.8519 9.8025 77.9556 9.9075C78.0593 10.0125 78.1111 10.1475 78.1111 10.3125V10.875H80.8889V8.625H78.3333C78.1852 8.625 78.0593 8.5725 77.9556 8.4675L77.1556 7.6575C77.0519 7.5525 77 7.425 77 7.275V3.675C77 3.48 77.0519 3.31875 77.1556 3.19125C77.2593 3.06375 77.3926 3 77.5556 3C77.7185 3 77.8519 3.06375 77.9556 3.19125C78.0593 3.31875 78.1111 3.48 78.1111 3.675V7.5H80.8889V3.675C80.8889 3.48 80.9407 3.31875 81.0444 3.19125C81.1481 3.06375 81.2815 3 81.4444 3C81.6074 3 81.7407 3.06375 81.8444 3.19125C81.9481 3.31875 82 3.48 82 3.675V10.65C82 10.8 81.9481 10.9275 81.8444 11.0325L81.0444 11.8425C80.9407 11.9475 80.8148 12 80.6667 12H78.3333C78.1852 12 78.0593 11.9475 77.9556 11.8425L77.1556 11.0325C77.0519 10.9275 77 10.8 77 10.65V10.3125Z" fill="white"/>
      <path d="M69.885 10.2C69.725 10.2 69.589 10.144 69.477 10.032L68.613 9.168C68.501 9.056 68.445 8.92 68.445 8.76V7.44C68.445 7.28 68.501 7.144 68.613 7.032L69.477 6.168C69.589 6.056 69.725 6 69.885 6H72.645V4.2H69.645V4.68C69.645 4.888 69.589 5.06 69.477 5.196C69.365 5.332 69.221 5.4 69.045 5.4C68.869 5.4 68.725 5.332 68.613 5.196C68.501 5.06 68.445 4.888 68.445 4.68V4.44C68.445 4.28 68.501 4.144 68.613 4.032L69.477 3.168C69.589 3.056 69.725 3 69.885 3H72.405C72.565 3 72.701 3.056 72.813 3.168L73.677 4.032C73.789 4.144 73.845 4.28 73.845 4.44V9.48C73.845 9.688 73.777 9.86 73.641 9.996C73.505 10.132 73.333 10.2 73.125 10.2H69.885ZM69.645 9H72.645V7.2H69.645V9Z" fill="white"/>
      <path d="M65.6902 3C65.8982 3 66.0702 3.056 66.2062 3.168C66.3421 3.28 66.4102 3.424 66.4102 3.6C66.4102 3.776 66.3421 3.92 66.2062 4.032C66.0702 4.144 65.8982 4.2 65.6902 4.2H63.4102V9.48C63.4102 9.688 63.3542 9.86 63.2422 9.996C63.1302 10.132 62.9862 10.2 62.8102 10.2C62.6342 10.2 62.4902 10.132 62.3782 9.996C62.2662 9.86 62.2102 9.688 62.2102 9.48V4.44C62.2102 4.28 62.2662 4.144 62.3782 4.032L63.2422 3.168C63.3542 3.056 63.4902 3 63.6502 3H65.6902Z" fill="white"/>
      <path d="M59.3339 3C59.5419 3 59.7139 3.056 59.8499 3.168C59.9859 3.28 60.0539 3.424 60.0539 3.6C60.0539 3.776 59.9859 3.92 59.8499 4.032C59.7139 4.144 59.5419 4.2 59.3339 4.2H57.0539V9.48C57.0539 9.688 56.9979 9.86 56.8859 9.996C56.7739 10.132 56.6299 10.2 56.4539 10.2C56.2779 10.2 56.1339 10.132 56.0219 9.996C55.9099 9.86 55.8539 9.688 55.8539 9.48V4.44C55.8539 4.28 55.9099 4.144 56.0219 4.032L56.8859 3.168C56.9979 3.056 57.1339 3 57.2939 3H59.3339Z" fill="white"/>
      <path d="M48.7772 10.2C48.6172 10.2 48.4812 10.144 48.3692 10.032L47.5052 9.168C47.3932 9.056 47.3372 8.92 47.3372 8.76V7.44C47.3372 7.28 47.3932 7.144 47.5052 7.032L48.3692 6.168C48.4812 6.056 48.6172 6 48.7772 6H51.5372V4.2H48.5372V4.68C48.5372 4.888 48.4812 5.06 48.3692 5.196C48.2572 5.332 48.1132 5.4 47.9372 5.4C47.7612 5.4 47.6172 5.332 47.5052 5.196C47.3932 5.06 47.3372 4.888 47.3372 4.68V4.44C47.3372 4.28 47.3932 4.144 47.5052 4.032L48.3692 3.168C48.4812 3.056 48.6172 3 48.7772 3H51.2972C51.4572 3 51.5932 3.056 51.7052 3.168L52.5692 4.032C52.6812 4.144 52.7372 4.28 52.7372 4.44V9.48C52.7372 9.688 52.6692 9.86 52.5332 9.996C52.3972 10.132 52.2252 10.2 52.0172 10.2H48.7772ZM48.5372 9H51.5372V7.2H48.5372V9Z" fill="white"/>
      <path d="M44.393 9.48C44.393 9.688 44.337 9.86 44.225 9.996C44.113 10.132 43.969 10.2 43.793 10.2C43.617 10.2 43.473 10.132 43.361 9.996C43.249 9.86 43.193 9.688 43.193 9.48V4.2H40.193V9.48C40.193 9.688 40.137 9.86 40.025 9.996C39.913 10.132 39.769 10.2 39.593 10.2C39.417 10.2 39.273 10.132 39.161 9.996C39.049 9.86 38.993 9.688 38.993 9.48V3.72C38.993 3.512 39.061 3.34 39.197 3.204C39.333 3.068 39.505 3 39.713 3H42.953C43.113 3 43.249 3.056 43.361 3.168L44.225 4.032C44.337 4.144 44.393 4.28 44.393 4.44V9.48Z" fill="white"/>
      <path d="M34.6687 4.2H31.6687V9H34.6687V4.2ZM30.4688 4.44C30.4688 4.28 30.5247 4.144 30.6367 4.032L31.5007 3.168C31.6127 3.056 31.7488 3 31.9088 3H34.4288C34.5888 3 34.7247 3.056 34.8367 3.168L35.7008 4.032C35.8128 4.144 35.8687 4.28 35.8687 4.44V8.76C35.8687 8.92 35.8128 9.056 35.7008 9.168L34.8367 10.032C34.7247 10.144 34.5888 10.2 34.4288 10.2H31.9088C31.7488 10.2 31.6127 10.144 31.5007 10.032L30.6367 9.168C30.5247 9.056 30.4688 8.92 30.4688 8.76V4.44Z" fill="#FAFF0E"/>
      <path d="M27.3516 9.48C27.3516 9.688 27.2956 9.86 27.1836 9.996C27.0716 10.132 26.9276 10.2 26.7516 10.2C26.5756 10.2 26.4316 10.132 26.3196 9.996C26.2076 9.86 26.1516 9.688 26.1516 9.48V3.72C26.1516 3.512 26.2076 3.34 26.3196 3.204C26.4316 3.068 26.5756 3 26.7516 3C26.9276 3 27.0716 3.068 27.1836 3.204C27.2956 3.34 27.3516 3.512 27.3516 3.72V9.48Z" fill="white"/>
      <path d="M21.7706 3C21.9306 3 22.0666 3.056 22.1786 3.168
L23.0426 4.032C23.1546 4.144 23.2106 4.28 23.2106 4.44V4.68C23.2106 4.888 23.1546 5.06 23.0426 5.196C22.9306 5.332 22.7866 5.4 22.6106 5.4C22.4346 5.4 22.2906 5.344 22.1786 5.232C22.0666 5.12 22.0106 4.976 22.0106 4.8V4.2H19.0106V5.76L21.7706 6.24C21.8506 6.256 21.9226 6.276 21.9866 6.3C22.0586 6.316 22.1226 6.352 22.1786 6.408L23.0426 7.272C23.1546 7.384 23.2106 7.52 23.2106 7.68V8.76C23.2106 8.92 23.1546 9.056 23.0426 9.168L22.1786 10.032C22.0666 10.144 21.9306 10.2 21.7706 10.2H19.2506C19.0906 10.2 18.9546 10.144 18.8426 10.032L17.9786 9.168C17.8666 9.056 17.8106 8.92 17.8106 8.76V8.52C17.8106 8.312 17.8666 8.14 17.9786 8.004C18.0906 7.868 18.2346 7.8 18.4106 7.8C18.5866 7.8 18.7306 7.856 18.8426 7.968C18.9546 8.08 19.0106 8.224 19.0106 8.4V9H22.0106V7.44L19.2506 6.96C19.1706 6.944 19.0986 6.928 19.0346 6.912C18.9706 6.896 18.9066 6.856 18.8426 6.792L17.9786 5.928C17.8666 5.816 17.8106 5.68 17.8106 5.52V4.44C17.8106 4.28 17.8666 4.144 17.9786 4.032L18.8426 3.168C18.9546 3.056 19.0906 3 19.2506 3H21.7706Z" fill="white"/>
      <path d="M14.8734 9.48C14.8734 9.688 14.8174 9.86 14.7054 9.996C14.5934 10.132 14.4494 10.2 14.2734 10.2C14.0974 10.2 13.9534 10.132 13.8414 9.996C13.7294 9.86 13.6734 9.688 13.6734 9.48V3.72C13.6734 3.512 13.7294 3.34 13.8414 3.204C13.9534 3.068 14.0974 3 14.2734 3C14.4494 3 14.5934 3.068 14.7054 3.204C14.8174 3.34 14.8734 3.512 14.8734 3.72V9.48Z" fill="white"/>
      <path d="M10.5492 8.76C10.5492 8.92 10.4932 9.056 10.3812 9.168L9.51722 10.032C9.40522 10.144 9.26922 10.2 9.10922 10.2H6.58922C6.42922 10.2 6.29322 10.144 6.18122 10.032L5.31722 9.168C5.20522 9.056 5.14922 8.92 5.14922 8.76V3.72C5.14922 3.512 5.20522 3.34 5.31722 3.204C5.42922 3.068 5.57322 3 5.74922 3C5.92522 3 6.06922 3.068 6.18122 3.204C6.29322 3.34 6.34922 3.512 6.34922 3.72V9H9.34922V3.72C9.34922 3.512 9.40522 3.34 9.51722 3.204C9.62922 3.068 9.77322 3 9.94922 3C10.1252 3 10.2692 3.068 10.3812 3.204C10.4932 3.34 10.5492 3.512 10.5492 3.72V8.76Z" fill="white"/>
      <path d="M3 12H0V0H3V0.990826H1.15179V11.0092H3V12Z" fill="#FAFF0E"/>
    </svg>
  )
}
