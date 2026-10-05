import Card from "./components/card/Card";
import "./App.css";
import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";

export default function App() {

  const [users, setUsers] = useState<any[]>([]);
  const [qt, setQt] = useState("10");
  const [load, setLoading] = useState(true);
  const [offlineUsers, setOfflineUsers] = useState<number[]>([]);

  useEffect(() => {

    async function getUser() {

      const response = await fetch(
        "https://randomuser.me/api/?results=" +
        qt +
        "&inc=gender,name,nat,dob,picture,location&nat=br"
      );

      const data = await response.json();

      console.log(data.results);

      setUsers(data.results);

      // Quando buscar novos usuários,
      // todos começam online
      setOfflineUsers([]);

      setLoading(false);
    }

    getUser();

  }, [qt]);


  if (load === true) {
    return (
      <div className="loadi">

        <Mosaic
          color={["#c3d400", "#ebff08", "#efff3b", "#f3ff6e"]}
          speedPlus="3"
        />

      </div>
    );
  }


  function ChangeQt(event: React.ChangeEvent<HTMLSelectElement>) {
    setQt(event.target.value);
    setLoading(true);
  }


  function handleCheckbox(index: number) {

    // Se já offline
    if (offlineUsers.includes(index)) {

      // Remove da lista de offline
      setOfflineUsers(
        offlineUsers.filter(item => item !== index)
      );

    } else {

      // add na lista de offline
      setOfflineUsers([
        ...offlineUsers,
        index
      ]);

    }
  }


  return (
    <div>

      <h1>TibauBook</h1>

      <hr />

      <div>

        Quantidade:

        <select
          name="qt"
          value={qt}
          onChange={ChangeQt}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="500">500</option>
          <option value="1500">1500</option>

        </select>

      </div>

      <hr />

      <h2>ONLINE! :D</h2>

      <hr />

      <div className="card-container">

        {users.map((user, index) =>

          !offlineUsers.includes(index) && (

            <Card
              key={index}

              name={user.name.first}
              age={user.dob.age}
              picture={user.picture.large}
              city={user.location.city}

              checked={true}

              onCheckboxChange={() =>
                handleCheckbox(index)
              }
            />

          )
        )}

      </div>

      <hr />

      <h2>offline :(</h2>

      <hr />

      <div className="card-containerOfSet">

        {users.map((user, index) =>

          offlineUsers.includes(index) && (

            <Card
              key={index}

              name={user.name.first}
              age={user.dob.age}
              picture={user.picture.large}
              city={user.location.city}

              checked={false}

              onCheckboxChange={() =>
                handleCheckbox(index)
              }
            />

          )
        )}

      </div>

    </div>
  );
}