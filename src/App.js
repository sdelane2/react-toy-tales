import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  deleteHandler = (id)=>{
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({id: id})
    })
    .then(response => response.json())
    .then(()=> {
      const newArray = this.state.toys.filter(toy => toy.id !== id )
      this.setState({toys: newArray})
    })
  }

  likeHandler = (id)=>{
    let toyLikes = this.state.toys.find(toy=>toy.id===id).likes
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({likes: toyLikes + 1 })
    })
    .then(response => response.json())
    .then(toyObject=> {
      const newArray = [...this.state.toys]
      const toyIndex = this.state.toys.findIndex(toy => toy.id===toyObject.id)
      newArray[toyIndex] = toyObject
      this.setState({toys: newArray})
    })

  }

  createSubmitHandler = (newToyObject)=>{
    this.setState({toys: [...this.state.toys, newToyObject]})

    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newToyObject)
    })
    .then(response => response.json())
    .then(console.log)
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => this.setState({toys: data}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.createSubmitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toyArray={this.state.toys} likeHandler={this.likeHandler} deleteHandler={this.deleteHandler}/>
      </>
    );
  }

}

export default App;
