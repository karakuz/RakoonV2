import React from 'react'
import '../../pages/css/star_rating.css';
import Star from './Star';

const Stars = (props) => {
  const stars = ['5','4','3','2','1'];

  return (
    <div className="rate">
      {
        stars.map( (num) => {
          return <Star num={num} highlited={props.rate}/>
        })
      }
      {/* <input type="radio" name="rate" value="5"/>
      <label for="star5" title="text" ></label>

      <input type="radio" name="rate" value="4" />
      <label for="star4" title="text"></label>
      
      <input type="radio" name="rate" value="3" />
      <label for="star3" title="text" style={{color: "red"}}>3 stars</label>
      
      <input type="radio" name="rate" value="2" />
      <label for="star2" title="text"></label>
      
      <input type="radio" name="rate" value="1" />
      <label for="star1" title="text"></label> */}
    </div>
  )
}

export default Stars
