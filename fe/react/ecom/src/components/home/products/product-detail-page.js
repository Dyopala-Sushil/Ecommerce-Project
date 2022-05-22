import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { http } from "../../../services/http.service";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { setCounter } from "../../../actions/cart.acts";

function ProductDetailComponent(props) {
    let [product, setProduct] = useState();
    let params = useParams();
    
    let [qty, setQty] = useState(0);
    let [amt, setAmt] = useState(0);
    useEffect(() => {
        http.getItem('/product/'+params.id)
        .then((response) => {
            setProduct(response.data.result)
        })
        .catch((error) => {
            console.log("Error: ", JSON.stringify(error));
        })
    }, [])


    const changeQty = (ev) => {
        let q = ev.target.value;
        setQty(q);
        let total = product.after_discount * q;
        setAmt(total);
    }

    const addToCart = (ev) => {
        let current_item = {
            product_id: product._id,
            title: product.title,
            image: process.env.REACT_APP_IMAGES_URL+product.images[0],
            price: product.after_discount,
            qty: qty,
            amount: amt
        };

        // TODO: Existing cart, update not inser 
        // TODO: non existing cart, insert 
        let existing_cart = JSON.parse(localStorage.getItem('_cart')) || [];
        // console.log(existing_cart);
        if(existing_cart.length > 0){
            // cart exists
            let ind = null;
            existing_cart.map((o, index) => {
                if(o.product_id == product._id){
                    ind = index;
                    // return index;
                    // break;
                }
            })

            if(ind !==  null){
                existing_cart[ind]['qty'] = qty;
                existing_cart[ind]['amount'] = qty* product.after_discount;
            } else {
                existing_cart.push(current_item);
            }

            // console.log("index: ", ind);
        } else {
            existing_cart.push(current_item);

        }
        let delInde = null;
        existing_cart.map((o, ind) => {
            if(o.product_id == product._id && qty == 0){
                delInde = ind
            }
        })

        if(delInde !== null){
            existing_cart.splice(delInde, 1);
        }

        // first entry
        localStorage.setItem('_cart',JSON.stringify(existing_cart))
        let count = existing_cart.length;
        // console.log("Count: ", count);
        props.counterSet(count);
        // console.log("Props: ", props);
        toast.success("Product added in the cart");
    }

    return (
        <>
            <div className="product-detail py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                            <div className="product-page-product-detail">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <figure className="product-detail-img">
                                            <img src={process.env.REACT_APP_IMAGES_URL+product?.images[0]} alt="" className="img-fluid" />
                                        </figure>
                                        <div className="d-flex sub-images">
                                            {
                                                product && product.images.map((image, ind) => (
                                                    <img key={ind} src={process.env.REACT_APP_IMAGES_URL+image} alt="" />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                        <h4 className="product-title pb-3">{product?.title}</h4>
                                        <p className="product-descriptipn">
                                            { product?.description }
                                        </p>
                                        <h3 className="product-price text-warning">
                                            Rs. {product?.after_discount}
                                        </h3>
                                        <del className="text-secondary">Rs {product?.price}</del>
                                        <div className="quentity-picker my-4">
                                            <label htmlFor="">Quanitity</label>
                                            <input type="number" name="qty" onChange={changeQty} id="" min={0} className="form-control" />
                                        </div>
                                        <button onClick={addToCart} className="btn btn-warning py-3 px-4 ">
                                            <i className="bi bi-cart-check-fill"></i> 
                                            Add to Cart
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <div className="product-page-customer-detail">
                                <ul>

                                    <li>
                                        <h6><i className="bi bi-boxes"></i> Total Product</h6>
                                        <span>{qty}</span>
                                    </li>
                                    <li>
                                        <h6><i className="bi bi-cash-coin"></i> Total Price</h6>
                                        <span>Rs. {amt}</span>
                                    </li>
                                </ul>
                                <div className="h6 px-3 text-secondary">Services</div>
                                <ul>
                                    <li><i className="bi bi-stopwatch"></i> 7 Days Return</li>
                                    <li><i className="bi bi-shield-check"></i> 1 Year Warrenty</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
const mapStateToProps = (rootStore) => ({
    counter: rootStore.cart.counter
})

const mapDispatchToProps = {
    counterSet: setCounter
}
export const ProductDetail = connect(mapStateToProps, mapDispatchToProps)(ProductDetailComponent);