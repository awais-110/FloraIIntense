export function WhatsAppBrandIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#25D366"
        d="M16.02 3.2c-7.05 0-12.78 5.67-12.78 12.66 0 2.23.59 4.42 1.72 6.35L3.13 28.8l6.79-1.78a12.9 12.9 0 0 0 6.1 1.55c7.05 0 12.78-5.67 12.78-12.66S23.07 3.2 16.02 3.2Z"
      />
      <path
        fill="#FFFFFF"
        d="M23.5 19.12c-.33-.17-1.97-.96-2.28-1.07-.31-.11-.53-.17-.76.17-.22.33-.87 1.06-1.07 1.28-.2.22-.4.25-.73.08-.33-.17-1.4-.51-2.67-1.63-.99-.87-1.65-1.95-1.85-2.28-.2-.33-.02-.51.15-.68.15-.15.33-.4.5-.6.17-.2.22-.33.33-.56.11-.22.06-.42-.03-.59-.08-.17-.76-1.82-1.04-2.5-.27-.65-.55-.56-.76-.57h-.65c-.22 0-.59.08-.9.42-.31.33-1.18 1.15-1.18 2.81 0 1.66 1.21 3.26 1.38 3.48.17.22 2.38 3.62 5.77 5.08.81.35 1.44.56 1.93.71.81.26 1.55.22 2.13.13.65-.1 1.97-.8 2.25-1.57.28-.77.28-1.43.2-1.57-.08-.14-.31-.22-.64-.39Z"
      />
    </svg>
  );
}

export function CartBrandIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="#D7B46A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 10h19l-2.2 9.4a3 3 0 0 1-2.9 2.3H12.3a3 3 0 0 1-2.9-2.35L6.7 6.9H3.8"
      />
      <circle cx="13" cy="26" r="2" fill="#D7B46A" />
      <circle cx="23" cy="26" r="2" fill="#D7B46A" />
    </svg>
  );
}
