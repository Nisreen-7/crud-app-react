import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    getAllProducts();
  }, []);


const getAllProducts=()=>{

    fetch("http://localhost:9000/products/")
    .then((res) => res.json())
    .then((products) => {
      setProducts(products);
    });
}


  const DeleteProduct = (productid) => {
    fetch(`http://localhost:9000/products/${productid}` ,{
        method:"DELETE"
    })
    .then((res)=>res.json())
    .then(()=>{
        getAllProducts();
    })
   
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
                    className="btn btn-danger btn-sm"
                    onClick={() => DeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </Link>
                  <button className="btn btn-primary btn-sm">Edite</button>
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
