const InputForm = ({benchInput, handleChange, setBench, changeRender}) => {

function handleSubmit(event){
    event.preventDefault()
    setBench()
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
    value={benchInput} 
    onChange={handleChange}
  />
  <label htmlFor="floatingInput">Enter your Bench PR</label>
</div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
)
}

export default InputForm