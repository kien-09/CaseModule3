import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export default function CreateCategory() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const changeName = (event) => {
        let dataInput = event.target.value;
        setName(dataInput);
    }
    const submit = () => {
        let category = {
            name: name
        }
        axios.post("http://localhost:3000/categories", category).then(() => {
            alert("Thêm thành công!");
            navigate("/admin/categories");
        })
    }
    return (
        <div className="container mt-5">
            <h2>Create Category</h2>
            <div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Tên thể loại :</label>
                    <input value={name} onChange={(event) => {
                        changeName(event)
                    }} type="text" className="form-control" id="category"
                           placeholder="Nhập tên thể loại"/>
                </div>
            </div>
            <button className="btn btn-primary me-2 mr-2" onClick={() => {
                submit()
            }}>Thêm
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/categories')}>Trở lại</button>
        </div>
    )
}