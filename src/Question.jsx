import { useLocation, useParams } from "react-router-dom";
import  githubIcon from './assets/github.svg'
import linkedinIcon from './assets/linkedin.svg'
import xtwitterIcon from './assets/twitter-x.svg'
export const data = {
}

export function select_random_topic_question(topics,data,limit=2)
{
    const get_random_type = ()=>{
    const selected_topics = topics.reduce((a,b,i)=>{
    b?a.push(i):null
    return a 
    },[])
    const end = selected_topics.length
    return selected_topics[Math.floor(Math.random() * end)]
   }
   {/*change this data to add more questions*/}

   const get_random_question =(qType)=>{
   const ids = [
      '101', '102', 
      '201', '202', 
      '301', '302', 
      '401', '402', 
      '501', '502', 
      '601', '602', 
      '701', '702', 
      '801', '802', 
      '901', '902', 
      '1001', '1002', 
      '1101', '1102'
  ];    
  const desired = ids.filter((i)=>i.startsWith(qType))
  let end = desired.length
  let result = desired[Math.floor(Math.random() * end)]
  return (data[qType].includes(result))?get_random_question(qType):result
  }
  const q_type = get_random_type()
  data[q_type] = data[q_type] || []
  const q_id = get_random_question(q_type)
  data[q_type].push(q_id)

}

function Question() {
  const optionClass =
    "bg-card-option-default border-2 border-transparent rounded-lg text-2xl sm:text-3xl lg:text-4xl w-full text-center py-4 px-6 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary/20 hover:border-primary/50 text-text-primary";

  const isSelected = (item) => false; 
  const isCorrect = (item) => false; 
  const questionId  = useParams();
  console.log(questionId)
  const location = useLocation();
  const data = location.state?.selectedCats || {};
  console.log(`Data:${JSON.stringify(data)}`);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-8 lg:p-12">
        
        <div className="bg-card-question border border-border rounded-xl w-full max-w-2xl p-6 md:p-12 mt-12 mb-12 shadow-2xl shadow-black/50 space-y-8">
          
          <p className="text-center text-text-primary font-extrabold text-3xl sm:text-4xl lg:text-5xl border-b border-border/50 pb-6 mb-4">
            What is Your Name?
          </p>
          
          <p hidden className="
            border-l-8 border-primary 
            bg-card-question 
            text-text-secondary 
            p-4 rounded-md text-lg 
            shadow-inner shadow-black/30
          ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati repellendus architecto illum quisquam quo saepe beatae. Sed excepturi repellat ex, ipsam assumenda incidunt nostrum sunt sit neque officia nemo nisi?
          </p>
  
          <ul className="flex flex-col space-y-4 pt-6 items-center">
            {['a', 'b', 'c', 'd'].map((option) => (
              <li 
                key={option}
                className={`
                  ${optionClass}
                  ${isSelected(option) ? 'bg-correct/80 border-correct shadow-lg shadow-correct/30' : ''}
                  ${isCorrect(option) && isSelected(option) ? 'bg-correct/80 border-correct shadow-lg shadow-correct/30' : ''}
                  ${!isCorrect(option) && isSelected(option) ? 'bg-wrong/80 border-wrong shadow-lg shadow-wrong/30' : ''}
                  
                `}
              >
                {option}
              </li>
            ))}
          </ul>

        </div>
      </div>
<footer className='bg-card-option-default py-4 mt-auto fixed bottom-0 w-full left-0 items-center'>
  <ul className='flex justify-evenly mb-2'>
    <li><a href="https://www.linkedin.com/in/utkarsh-khajuria-495b8831a" target='_blank'><img className='w-8 h-8' src={linkedinIcon} alt="LinkedIn Icon" /></a></li>
    <li><a href="https://github.com/U-K-06" target='_blank'><img className='w-8 h-8' src={githubIcon} alt="GitHub Icon"/></a></li>
    <li><a href="https://x.com/UK_06__" target='_blank'><img src={xtwitterIcon} className='w-8 h-8' alt="X/Twitter Icon" /></a></li>
  </ul>

  <div className="text-center text-sm text-text-secondary">
    &copy; {new Date().getFullYear()} Utkarsh Khajuria. All rights reserved.
  </div>
</footer>
    </>
  );
}
export default Question;