import { useLocation } from "react-router-dom";

function Question() {
const className =
  "bg-card-option-default rounded-2xl text-4xl w-11/12 text-center h-14  flex items-center justify-center hover:bg-gray-950  cursor-pointer ";
  const location = useLocation()
  const data = location.state?.selectedCats || {};
  console.log(`Data:${JSON.stringify(data)}`)

  return (
<>
  <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-8 lg:p-12">

    <div className="bg-card-question border border-border rounded-2xl w-full max-w-6xl p-10 py-16 space-y-8">
      
      <p className="text-center text-text-primary font-bold text-2xl sm:text-3xl lg:text-4xl">
        What is Your Name?
      </p>
      <p hidden className="border-l-8 border-primary bg-text-secondary text-text-primary p-4 rounded-md text-2xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati repellendus architecto illum quisquam quo saepe beatae. Sed excepturi repellat ex, ipsam assumenda incidunt nostrum sunt sit neque officia nemo nisi?
        Excepturi beatae modi ipsa illum nam aliquam, eos consequatur quaerat iure illo itaque consequuntur magnam sequi accusamus voluptates in unde soluta saepe iste laudantium totam facere, magni velit? Exercitationem, magnam?
      </p>

      <ul className="flex flex-col items-center space-y-6">
        <li className={className}>a</li>
        <li className={className}>b</li>
        <li className={className}>c</li>
        <li className={className}>d</li>
      </ul>
    </div>
  </div>
</>
  );
}
export default Question;
