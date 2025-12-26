import '../App.css';

import img from '../assets/goa-tourism.jpg';
import keralaimg from '../assets/kerala.jpg';
import ladakh from '../assets/ladakh.jpg';
import jaipur from '../assets/hawa-mahal-jaipur-rajasthan.jpg';
import taj from '../assets/taj143.jpg';



//home image logic

const places = [
  {
    id: 1,
    name: "Goa",
    image: img
  },
  {
    id: 2,
    name: "Kerala",
    image: keralaimg
  },
  {
    id: 3,
    name: "Ladakh",
    image: ladakh
  },
  {
    id: 4,
    name: "Jaipur",
    image: jaipur
  },
  {
    id: 5,
    name: "Agra",
    image:taj
  }
];



export default function  PlaceCards(){
    return(
        <div className='places-container'>
            {places.map((place)=>(
                <div key={place.id} className='place-card' style={{backgroundImage:`url(${place.image})`}}
                >
                    <h3>{place.name}</h3>
                </div>
            ))}
        </div>
    );

}








