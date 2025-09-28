function Question()
{
    return (
        <>
        <p className="sm:text-lg md:text-2xl lg:text-4xl bg-card-question font-bold text-center p-6 m-20 w-11/12 md:w-3/4 lg:w-2/3 rounded-lg md:rounded-xl lg:rounded-2xl justify-self-center border-border text-text-primary">What is Your Name?</p>
        <p className="border-primary border-l-8 bg-text-secondary justify-self-center">Explanation of answer</p>
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <li>Pak</li>
            <li>Paku</li>
            <li>Pakuman</li>
            <li>Paktheduck</li>
        </ul>
        </>
    )
}
export default Question