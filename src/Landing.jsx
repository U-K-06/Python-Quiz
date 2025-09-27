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
  const className = 'bg-primary rounded-md border-2 text-2xl p-6 hover:bg-blue-600 active:bg-blue-700 flex gap-2 justify-center'
  const [count, setCount] = useState(0)

  return (
    <>
<div class="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Slow falls, spread out timing */}
    <span class="falling-question-mark fall-slow left-1/4 delay-1">?</span>
    <span class="falling-question-mark fall-slow right-1/12 delay-7">?</span>
    <span class="falling-question-mark fall-slow right-1/3 delay-4">?</span>

    {/* Medium falls, varied timing */}
    <span class="falling-question-mark fall-medium right-1/2 delay-5">?</span>
    <span class="falling-question-mark fall-medium right-1/5 delay-2">?</span>
    <span class="falling-question-mark fall-medium left-1/3 delay-6">?</span>
    
    {/* Fast falls, quick timing */}
    <span class="falling-question-mark fall-fast right-2/4 delay-3">?</span>
    <span class="falling-question-mark fall-fast left-4/5 delay-1">?</span>
    
    {/* Custom timed/positioned mark (using inline style for unique timing) */}
    <span class="falling-question-mark fall-medium left-1/10" style={{ animationDelay: '9s' }}>?</span>
    
    {/* Another one for good measure */}
    <span class="falling-question-mark fall-fast right-3/4" style={{ animationDelay: '0s' }}>?</span>
</div>
    <nav><a className='text-4xl text-shadow-primary font-bold text-shadow-lg'  href='https://github.com/U-K-06' target='_blank'>U.K. </a></nav>
    <h1 className='text-primary-text text-8xl text-centre font-bold text-center'>Quiz</h1>
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-15'>
      <li className={className}><button className='text-3xl'>Strings</button><img className='w-12 h-12 border-2' src={string} alt="string-icon" /></li>
      <li className={className}><button>Lists</button><img src={list} alt="list-icon" /></li>
      <li className={className}><button>Dictionaries</button><img  src={dict} alt="dictionary-icon" /></li>
    </ul>
    <a href="">Start the quiz!</a>
    </>
    
  )
}

export default App
