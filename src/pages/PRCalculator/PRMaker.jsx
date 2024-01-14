const PRMaker = ({PRtoMaker, repsToMaker}) => {

    var personalRecord = ((repsToMaker/30) +1) * PRtoMaker
    var personalRecordNoDecimals = (Math.trunc(personalRecord))

    return (
         <div className=" bg-altDark p-5 m-5 text-center rounded">
        <h1>Your estimated PR is: {personalRecordNoDecimals} </h1>
     </div>
     )  
}

export default PRMaker