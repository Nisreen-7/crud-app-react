import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:9000/products/")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  };

  const DeleteProduct = (product) => {
    Swal.fire({
      title: `Are You Sure To Delete ${product.title} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`http://localhost:9000/products/${product.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            getAllProducts();
          });
      }
    });
  };

  return (
    <>
      <h1>Products Page</h1>
      <Link to={"/products/add"} className="btn btn-success btn-sm mt-3">
        Add new product
      </Link>

      <table className="table table-striped mt-5 products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => DeleteProduct(product)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-info btn-sm mx-1"
                  >
                    View
                  </Link>
                  <button className="btn btn-primary btn-sm mx-1" >Edite</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default Products;
