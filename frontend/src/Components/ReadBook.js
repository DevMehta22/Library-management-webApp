import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReadBook = () => {
  const [data, setdata] = useState([]);
  const [err, seterr] = useState("");
  const bookDetail = async () => {
    await fetch("http://localhost:4000/api/book/getBooks", {
      method: "get",
    })
      .then((res) => res.json())
      .then((i) => setdata(i.GetBook));
  };
  bookDetail();
  const arr = data;

  const handleDelete = async (id) => {
    const Delete = await fetch(
      `http://localhost:4000/api/book/deleteBook/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await Delete.json();

    if (Delete.ok) {
      seterr("data deleted successfully ");
      bookDetail();
      setTimeout(() => {
        seterr("");
      }, 3000);
    } else if (!Delete.ok) {
      seterr(result.err);
    }
  };
  return (
    <div className="container my-3">
      <h2
        style={{
          fontFamily: "cursive",
          color: "white",
          textShadow: "0px 0px 10px aqua",
          fontWeight: "bold",
        }}
      >
        <center>Books Available</center>
      </h2>
      {err && (
        <div className="alert alert-danger">Data Deleted successfully!</div>
      )}
      <div className="row ">
        {arr?.map((name) => (
          <div
            key={name._id}
            className="card mx-3 my-3"
            style={{ width: "18rem" }}
          >
            {/* <img src="..." className="card-img-top" alt="..."/> */}
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontFamily: "serif", textShadow: "0px 0px 2px red" }}
              >
                {name.book_name}
              </h5>
              <p className="card-text">Author:{name.book_author}</p>
              <p className="card-text">MRP:{name.book_price}</p>
              <Link to={`/${name._id}`} className="btn btn-primary mx-3">
                Update
              </Link>
              <Link
                to="#"
                className="btn btn-danger mx-3"
                onClick={() => handleDelete(name._id)}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadBook;
