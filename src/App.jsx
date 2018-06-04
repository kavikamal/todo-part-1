import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';
 
class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: todoList, text: '' };
  }

  handleChange=(e)=> {
    this.setState({ text: e.target.value });
  }

  handleSubmit=(e)=> {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      title: this.state.text,
      completed:false,
      id: this.state.todos.length + 1
    };
    this.setState(prevState => ({
      todos: prevState.todos.concat(newItem), 
      text: ''
    }));
  }

  // checkboxHandler=(e)=>{
  //   let todoArr= this.state.todos;
  //   todoArr.forEach(element => {    
  //      if (element.id===Number(e.target.id)) {
  //        element.completed = !element.completed;
  //      }
  //    }); 
  //   this.setState({todos:todoArr});   
  // }

  // deleteTodo=(e)=>{
  //   let todoArr= this.state.todos;
  //   var elementPos = todoArr.findIndex(obj => obj.id === Number(e.target.value))
  //   todoArr.splice(elementPos, 1);
  //   console.log(todoArr);
  //   this.setState({todos:todoArr});   
  // }

  render() {
    return (  
      <div className="todoapp">
      <form onSubmit={this.handleSubmit}>
			<header className="header">
				<h1>todos</h1>  
	      <input
            id="new-todo" className="new-todo" placeholder="What needs to be done?" autoFocus
            onChange={this.handleChange}
            value={this.state.text}
          />
         
			</header>
      <TodoList todos={this.state.todos} 
                checkboxHandler={this.checkboxHandler} 
                deleteTodo={this.deleteTodo}/>
			<footer className="footer">
				<span className="todo-count"><strong>{this.state.todos.length}</strong> item(s) left</span>
				<button className="clear-completed">Clear completed</button>
			</footer>
      </form>
		</div>
    );
  }
 
}

class TodoList extends Component {
  render() {
    return (			
      <div className="main">
      <ul className="todo-list" >
        {this.props.todos.map(todo => (
          <TodoItem completed={todo.completed} 
                    title={todo.title} 
                    id= {todo.id} 
                    checkboxHandler={this.props.checkboxHandler} 
                    deleteTodo={this.props.deleteTodo}>
          </TodoItem> 
        ))}
      </ul>
      </div>
    );
  }
}

class TodoItem extends Component{

  render(){
    return(
      <React.Fragment>
          <li className={this.props.completed? "completed":""}>
                <div className="view">
                <input id={this.props.id} 
                       className="toggle" 
                       type="checkbox" 
                       defaultChecked={this.props.completed} 
                       onChange={this.props.checkboxHandler} />
                <label>{this.props.title}</label>
                <button value={this.props.id} className="destroy" onClick={this.props.deleteTodo} ></button>
              </div>
            </li>
      </React.Fragment>
    );
  }
}
export default TodoApp;
