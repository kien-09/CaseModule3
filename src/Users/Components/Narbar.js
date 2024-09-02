import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";

export default function Narbar() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const navigate = useNavigate();
    const {listCarts, setListCarts} = useContext(MyContext)
    const cartId = localStorage.getItem("cartId") ? localStorage.getItem("cartId") : '';

    const getAll = () => {
        if (cartId) {
            axios.get(`http://localhost:3000/carts/${cartId}`).then(res => {
                setListCarts(res.data);
            }).catch(e => {
                alert("Giỏ hàng của bạn trống")
            })
        }
    }
    useEffect(() => {
        getAll();
    }, [cartId]);
    const handleLogout = () => {
        let confirm = window.confirm("Bạn muốn đăng xuất ?");
        if (confirm){
            localStorage.clear();
            setListCarts({})
            navigate('users/login')
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12 menu">
                    <nav className="navbar navbar-expand-lg navbar-light bg-blue">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                                <li className="nav-item active">
                                    <Link className="nav-link" to= {'/'}><h5>Home</h5> <span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={'/products'}><h5>List Product</h5> <span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                <button onClick={() => {
                                    navigate('/carts')
                                }}><img id='cart'
                                        src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Ecommerce-Shopping-Cart-icon.png"
                                        alt=""/></button>
                            </ul>
                            <div className="form-inline my-2 my-lg-0 ml-auto mr-2">
                                {
                                    user ?
                                        <button onClick={handleLogout}
                                                className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                type="submit">Logout</button>
                                        :
                                        <>
                                            <button onClick={() => {
                                                navigate('/users/login')
                                            }} className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                    type="submit">Login
                                            </button>
                                            <button onClick={() => {
                                                navigate('/users/register')
                                            }} className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                    type="submit">Register
                                            </button>
                                        </>
                                }
                                <h5>{user?.name}</h5>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}