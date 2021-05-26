import React from 'react'
import '../../pages/css/star_rating.css';
import Star from './Star';

const Stars = (props) => {
  const stars = ['5', '4', '3', '2', '1'];

  return (
    <div className="rate" id={props.id} style={{ position: "relative" }}>
      {
        stars.map((num) => {
          return <Star key={num} num={num} highlited={props.rate} addComment={props.addComment} setRate={props.setRate} />
        })
      }
    </div>
  )
}

export default Stars
