import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {setKeyword, setResult} from "../../../actions/search.acts"
function HeaderMiddleComponent(props) {
    // let [keyword, setKeyword] = useState();
    let navigate = useNavigate();

    let [count, setCount] = useState(0);

    const setSearchKeyword = (ev) => {
        let keyword = ev.target.value;
        props.setKeyword(keyword);
    }
    const search = (e) => {
        e.preventDefault();
        props.searchResult(props.keyword);
        navigate('/search?keyword='+props.keyword);
    }

    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem('_cart')) || [];
        setCount(cartItems.length);
    }, [])
    
    useEffect(() => {
        let counts = props.cart.counter;
        if(!counts){
            let cartItems = JSON.parse(localStorage.getItem('_cart')) || [];
            counts = cartItems.length;
        }
        setCount(counts);
    }, [props.cart])
    return (
        <>
            <div className="container">
                <div className="header-middle">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <div className="brand-logo">
                                <NavLink to="/">
                                    <img src="../images/logo.png" alt="" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <form className="d-flex" onSubmit={search}>
                                <input onChange={setSearchKeyword} className="form-control me-2 rounded-pill" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <ul className="header-middle-right text-end">
                                {/* <li className="position-relative">
                                    <a href=""><i className="bi bi-heart-fill"></i></a>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        9
                                    </span>
                                </li> */}
                                <li className="position-relative">
                                    <NavLink to="/cart"><i className="bi bi-cart3"></i></NavLink>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {count || 0}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (rootStore) => ({
    keyword: rootStore.search.keyword,
    result: rootStore.search.search_result,
    cart: rootStore.cart['counter'] || 0
})

const mapDispatchToProps = {
    setKeyword: setKeyword,
    searchResult: setResult
}

export const HeaderMiddle = connect(mapStateToProps, mapDispatchToProps)(HeaderMiddleComponent);