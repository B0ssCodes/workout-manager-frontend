const InputForm = ({PR, handleChange, sendPR, changeRender, reps, handleRepsChange}) => {

  const  handleSubmit = (event) => {
        event.preventDefault()
        sendPR()
        changeRender()
    }

    return(
        <div className="bg-altDark container-sm py-2 rounded shadow-md">
    
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
      <input 
        type="text" 
        className="form-control" 
        id="floatingInput" 
        placeholder="Enter your Bench PR" 
        value={PR} 
        onChange={handleChange}
      />
      <label htmlFor="floatingInput">Weight</label>
    </div>
    <div className="form-floating mb-3">
      <input 
        type="text" 
        className="form-control" 
        id="floatingInput" 
        placeholder="Enter your Bench PR" 
        value={reps} 
        onChange={handleRepsChange}
      />
      <label htmlFor="floatingInput">Reps</label>
    </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}
export default InputForm