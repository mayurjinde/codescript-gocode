import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { domain } from "../../constants/config";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    if (storage === null) {
      history("/auth");
      return;
    }
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    console.log(token);
    fetch(`${domain}/profile/problems`, { headers: headers })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setProblems(data);
        setLoading(false);
      });
  }, [history]);

  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <ReactLoading
            type={loadingOptions.type}
            color={loadingOptions.color}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <h1
            style={{
              color: "white",
            }}
          >
            {" "}
            Attempted Problems{" "}
          </h1>
          {problems.map((problem, i) => {
            return (
              <div
                key={i}
                style={{
                  margin: "2rem",
                }}
              >
                <Link to={`/submissions/${problem[0]}`}>
                  <Button variant="primary">{problem[1]}</Button>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Profile;
