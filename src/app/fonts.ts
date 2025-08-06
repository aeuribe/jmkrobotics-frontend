import localFont from 'next/font/local'

export const satoshi = localFont({
  src: [
    {
      path: '../app/fonts/satoshi/Satoshi-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})
