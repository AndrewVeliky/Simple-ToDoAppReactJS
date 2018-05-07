import React, { Component } from 'react';

//react-bootstrap styles
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem  from 'react-bootstrap/lib/ListGroupItem';
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import FormGroup  from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
//own styles
import "./App.css"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      toDoTasks: [],
      doneTasks: [],
      toDone: [],
      inputValue: ''
    }
    this.addTask = this.addTask.bind(this);
    this.setInitialValue = this.setInitialValue.bind(this);
    this.makeToDoTaskList = this.makeToDoTaskList.bind(this);
    this.selectDone = this.selectDone.bind(this);
    this.moveToDone = this.moveToDone.bind(this); 
  }

  

  setInitialValue(event){
    this.setState({
      inputValue: event.target.value,
    });
  }

  addTask(){
    let tasks = this.state.toDoTasks.slice();

    if(this.state.inputValue !== ""){
      tasks.push(this.state.inputValue);

      this.setState({
        toDoTasks: tasks,
        inputValue: ""
      });
    }
  }

  selectDone(evnt){
    let tasks = this.state.toDone.slice();
    let toDone = evnt.target.innerText;
    tasks.push(toDone);

    this.setState({
      toDone: tasks,
    });
  }

  moveToDone(){
    const toDone = this.state.toDone.slice();
    const toDo = this.state.toDoTasks.slice();
    const done = this.state.doneTasks.slice();

    const arrToCompare = [...toDone,...toDo,...done];

    function sym(args) {
      let differenceArray = [];
      
      function countElements(element, array) {
          let elementCount = 0;
          let idx = array.indexOf(element);
          while (idx !== -1) {
              elementCount++;
              idx = array.indexOf(element, idx + 1);
          }
          return elementCount;
      }
      for (let j = 0; j < args.length; j++) {
          if (countElements(args[j], args) === 1) {
              differenceArray.push(args[j]);
          }
      }
      return differenceArray;
  }

    this.setState({
      doneTasks: [...new Set(this.state.toDone.slice())],
      toDoTasks: sym(arrToCompare)
    });
  }

  makeToDoTaskList(){
    const listTasks = this.state.toDoTasks.map((task, i) =>
      <ListGroupItem onClick={event => this.selectDone(event)}>{task}</ListGroupItem>
    );
    return listTasks;
  }

  makeDoneTaskList(){
    const listTasks = this.state.doneTasks.map((task, i) =>
      <ListGroupItem>{task}</ListGroupItem>
    );
    return listTasks;
  }
    
  render() {
    return (
      <Grid bsClass="container" fluid={true}>
        <Row className="show-grid">
          <Col xs={6} md={4} smOffset={4} className="list">
            <h2>TO DO</h2>
            <ListGroup bsClass="list-group">{this.makeToDoTaskList()}</ListGroup>
            <form>
              <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.inputValue}
                  placeholder = "Enter task"
                  onChange={event => this.setInitialValue(event)} 
                />
              </FormGroup>
            </form>
            <Button onClick={this.addTask} bsStyle="primary" className="button">Add Task!</Button >
            <Button onClick={this.moveToDone} bsStyle="warning" className="button">Done!</Button >
            <h2>DONE</h2>
            <ListGroup bsClass="list-group">{this.makeDoneTaskList()}</ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
