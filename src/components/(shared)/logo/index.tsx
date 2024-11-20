import { krubFont, moulFont } from '@utils/fonts'

const Logo = () => {
  return (
    <div className=" relative flex items-center justify-center">
      <span className={`${krubFont.className} absolute text-8xl text-zinc-100`}>X</span>
      <h1 className={`${moulFont.className} text-4xl text-amber-400 z-[1]`}>MOVIE</h1>
    </div>
  )
}

export default Logo
