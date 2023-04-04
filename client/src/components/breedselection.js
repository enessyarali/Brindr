
const BreedSelection = ({ options, breedPreference, handleOptionChange, addInput, deleteInput }) => {
    return (
      <div>
        {breedPreference.map((input, index) => (
          <div key={index}>
            <select value={input} onChange={event => handleOptionChange(event, index)}>
              <option value="">Select an option</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button onClick={() => deleteInput(index)}>Delete</button>
          </div>
        ))}
        <button onClick={addInput}>Add Input</button>
      </div>
    );
  };
  

export default BreedSelection;