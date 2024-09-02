import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function ProductsAd() {
    let [products, setProducts] = useState([]);
    const getList = () => {
        axios.get("http://localhost:3000/products").then(res => {
            let data = res.data;
            setProducts(data);
        })
    }
    useEffect(() => {
        getList();
    }, []);
    const remove = (id) => {
        axios.delete(`http://localhost:3000/products/${id.target.getAttribute("data-item")}`).then(res => {
            getList();
        })
    }

    return (
        <>
            <div className="container mt-5">
                <h2>Danh sách sản phẩm</h2>
                <div className="my-3">
                    <Link to="/admin/products/create" className="btn btn-success">Thêm mới</Link>
                </div>
                <table className="table" border={1}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name Product</th>
                        <th scope="col">Price Product</th>
                        <th scope="col">Quantity Product</th>
                        <th scope="col">Category Product</th>
                        <th scope="col">Image Product</th>
                        <th scope="col">Tools</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((item) => (
                        <>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>
                                    <Link to={"/detail/" + item.id} className="text-decoration-none">{item.name}</Link>
                                </td>
                                <td scope="row">{item.price}</td>
                                <td scope="row">{item.quantity}</td>
                                <td scope="row">{item.category}</td>
                                <td scope="row">{item.images.map(e=>(
                                    <img src={e} alt="img"/>
                                ))}</td>
                                <td>
                                    <button type="button" className="btn btn-danger me-2 mr-2" data-toggle="modal"
                                            data-target={`#exampleModal-${item.id}`}>Delete
                                    </button>
                                    <div className="modal fade" id={`exampleModal-${item.id}`} role="dialog"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">

                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    Bạn chắc chắn muốn xóa sản phẩm này?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary"
                                                            data-dismiss="modal">Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-primary"
                                                            data-item={item.id}
                                                            data-dismiss="modal" onClick={(id) => remove(id)}
                                                    >Ok
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={"/admin/products/update/" + item.id}
                                          className="btn btn-primary">Update</Link>
                                </td>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}