import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  githubIcon from './assets/github.svg'
import linkedinIcon from './assets/linkedin.svg'
import xtwitterIcon from './assets/twitter-x.svg'
import rawJsonString from './questions.JSON?raw'; 
import { select_random_topic_question } from "./Landing";
const quizstateData = JSON.parse(rawJsonString);

function color_text(txt)
{
 let total = ''
 let i = 0;
 const question_class = "text-center text-text-primary font-extrabold text-3xl sm:text-4xl lg:text-4xl border-b border-border/50 pb-6 mb-4"
 if(txt.includes('`'))
 {
  for(i = txt.indexOf('`')+1;txt[i] != '`';i++)
  {
    total += txt[i]
  }
  return <p className={question_class}>
    {txt.slice(0, txt.indexOf('`'))}
    

    <span className={'text-indigo-400 px-1'}> 
        {total}
    </span>
    
    {txt.slice(i + 1, txt.length)}
</p>

 }
 else{
      return   <><p className={question_class}>
            {txt}
          </p>
 </>}
}
function getQuestionByIds(quizstateData, targetTopicId, targetQuestionId) {
  console.log(quizstateData,targetTopicId,targetQuestionId)
    const topic = quizstateData.find(topic => topic.topic_id === targetTopicId);
    console.log('topic: ' , topic)
    if (!topic) {
        return null;
    }

    const question = topic.questions.find(q => q.id === targetQuestionId);
    console.log('question: ',question)
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
    if (isSelected !== null) return; 

  const chosenOption = a.options[ind];

  if (chosenOption.is_correct) {
      setQuizData(prevData => ({
        ...prevData,
        score: prevData.score + 1
      }));
    }
    setIsSelected(ind);
  }

  useEffect(()=>{
    setExplanation((isSelected === null))
  },[isSelected])
  const optionClass =
    `bg-card-option-default border-2 border-transparent rounded-lg text-1xl sm:text-2xl lg:text-3xl w-full text-center py-4 px-6 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-text-primary ${!isExplanationDisabled?'pointer-events-none':'hover:bg-primary/20 hover:border-primary/50'}`;

  let {tid,qid}  = useParams();
  tid = parseInt(tid)
  qid = parseInt(qid)
  const location = useLocation();
  const stateData = location.state || {};
  const [quizData,setQuizData] = useState({
    q_id : qid,
    t_id : tid,
    userSelectionIndex  :  stateData.userSelectionIndex || [],
    data : stateData.usedData || {},
    score  : stateData.score || 0
  })

  if(tid<0 || qid<0)
  {
    console.log(stateData.userData)
    navigate(
      '/Results',{
        state:{
          score:quizData.score,
          total:stateData.total
        }
      }
    )
  }
  const a = getQuestionByIds(quizstateData,tid,qid)
  console.log(a)
  console.log(tid,qid)
  const get_next_function = ()=>
  {
    setIsSelected(null)

    const selected = stateData.userSelectionIndex
    const sent = select_random_topic_question(quizData.userSelectionIndex,quizData.data,quizstateData)
    const questionId = sent['q_id'];
    const topicId = sent['q_type']; 
    const updatedData = sent['updatedData']
    setQuizData(prevData => ({
    ...prevData,
    data: updatedData 
  }));
    navigate(`/Questions/${topicId}/${questionId}`, { 
      state: {
        q_id: questionId,
        t_id: topicId,
        userSelectionIndex: quizData.userSelectionIndex,
        usedData:updatedData,
        score:quizData.score,
        total:stateData.total
      }
    })
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-8 lg:p-12">
        
        <div className="bg-card-question border border-border rounded-xl w-full max-w-2xl p-6 md:p-12 mt-12 mb-12 shadow-2xl shadow-black/50 space-y-8">
          
      {color_text(a.question)}
          
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
                        ? ('bg-correct/80 border-correct shadow-lg shadow-correct/30 ')  
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