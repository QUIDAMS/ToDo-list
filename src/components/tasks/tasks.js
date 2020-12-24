import React, {Component} from 'react';
import TaskItem from '../taskItem';
import AddTask from '../addTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const tasks_url = 'http://869efd68f4ba.ngrok.io';

export default class Tasks extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [
        // {text: "Пример задачи", id: 1, startChangeText: true, done: true },
      ],
      textInput: '',
      isFetching: false,
    }

    this.onChangeValueInput = this.onChangeValueInput.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onStrikeOutTask = this.onStrikeOutTask.bind(this);
    this.startAndSaveEditedText = this.startAndSaveEditedText.bind(this);
    this.onChangeTextValue = this.onChangeTextValue.bind(this);
  }

  componentDidMount(){
    this.fetchTasks();
  }

  fetchTasks(){
    this.setState({isFetching: true})
    axios.get(tasks_url + '/tasks')
      .then(result => {
        this.setState({tasks: result.data, isFetching: false})
      })

  }

  onChangeValueInput(e){
    this.setState({textInput: e.target.value})
  }
  onAddTask(e){
    e.preventDefault();
    const newArrTasks = [...this.state.tasks,
      {title: this.state.textInput, done: false, startChangeText: false, id: this.state.tasks.length+1}];
    this.setState({tasks: newArrTasks, textInput: ''});
    axios.post(tasks_url + '/tasks', {task: {title: this.state.textInput, done: false}})

  }

  onStrikeOutTask(e, id){
    //let markedTask = this.state.tasks.find((task) => task.id === id); когда у меня после => return используем эту записть, вернет весь объект с этим id
    let copyArr = [...this.state.tasks];
    let markedTask = copyArr.find((task) => task.id === id);
    markedTask.done = e.target.checked;
    this.setState({tasks: copyArr});
    axios.put(tasks_url + '/tasks/' + `${id}`, {task: {done: e.target.checked}});


  }
  // НА СЛУЧАЙ ПОЛНОГО УДАЛЕНИЯ
  onDeleteTask(id, e){
    let copyArr = [...this.state.tasks];
    let filteredTasks = copyArr.filter((task) => task.id !== id);
    this.setState({tasks: filteredTasks});
    axios.delete(tasks_url + '/tasks/' + `${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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
    chooseTask.title = e.target.value;
    this.setState({tasks: copyArr});
    axios.put(tasks_url + '/tasks/' + `${id}`, {task: {title: chooseTask.title}});
  }

  render(){
    let doneTasks = this.state.tasks.filter((task) => task.done === true);
    let uncompletedTasks = this.state.tasks.filter((task) => task.done !== true);
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
        </div>
        <div className="todo__body">
          <AddTask
            onChangeValueInput={this.onChangeValueInput}
            textInput={textInput}
            onAddTask={this.onAddTask}
            tasks_url={tasks_url}
          />
          <ul className="todo__body__all-items">
            {allTasks}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
