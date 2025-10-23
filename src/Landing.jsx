  import { useState,useEffect } from 'react'
  import { Link,Routes,useNavigate } from 'react-router-dom'
  import  githubIcon from './assets/github.svg'
  import linkedinIcon from './assets/linkedin.svg'
  import xtwitterIcon from './assets/twitter-x.svg'
  import rawJsonString from './questions.JSON?raw'; 

  const quizData = JSON.parse(rawJsonString);
  export function select_random_topic_question(topics, data, quizData, limitKey = 0) {

      const get_random_type = () => {
          const selected_topics = topics.reduce((a, b, i) => {
              if (b) a.push(i);
              return a;
          }, []);
      
          const end = selected_topics.length;
          if (end === 0) return -1;

          return selected_topics[Math.floor(Math.random() * end)];
      };

      const get_random_question = (qType) => {

          if (data[limitKey] && data[limitKey][qType] >= 2) {
              return -2;
          }

          const topicData = quizData.find(topic => topic.topic_id === qType);

          if (!topicData || !topicData.questions) return -1;

        
          const all_ids = topicData.questions.map(q => q.id);

          const used_ids = data[qType] || [];

          const unused_ids = all_ids.filter(id => !used_ids.includes(id));

          if (unused_ids.length === 0) {
              return -1; 
          }

          const randomIndex = Math.floor(Math.random() * unused_ids.length);
          return unused_ids[randomIndex];
      };

      const q_type = get_random_type();

      if (q_type === -1) return { q_type: -1, q_id: -1 };

      data[q_type] = data[q_type] || [];
      data[limitKey] = data[limitKey] || {};
      data[limitKey][q_type] = data[limitKey][q_type] || 0;

      const q_id = get_random_question(q_type);

      if (q_id > 0) {
          data[limitKey][q_type]++;
          data[q_type].push(q_id);
      }

      return { q_type, q_id };
  }

  function Landing() { 
    const navigate = useNavigate();
    const data = {}
    const total_options = 11  
    const selected = new Array(total_options).fill(0)
    const [isSelected, setIsSelected] = useState(selected)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); 
    const selectTopic = (i) => {
      setIsSelected(prevSelected => {
        const selected = [...prevSelected]
        selected[i] = selected[i] == 0?1:0
        return selected

      })
    }
    useEffect(() => {
      const hasSelection = isSelected.includes(1);
      setIsSubmitDisabled(!hasSelection);
      
    },[isSelected])
    const className = `sm:text-lg lg:text-4xl rounded-md border-2 text-2xl p-6 hover:bg-blue-600 active:bg-blue-700 text-text-primary font-bold flex gap-2 justify-center cursor-pointer`
  const send_qid_tid = (e) => {
    const sent = select_random_topic_question(isSelected, data, quizData);
    const questionId = sent['q_id'];
    const topicId = sent['q_type']; 

    navigate(`/Questions/${topicId}/${questionId}`, { 
      state: {
        q_id: questionId,
        t_id: topicId,
        userSelectionIndex: isSelected,
        usedData:data
      }
    }); 
  };
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
        <nav><a className='sm:text-lg lg:text-4xl md:text-2xl text-shadow-primary font-bold text-shadow-lg' href='https://github.com/U-K-06/Python-Quiz' target='_blank'>U.K. </a></nav>
        <h1 className='text-primary-text lg:text-6xl md:text-4xl sm:text-3xl text-centre font-bold text-center'>Ready to test your <span className='text-yellow-300'>Python</span> <span className='text-blue-400'>Knowledge?</span></h1>
        <p className='text-center sm:text-lg md:text-xl lg:text-2xl m-4'>Select the topic(s) on which you want to take the Quiz on.</p>
  <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
    
    <li onClick={()=>selectTopic(0)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[0] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}> 
      <div className='text-xl text-gray-100 font-semibold'>Strings</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-blockquote-left" viewBox="0 0 16 16">
          <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm.79-5.373q.168-.117.444-.275L3.524 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562Q2 7.587 2 7.969q0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282q.036-.305.123-.498a1.4 1.4 0 0 1 .252-.37 2 2 0 0 1 .346-.298zm2.167 0q.17-.117.445-.275L5.692 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562q-.165.31-.164.692 0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282a1.8 1.8 0 0 1 .118-.492q.087-.194.257-.375a2 2 0 0 1 .346-.3z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(1)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[1] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Lists</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(2)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[2] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Dictionaries</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5A.5.5 0 0 1 16 8.5v1a.5.5 0 0 1-.354.354l-1.5 1.5a.5.5 0 0 1-.146.354v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1.586a.5.5 0 0 1-.354-.146L10.354 10.354A.5.5 0 0 1 10 10V9.5a4 4 0 1 1-4.829-3.235 4.001 4.001 0 0 1 5.093-2.133L14.001 5H7.465zm-.935 3.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(3)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[3] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>List Comprehension</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(4)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[4] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Sets</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-union" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(5)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[5] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Functions</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(6)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[6] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>OOP (Basics)</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(7)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[7] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>OOP (Advanced)</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(8)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[8] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Pathlib</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-folder-symlink" viewBox="0 0 16 16">
          <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742"/>
          <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(9)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[9] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>Requests Library</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
      </svg>
    </li>

    <li onClick={()=>selectTopic(10)} 
      className={`p-4 flex items-center justify-between cursor-pointer rounded-xl transition-all duration-300 
      ${isSelected[10] ? '!bg-correct shadow-2xl scale-[1.02]' : '!bg-card-option-default shadow-lg hover:scale-[1.02]'}`}>
      <div className='text-xl text-gray-100 font-semibold'>JSON Library</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-braces" viewBox="0 0 16 16">
          <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6"/>
      </svg>
    </li>
  </ul>
  <div className={`flex justify-center mt-10 mb-8 w-full ${isSubmitDisabled?'opacity-50 pointer-events-none':''}`}> 
  <button
  onClick={send_qid_tid}
    className={
      'bg-primary ' +
      'inline-block px-10 py-4 w-fit ' +
      'rounded-lg text-2xl font-bold text-gray-100 ' +
      'shadow-2xl tracking-wider ' +
      'hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 cursor-pointer'
    }
  >
    Go to Questions
  </button>

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
    )
  }
  export default Landing