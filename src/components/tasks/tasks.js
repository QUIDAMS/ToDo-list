import React, {Component} from 'react';
import TaskItem from '../taskItem';
import AddTask from '../addTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Tasks extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [
        {text: "Пример задачи", id: 1, startChangeText: true, done: true },
        {text: "2 пример задачи", id: 2, startChangeText: false, done: false},
        {text: "пример    задачи три", id: 3, startChangeText: false, done: false},
        {text: "Второй пример    задачи", id: 4, startChangeText: false, done: false},
      ],
      textInput: '',
    }
    this.onChangeValueInput = this.onChangeValueInput.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onStrikeOutTask = this.onStrikeOutTask.bind(this);
    this.startAndSaveEditedText = this.startAndSaveEditedText.bind(this);
    this.onChangeTextValue = this.onChangeTextValue.bind(this);
  }

  onChangeValueInput(e){
    this.setState({textInput: e.target.value})
  }
  onAddTask(e){
    e.preventDefault();
    const newArrTasks = [...this.state.tasks,
      {text: this.state.textInput, done: false, startChangeText: false, id: this.state.tasks.length+1}];
    this.setState({tasks: newArrTasks, textInput: ''});
  }

  onStrikeOutTask(e, id){
    //let markedTask = this.state.tasks.find((task) => task.id === id); когда у меня после => return используем эту записть, вернет весь объект с этим id
    let copyArr = [...this.state.tasks];
    let markedTask = copyArr.find((task) => task.id === id);
    markedTask.done = e.target.checked;
    this.setState({tasks: copyArr});

  }
  // НА СЛУЧАЙ ПОЛНОГО УДАЛЕНИЯ
  onDeleteTask(id){
    let copyArr = [...this.state.tasks];
    let filteredTasks = copyArr.filter((task) => task.id !== id);
    this.setState({tasks: filteredTasks});
  }

  startAndSaveEditedText(id){
    let copyArr = [...this.state.tasks];
    let chooseTask = copyArr.find((task) => task.id === id);
    chooseTask.startChangeText = !chooseTask.startChangeText;
    this.setState({tasks: copyArr});
  }
  onChangeTextValue(e, id){
    let copyArr = [...this.state.tasks];
    let chooseTask = copyArr.find((task) => task.id === id);
    chooseTask.text = e.target.value;
    this.setState({tasks: copyArr});
  }



  render(){
    let doneTasks = this.state.tasks.filter((task) => task.done === true);
    let uncompletedTasks = this.state.tasks.filter((task) => task.done === false);
    let tasksFilter = [...uncompletedTasks,...doneTasks];
    const allTasks = tasksFilter.map((task, i) => {

      return (
        <React.Fragment key={i}>
          <TaskItem
            i={i}
            task={task}
            onDeleteTask={this.onDeleteTask}
            onStrikeOutTask={this.onStrikeOutTask}
            startAndSaveEditedText={this.startAndSaveEditedText}
            onChangeTextValue={this.onChangeTextValue}
          />
        </React.Fragment>
      )
    })
    const {textInput} = this.state;
    return(
      <React.Fragment >
        <div className="todo__label">
          <h2>Мой список задач</h2>
          <FontAwesomeIcon icon="check-square" />
        </div>
        <div className="todo__body">
          <AddTask
            onChangeValueInput={this.onChangeValueInput}
            textInput={textInput}
            onAddTask={this.onAddTask}
          />
          <ul className="todo__body__all-items">
            {allTasks}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
