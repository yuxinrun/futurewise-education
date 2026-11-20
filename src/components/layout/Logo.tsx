export function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className="brand__mark">
      <circle cx="24" cy="24" r="22" stroke="#243C35" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="17" stroke="#B99A61" strokeWidth="1" opacity="0.6" />
      <path d="M10 30h28" stroke="#243C35" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 30V16" stroke="#243C35" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 22c0-5 3.5-8 8-8 0 5-3.5 8-8 8z" fill="#243C35" />
      <path d="M24 25c0-4-2.8-6.4-6.4-6.4 0 4 2.8 6.4 6.4 6.4z" fill="#84978A" />
      <circle cx="24" cy="13" r="2.2" fill="#B99A61" />
    </svg>
  )
}
