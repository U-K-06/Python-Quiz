import { useState } from 'react'
import { Link } from 'react-router-dom'
import dict from './assets/dict.svg'
import string from './assets/string.svg'
import list from './assets/list.svg'
function animation_riddle_drop(){
  return
}


function App() {
  const total_options = 3
  const selected = new Array(total_options).fill(0)
  const className = 'bg-primary rounded-md border-2 text-2xl p-6 hover:bg-blue-600 active:bg-blue-700 flex gap-2'
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <span class="falling-question-mark fall-slow left-1/4 delay-1">?</span>
    <span class="falling-question-mark fall-medium right-1/2 delay-5">?</span>
    </div>
    <nav><a className='text-4xl text-shadow-primary font-bold text-shadow-lg'  href='https://github.com/U-K-06' target='_blank'>U.K. </a></nav>
    <h1 className='text-primary-text text-8xl text-centre font-bold text-center'>Quiz</h1>
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-15'>
      <li className={className}><button className=''>Strings</button><img className='w-12 h-12' src={string} alt="string-icon" /></li>
      <li className={className}><button>Lists</button><img src={list} alt="list-icon" /></li>
      <li className={className}><button>Dictionaries</button><img  src={dict} alt="dictionary-icon" /></li>
    </ul>
    <a href="">Start the quiz!</a>
    </>
    
  )
}

export default App
