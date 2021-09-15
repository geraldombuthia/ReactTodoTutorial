import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./App.css";

import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import Header from "./Components/Layout/Header";
import About from "./Components/Pages/About";

class App extends Component {
  //State is added as
  state = {
    todos: []
  };

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }
  //toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    }));
    
  };

  //Add Todo

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuidv4(),
    //   title,
    //   completed: false,
    // };
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    
  };
  render() {
    console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About}>

            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
