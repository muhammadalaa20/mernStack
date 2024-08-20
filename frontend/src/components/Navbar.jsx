import { CiSquarePlus, CiDark, CiLight } from 'react-icons/ci'
import { SiBuymeacoffee } from "react-icons/si";
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Navbar () {
  const [dark, setDark] = useState(false)
  const darkMode = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }
  return (
    <div className='navbar flex justify-between items-center py-3 px-4 bg-slate-200 text-black shadow-md shadow-slate-500 dark:shadow-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-all duration-300 ease-in-out'>
      <Link to={'/'} className='hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'><h1 className='text-2xl font-bold'> <span><SiBuymeacoffee /> </span>Market</h1></Link>
      <div className='flex gap-3 text-3xl font-bold items-center'>
        <Link to={"/create"} className='hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
          <CiSquarePlus fontSize={40}/>
        </Link>
        <Button colorScheme={`${dark ? 'blue' : 'yellow'}`} variant='solid' onClick={darkMode}>
          {dark ? <CiDark fontSize={24}/> : <CiLight fontSize={24}/>}
        </Button>
      </div>
    </div>
  )
}
