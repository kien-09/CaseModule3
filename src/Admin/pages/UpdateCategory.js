import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
export default function UpdateCategory(){
    const [name,setName]=useState("");
    const params = useParams();
    const idUpdate = params.id;
    const navigate = useNavigate();
    const changeName = (event) => {
        let dataInput = event.target.value;
        setName(dataInput);
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/categories/"+idUpdate).then((res)=>{
            let data = res.data;
            setName(data.name);
        })
    },[])
    const submit = () => {
        let category = {
            name: name
        }
        axios.put(`http://localhost:3000/categories/${idUpdate}`, category).then(() => {
            alert("Sửa thành công!");
            navigate("/admin/categories");
        })
    }
    return(
        <div className="container mt-5">
            <h2>Update Category</h2>
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
            }}>Sửa
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/categories')}>Trở lại</button>
        </div>
    )
}