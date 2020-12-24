import React from 'react';


const StrikeOutTask = ({onStrikeOutTask, task}) => {
  return(
    <React.Fragment>
      <input className="todo__body__item__strike"
        type="checkbox"
        id={task.id}
        name="task"
        onChange={e => onStrikeOutTask(e, task.id)}
        checked={task.done}
      />
      <label htmlFor={task.id} className={task.done ? "done" : undefined }> {task.title}</label>
    </React.Fragment>
  );
}

export default StrikeOutTask;
