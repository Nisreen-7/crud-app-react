import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  let navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
  //   axios
  //     .post(`http://localhost:9000/products`, {
  //       title,
  //       price,
  //     })

  //     .then((data) => {
  //       console.log(data);
  //       navigate("/products");
  //     });
  // };

    fetch(`http://localhost:9000/products`, {
      method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price
            })
      })

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
  navigate("/products");

      });
  };

  return (
    <>
      <h1>Add product</h1>

      <form className="container mt-3" onSubmit={formSubmit}>
        <div className="form-group">
          <label htmlFor="productTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
            aria-describedby="produc Title"
            placeholder="product title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            aria-describedby="product Price"
            placeholder="product price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
    </>
  );
}
export default AddProduct;
