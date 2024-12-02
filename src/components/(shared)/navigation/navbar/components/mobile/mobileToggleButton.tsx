import { BiGridSmall, BiX } from 'react-icons/bi'

interface MobileToggleButtonProps {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const MobileToggleButton = ({ isOpen, setOpen }: MobileToggleButtonProps) => {
  const handleStatus = () => setOpen(!isOpen)

  return (
    <button
      className={`relative md:hidden flex items-center justify-center w-12 h-12 text-zinc-100 rounded-lg p-2 border shadow-xl bg-amber-400 border-amber-500 transition-all duration-300 ease-in-out hover:shadow-2xl hover:brightness-110 active:scale-90 overflow-hidden`}
      onClick={handleStatus}
    >
      {isOpen ? <BiX size={30} /> : <BiGridSmall size={30} />}
    </button>
  )
}

export default MobileToggleButton
