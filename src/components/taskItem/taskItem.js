import React from "react";
import DeleteTask from "../deleteTask";
import StrikeOutTask from "../strikeOutTask";
import "./taskItem.css";

function TaskItem(props) {
  const {onDeleteTask, onStrikeOutTask, task, startAndSaveEditedText, onChangeTextValue} = props;
  return(
    <React.Fragment>
      <li>
        <StrikeOutTask
          onStrikeOutTask={onStrikeOutTask}
          task={task}
        />
        {task.startChangeText ?
          <p>
            <input
              value={task.text}
              onChange={e => onChangeTextValue(e, task.id)}
            />
            <button onClick={e => startAndSaveEditedText(task.id)}>
              Сохранить
            </button>
          </p> :
          <button className="todo__button" onClick={e => startAndSaveEditedText(task.id)}>
            Изменить
          </button>
        }
        <DeleteTask
          onDeleteTask={onDeleteTask}
          task={task}
        />
      </li>
    </React.Fragment>
  )
}

export default TaskItem;
