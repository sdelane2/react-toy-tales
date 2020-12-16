import React, { Component } from 'react';


class ToyCard extends Component {


  deleteClick = () => {
    this.props.deleteHandler(this.props.toyObject.id)
  }

  likeClick = () => {
    this.props.updateLike(this.props.toyObject.id)
  }

  render() {

    const {toyObject} = this.props

  

    return (
      <div className="card">
        <h2>{toyObject.name}</h2>
        <img src={toyObject.image} alt={toyObject.image} className="toy-avatar" />
        <p>{toyObject.likes} Likes </p>
        <button onClick={this.likeClick} className="like-btn">Like {'<3'}</button>
        <button onClick={this.deleteClick} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
