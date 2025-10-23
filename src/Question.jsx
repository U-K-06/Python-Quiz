import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  githubIcon from './assets/github.svg'
import linkedinIcon from './assets/linkedin.svg'
import xtwitterIcon from './assets/twitter-x.svg'
import rawJsonString from './questions.JSON?raw'; 
import { select_random_topic_question } from "./Landing";
const quizstateData = JSON.parse(rawJsonString);


function getQuestionByIds(quizstateData, targetTopicId, targetQuestionId) {
    const topic = quizstateData.find(topic => topic.topic_id === targetTopicId);

    if (!topic) {
        return null;
    }

    const question = topic.questions.find(q => q.id === targetQuestionId);

    if (!question) {
        return null;
    }
    return question;
}

function Question() {
  const navigate = useNavigate()
  const [isSelected, setIsSelected] = useState(null)
  const [isExplanationDisabled,setExplanation] = useState(true)
  const choose_option = (ind)=>{
    setIsSelected(ind)
  }

  useEffect(()=>{
    setExplanation((isSelected === null))
  },[isSelected])
  const optionClass =
    `bg-card-option-default border-2 border-transparent rounded-lg text-1xl sm:text-2xl lg:text-3xl w-full text-center py-4 px-6 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-text-primary ${!isExplanationDisabled?'pointer-events-none':'hover:bg-primary/20 hover:border-primary/50'}`;

  const questionId  = useParams();
  const location = useLocation();
  const stateData = location.state || {};
  if(stateData.t_id<0 || stateData.q_id<0)
  {
    navigate(
      '/Results'
    )
  }
  const a = getQuestionByIds(quizstateData,stateData.t_id,stateData.q_id)
  const get_next_function = ()=>
  {
    setIsSelected(null)
    const data = stateData.usedData 
    const selected = stateData.userSelectionIndex
    const sent = select_random_topic_question(selected,data,quizstateData)
    const questionId = sent['q_id'];
    const topicId = sent['q_type']; 
    navigate(`/Questions/${topicId}/${questionId}`, { 
      state: {
        q_id: questionId,
        t_id: topicId,
        userSelectionIndex: selected,
        usedData:data
      }
    })
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-8 lg:p-12">
        
        <div className="bg-card-question border border-border rounded-xl w-full max-w-2xl p-6 md:p-12 mt-12 mb-12 shadow-2xl shadow-black/50 space-y-8">
          
          <p className="text-center text-text-primary font-extrabold text-3xl sm:text-4xl lg:text-4xl border-b border-border/50 pb-6 mb-4">
            {a.question}
          </p>
          
          <p className={`
            border-l-8 border-primary 
            bg-card-question 
            text-text-secondary 
            p-4 rounded-md text-lg 
            shadow-inner shadow-black/30
            ${isExplanationDisabled?'hidden':''}
        `}>
            {a.explanation}
          </p>
  
 <ul className="flex flex-col space-y-4 pt-6 items-center">
    {a.options.map((option, index) => (
        <li 
            onClick={() => choose_option(index)}
            key={index} 
            className={`
                ${optionClass}

                ${(index === isSelected)
                    
                    ? (option.is_correct
                        ? 'bg-correct/80 border-correct shadow-lg shadow-correct/30 '   
                        : 'bg-wrong/80 border-wrong shadow-lg shadow-wrong/30 ')      
                    : ''
                }
                
              
            `}
        >
            {option.text}
        </li>
    ))}
</ul>
          <div className="pt-8 flex justify-center">
                      <button 
                      onClick={get_next_function}
                          className={`
                              bg-primary 
                              inline-block px-10 py-4 w-full max-w-xs
                              rounded-lg text-2xl font-bold text-gray-100 
                              shadow-2xl tracking-wider 
                              hover:bg-blue-600 active:scale-[0.98] transition-all duration-200
                              ${isExplanationDisabled?'opacity-50 pointer-events-none':'not-first-of-type:'}
                          `}
                      >
                        Next Question
                      </button>
                    </div>
        </div>
      </div>
  <footer className='bg-card-option-default py-4 mt-auto fixed bottom-0 w-full left-0 items-center'>
    <ul className='flex justify-evenly mb-2'>
      <li><a href="https://www.linkedin.com/in/utkarsh-khajuria-495b8831a" target='_blank'><img className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' src={linkedinIcon} alt="LinkedIn Icon" /></a></li>
      <li><a href="https://github.com/U-K-06" target='_blank'><img className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' src={githubIcon} alt="GitHub Icon"/></a></li>
      <li><a href="https://x.com/UK_06__" target='_blank'><img src={xtwitterIcon} className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' alt="X/Twitter Icon" /></a></li>
    </ul>

    <div className="text-center text-sm text-text-secondary">
      &copy; {new Date().getFullYear()} Utkarsh Khajuria. All rights reserved.
    </div>
  </footer>
    </>
  );
}
export default Question;