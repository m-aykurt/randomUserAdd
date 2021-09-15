import React, { useState, useEffect } from "react";
import "./Card.css";
import growMan from "../../assets/growing-up-man.svg";
import growWoman from "../../assets/growing-up-woman.svg";
import mail from "../../assets/mail.svg";
import man from "../../assets/man.svg";
import map from "../../assets/map.svg";
import lock from "../../assets/padlock.svg";
import phone from "../../assets/phone.svg";
import woman from "../../assets/woman.svg";
import axios from "axios";

function Card() {
  const [cards, setCards] = useState([]);
  const [showInfo, setShowInfo] = useState({ title: "", info: "" });
  const [addUser, setAddUser] = useState([]);
  //   console.log(cards);
  console.log(showInfo);
  let info = cards[0];

  useEffect(() => {
    myApi();
  }, []);

  const myApi = async () => {
    let resultApi = await getMyApi();
    setCards(resultApi);
    setShowInfo({
      title: "My name is",
      info: info?.name?.first,
    });
  };

  const getMyApi = async () => {
    let responseResult;
    let url = "https://randomuser.me/api/";
    await axios
      .get(url)
      .then((response) => (responseResult = response.data.results));
    return responseResult;
  };
  const newPerson = {
    id: info?.login?.uuid,
    first: info?.name?.first,
    email: info?.email,
    phone: info?.cell,
    age: info?.dob.age,
  };
  const addUserBtn = () => {
    if (addUser.filter((user) => user.email === newPerson.email).length > 0) {
      alert("Aynı kişiyi tekrar ekleyemezsiniz !");
    } else {
      setAddUser([...addUser, newPerson]);
    }
  };


  return (
    <div>
      <div className="container">
        <div className="headerContainer">
          <div className="picture">
            <img className="image-db" src={info?.picture.large} alt="img" />
          </div>
        </div>
        <div className="showInfo">
          <p> {showInfo.title} </p>
          <p className="bigger"> {showInfo.info} </p>
        </div>
        <div className="iconList">
          <div className="icons">
            <div
              id="gender"
              onClick={() =>
                setShowInfo({
                  title: "My name is",
                  info: info?.name?.first,
                })
              }
            >
              {info?.gender === "male" ? (
                <img className="icon" src={man} alt="man" />
              ) : (
                <img className="icon" src={woman} alt="woman" />
              )}
            </div>

            <div
              onClick={() =>
                setShowInfo({ title: "My email is", info: info?.email })
              }
            >
              <img className="icon" src={mail} alt="mail" />
            </div>
            <div
              onClick={() =>
                setShowInfo({ title: "My age is", info: info?.dob?.age })
              }
            >
              {info?.gender === "male" ? (
                <img className="icon" src={growMan} alt="man" />
              ) : (
                <img className="icon" src={growWoman} alt="woman" />
              )}
            </div>

            <div
              onClick={() =>
                setShowInfo({
                  title: "My street is",
                  info: info?.location?.street?.name,
                })
              }
            >
              <img className="icon" src={map} alt="mail" />
            </div>
            <div
              onClick={() =>
                setShowInfo({ title: "My phone is", info: info?.cell })
              }
            >
              <img className="icon" src={phone} alt="mail" />
            </div>
            <div
              onClick={() =>
                setShowInfo({
                  title: "My password is",
                  info: info?.login?.password,
                })
              }
            >
              <img className="icon" src={lock} alt="mail" />
            </div>
          </div>
        </div>
        <div className="userArea">
          <div className="changeUser">
            <button type="button" className="btn" onClick={myApi}>
              New User
            </button>
          </div>

          <div className="addUser">
            <button onClick={addUserBtn} type="button" className="btn">
              Add User
            </button>
          </div>
        </div>
        <div className="addUserArea">
          {addUser.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  {/* <th>Del</th> */}
                  <th>First</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {addUser.map((user, index) => (
                  <tr key={index}>
                    {/* <td onClick={deleteInfo} style={{ color: "red" }}>
                      <button type="button">X</button>
                    </td> */}
                    <td>{user.first}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
