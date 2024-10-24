import { Montserrat, Satisfy } from 'next/font/google'

const montserratFont = Montserrat({ subsets: ['latin'] })

const satisfyFont = Satisfy({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  preload: true,
})

export { montserratFont, satisfyFont }
