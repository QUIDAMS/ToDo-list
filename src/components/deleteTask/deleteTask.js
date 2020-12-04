import React from 'react';


function DeleteTask(props) {
  const {onDeleteTask, task} = props
  return(
    <React.Fragment>
      <button
        onClick={e => onDeleteTask(task.id)}
        className="todo__body__delete">
        <img src="https://img.icons8.com/ios/20/000000/full-trash--v1.png"/>
      </button>
    </React.Fragment>
  )
}

export default DeleteTask;
