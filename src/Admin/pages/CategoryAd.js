import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function CategoryAd() {
    let [category, setCategory] = useState([]);
    const getList = () => {
        axios.get("http://localhost:3000/categories").then(res => {
            let data = res.data;
            setCategory(data);
        })
    }
    useEffect(() => {
        getList();
    }, []);
    const remove = (id) => {
        axios.delete(`http://localhost:3000/categories/${id.target.getAttribute("data-item")}`).then(res => {
            getList();
        })
    }
    return (
        <div className="container mt-5">
            <h2>Danh sách thể loại</h2>
            <div className="my-3">
                <Link to="/admin/categories/create" className="btn btn-success">Thêm mới</Link>
            </div>
            <table className="table" border={1}>
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name Category</th>
                    <th scope="col">Tools</th>
                </tr>
                </thead>
                <tbody>
                {category.map((item) => (
                    <>
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>
                                <button type="button" className="btn btn-danger me-2 mr-2" data-toggle="modal"
                                        data-target={`#exampleModal-${item.id}`}>
                                    Delete
                                </button>
                                <div className="modal fade" id={`exampleModal-${item.id}`} tabIndex="-1" role="dialog"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                Bạn chắc chắn muốn xóa thể loại này?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary"
                                                        data-dismiss="modal"
                                                        data-item={item.id}
                                                        onClick={(id) => remove(id)}
                                                >Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={"/admin/categories/update/" + item.id}
                                      className="btn btn-primary">Update</Link>
                            </td>
                        </tr>
                    </>
                ))}
                </tbody>
            </table>
        </div>
    )
}