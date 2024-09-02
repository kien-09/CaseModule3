import {Link, useNavigate} from "react-router-dom";
export default function NarbarAd() {
    const admin = localStorage.getItem('admin');
    const navigate = useNavigate();
    const handleLogout = () => {
        let confirm = window.confirm("Bạn muốn đăng xuất ?")
        if (confirm){
            localStorage.clear();
            navigate('/admin/login');
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
                            {
                                admin ?
                                    <>
                                        <ul className="navbar-nav">
                                            <li className="nav-item active">
                                                <Link className="nav-link" to={'/admin/products'}><h5>Product</h5>
                                                    <span
                                                        className="sr-only">(current)</span></Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to={'/admin/categories'}><h5>Category</h5>
                                                    <span
                                                        className="sr-only">(current)</span></Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to={'/admin/carts'}><h5>Cart</h5>
                                                    <span
                                                        className="sr-only">(current)</span></Link>
                                            </li>
                                        </ul>
                                        <div className="form-inline my-2 my-lg-0 ml-auto mr-2">
                                            <button onClick={handleLogout}
                                                    className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                    type="submit">Logout
                                            </button>
                                            <h5>Admin</h5>
                                        </div>
                                    </>
                                    :
                                    <div className="form-inline my-2 my-lg-0 ml-auto mr-2">
                                        <button onClick={() => {
                                            navigate('/admin/login')
                                        }} className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                type="submit">Login
                                        </button>
                                    </div>
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}