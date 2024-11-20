import Container from '@components/(shared)/custom/container'

import { satisfyFont } from '@utils/fonts'

export default function NotFoundPage() {
  return (
    <Container className="min-h-screen flex flex-col text-center items-center justify-center gap-2">
      <h1
        className={`text-8xl md:text-9xl text-amber-400 font-bold`}
        style={{
          textShadow: '4px 4px 10px rgba(255, 255, 255, 0.1)',
        }}
      >
        404
      </h1>
      <span className="max-w-[500px] text-amber-50/50 text-sm md:text-lg font-light">
        The page that you are trying to reach is nowhere to be seen! Try again
        later.
      </span>
      <a
        href="/"
        className="mt-4 text-amber-50/50 py-2 px-6 border-[1px] border-amber-400 rounded-lg hover:bg-amber-400/30 hover:text-white hover:font-bold md:hover:px-8 md:hover:gap-4 transition-all ease-in-out duration-300"
      >
        Go Back!
      </a>
    </Container>
  )
}
