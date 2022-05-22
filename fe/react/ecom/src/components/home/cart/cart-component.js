import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { setCounter } from "../../../actions/cart.acts";

function CartComponent(props) {
  let [cart, setCart] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let c_art = JSON.parse(localStorage.getItem("_cart")) || [];
    setCart(c_art);
  }, [isLoading])

  const removeItem =(index) => {
    let c_art = JSON.parse(localStorage.getItem("_cart")) || [];
    c_art.splice(index, 1);
    localStorage.setItem('_cart', JSON.stringify(c_art));
    setIsLoading(true);
    toast.success("Item removed from cart.");
    props.setCounter(c_art.length);
  }
  return (
    <>
      <div className="cart mt-5">
        <div className="container">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">image</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((o, ind) => (
                  <tr key={ind}>
                    <td>
                      <img src={o.image} alt="" width={"150px"} />
                    </td>
                    <td>{o.title}</td>
                    <td>{o.qty}</td>
                    <td>NRS. {o.amount}</td>
                    <td>
                      <button onClick={() => {
                          removeItem(ind);
                      }} className="btn btn-warning">Remove</button>
                    </td>
                  </tr>
              ))}

            </tbody>
          </table>
          <NavLink to="/checkout" className="btn btn-warning">Check Out</NavLink>
        </div>
      </div>
    </>
  );
}
let mapStateToProps = (rootStore) => ({
  counter: rootStore.cart
})
let mapDispatchToProps = {
  setCounter: setCounter
}
export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent);