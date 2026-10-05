import Button from "../button/Button";

import "./Card.css";


interface User {

  name: string;

  age: number;

  picture: string;

  city: string;

  checked: boolean;

  onCheckboxChange: () => void;

}


export default function Card(props: User) {

  return (

    <div className="card">

      <input
        type="checkbox"
        className="checkbox"
        checked={props.checked}
        onChange={props.onCheckboxChange}
      />

      <div>

        <img
          width={200}
          src={props.picture}
          alt=""
        />

        <p>{props.name}</p>

        <p>{props.age}</p>

        <p>{props.city}</p>

        <div className="divButon">

          <Button type="like" />

          <Button type="deslike" />

        </div>

      </div>

    </div>

  );
}