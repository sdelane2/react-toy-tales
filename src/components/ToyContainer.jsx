import { render } from '@testing-library/react';
import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const renderToyCards = () => {  
    return props.toyArray.map(toy => <ToyCard toyObject={toy} key={toy.id} updateLike={props.likeHandler} deleteHandler={props.deleteHandler}/>)
  }

  return(
    <div id="toy-collection">
      {renderToyCards()}
    </div>
  );
}

export default ToyContainer;
