import React from 'react';
import './addTask.css';


const AddTask = ({onChangeValueInput, textInput, onAddTask}) => {
  return(
    <form >
      <label> Новая задача:
        <input
          value={textInput}
          onChange={onChangeValueInput}
        />
      </label>
      <input
        type='submit'
        onClick={onAddTask}
        value="Добавить"
      />
    </form>
  )
}

export default  AddTask;
