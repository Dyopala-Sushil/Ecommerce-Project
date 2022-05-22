import { SectionTitle } from "../common/section-title-component";
import { NavLink } from "react-router-dom";
export function PopularProduct(){
    return(
        <>
        <SectionTitle></SectionTitle>
        <div className="popular-products">
            <div className="container">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <NavLink to="/product-detail">
                        <figure>
  <img src="../images/products/p-1.png" className="card-img-top" alt="..." />
  </figure>
  </NavLink>
  <h6 className="title py-2">Computer & Laptops</h6>
  </div>
</div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <a href="">
                        <figure>
  <img src="../images/products/p-2.png" className="card-img-top" alt="..." />
  </figure>
  </a>
  <h6 className="title py-2">Digital Cameras</h6>
  </div>
</div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <a href="">
                        <figure>
  <img src="../images/products/p-3.png" className="card-img-top" alt="..." />
  </figure>
  </a>
  <h6 className="title py-2">Smart Phones</h6>
  </div>
</div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <a href="">
                        <figure>
  <img src="../images/products/p-4.png" className="card-img-top" alt="..." />
  </figure>
  </a>
  <h6 className="title py-2">Televisions</h6>
  </div>
</div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <a href="">
                        <figure>
  <img src="../images/products/p-6.png" className="card-img-top" alt="..." />
  </figure>
  </a>
  <h6 className="title py-2">Smart Watches</h6>
  </div>
</div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md2 col-sm-12">
                    <div className="card" >
                        <div className="card-body text-center">
                          
                        <a href="">
                        <figure>
  <img src="../images/products/p-5.png" className="card-img-top" alt="..." />
  </figure>
  </a>
  <h6 className="title py-2">Audio Players</h6>
  </div>
</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}