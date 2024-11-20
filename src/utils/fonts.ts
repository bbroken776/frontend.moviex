import { Montserrat, Satisfy, Moul, Krub } from 'next/font/google'

const montserratFont = Montserrat({ subsets: ['latin'] })

const satisfyFont = Satisfy({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  preload: true,
})

const moulFont = Moul({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  preload: true,
})

const krubFont = Krub({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  preload: true,
})

export { montserratFont, satisfyFont, moulFont, krubFont }
