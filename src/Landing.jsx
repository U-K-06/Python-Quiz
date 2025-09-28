import { useState } from 'react'
import { Link,Routes } from 'react-router-dom'

import dict from './assets/dict.svg'
import string from './assets/string.svg'
import list from './assets/list.svg'
import githubIcon from './assets/github.svg'
import linkedinIcon from './assets/linkedin.svg'
import xIcon from './assets/twitter-x.svg'

function Landing() { 
  const total_options = 3
  const selected = new Array(total_options).fill(0)
  const [isSelected, setIsSelected] = useState(selected)
  const selectTopic = (i) => {
    setIsSelected(prevSelected => {
      const selected = [...prevSelected]
      selected[i] = selected[i] == 0?1:0
      return selected
    })
  }
  const className = `sm:text-lg lg:text-4xl rounded-md border-2 text-2xl p-6 hover:bg-blue-600 active:bg-blue-700 flex gap-2 justify-center cursor-pointer`

  return (
    <>
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <span class="falling-question-mark fall-slow left-1/4 delay-1">?</span>
        <span class="falling-question-mark fall-slow right-1/12 delay-7">?</span>
        <span class="falling-question-mark fall-slow right-1/3 delay-4">?</span>

        <span class="falling-question-mark fall-medium right-1/2 delay-5">?</span>
        <span class="falling-question-mark fall-medium right-1/5 delay-2">?</span>
        <span class="falling-question-mark fall-medium left-1/3 delay-6">?</span>

        <span class="falling-question-mark fall-fast right-2/4 delay-3">?</span>
        <span class="falling-question-mark fall-fast left-4/5 delay-1">?</span>

        <span class="falling-question-mark fall-medium left-1/10" style={{ animationDelay: '9s' }}>?</span>

        <span class="falling-question-mark fall-fast right-3/4" style={{ animationDelay: '0s' }}>?</span>

      </div>
      <nav><a className='sm:text-lg lg:text-4xl text-shadow-primary font-bold text-shadow-lg' href='https://github.com/U-K-06' target='_blank'>U.K. </a></nav>
      <h1 className='text-primary-text text-6xl text-centre font-bold text-center'>Read to test your Python Knowledge?</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-15'>
        <li onClick={()=>selectTopic(0)} className={`${className} ${isSelected[0] ? '!bg-correct' : '!bg-primary'}`}><button className='text-3xl cursor-pointer'>Strings</button><img className='w-12 h-12 border-2' src={string} alt="string-icon" /></li>
        <li onClick={()=>selectTopic(1)} className={`${className} ${isSelected[1] ? '!bg-correct' : '!bg-primary'}`}><button className='cursor-pointer'>Lists</button><img src={list} alt="list-icon" /></li>
        <li onClick={()=>selectTopic(2)} className={`${className} ${isSelected[2] ? '!bg-correct' : '!bg-primary'}`}><button className='cursor-pointer'>Dictionaries</button><img src={dict} alt="dictionary-icon" /></li>
      </ul>
      <Link to={'./Questions'} className={className + ' bg-primary'} state={{selectedCats:selected}}>Start the quiz!</Link>

<footer className='bg-card-option-default py-4 mt-auto fixed bottom-0 w-full left-0 items-center'>
  <ul className='flex justify-evenly mb-2'>
    <li><a href="https://github.com/U-K-06" target='_blank'><img className='w-8 h-8' src={githubIcon} alt="icon"/></a></li>
    <li><a href="www.linkedin.com/in/utkarsh-khajuria-495b8831a" target='_blank'><img className='w-8 h-8' src={linkedinIcon} alt="" /></a></li>
    <li><a href="https://x.com/UK_06__" target='_blank'><img className='w-8 h-8' src={xIcon} alt="" /></a></li>
  </ul>

  <div className="text-center text-sm text-text-secondary">
    &copy; {new Date().getFullYear()} Utkarsh Khajuria. All rights reserved.
  </div>
</footer>
      
    </>
  )
}
export default Landing