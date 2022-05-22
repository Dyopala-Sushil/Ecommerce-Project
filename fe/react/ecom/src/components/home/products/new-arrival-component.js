import { useEffect, useState } from "react";
import { http } from "../../../services/http.service";
import { NavLink } from "react-router-dom";
export function NewArrival() {
  let [products, setProducts] = useState([])
  useEffect(() => {
      http.getItem('/product')
      .then((response) => {
        setProducts(response.data.data)
      })
  }, []);
  return (
    <>
      <div className="section-title text-center my-5">
        <h4>New Arrivals</h4>
      </div>
      <div className="new-arrival">
        <div className="container">
            <div className="row">
              {
                products && products.map((prod, index) => (
                  <div key={index} className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                    <div className="card mb-5">
                      <NavLink to={"/product/"+prod._id}>
                        <img
                          src={process.env.REACT_APP_IMAGES_URL+prod['images'][0]}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                        <h6 className="card-title">{prod.title}</h6>
                          <span className="price">Rs. {prod.after_discount}</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                ))
              }
            </div>
        </div>
      </div>      
    </>
  );
}
