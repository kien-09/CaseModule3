import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export default function CreateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");
    const navigate = useNavigate();
    const changeName = (event) => {
        let dataInput = event.target.value;
        setName(dataInput);
    }
    const changePrice = (event) => {
        let dataInput = event.target.value;
        setPrice(dataInput);
    }
    const changeQuantity = (event) => {
        let dataInput = event.target.value;
        setQuantity(dataInput);
    }
    const changeCategory = (event) => {
        let dataInput = event.target.value;
        setCategory(dataInput);
    }
    const changeImage1 = (event)=>{
        let dataInput = event.target.value;
        setImageUrl1(dataInput)
    }
    const changeImage2 = (event)=>{
        let dataInput = event.target.value;
        setImageUrl2(dataInput)
    }
    const changeImage3 = (event)=>{
        let dataInput = event.target.value;
        setImageUrl3(dataInput)
    }
    const changeImage4 = (event)=>{
        let dataInput = event.target.value;
        setImageUrl4(dataInput)
    }
    const submit = () => {
        let product = {
            name: name, price: price, quantity: quantity, category: category,images:[]
        }
        if (imageUrl1) product.images.push(imageUrl1);
        if (imageUrl2) product.images.push(imageUrl2);
        if (imageUrl3) product.images.push(imageUrl3);
        if (imageUrl4) product.images.push(imageUrl4);
        axios.post("http://localhost:3000/products", product).then(() => {
            alert("Thêm thành công!");
            navigate("/admin/products");
        })
    }
    return (
        <div className="container mt-5">
            <h2>Create Product</h2>
            <div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm :</label>
                    <input value={name} onChange={(event) => {
                        changeName(event)
                    }} type="text" className="form-control" id="name"
                           placeholder="Nhập tên sản phẩm"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá sản phẩm:</label>
                    <input value={price} onChange={(event) => {
                        changePrice(event)
                    }} type="text" className="form-control" id="price"
                           placeholder="Nhập giá sản phẩm"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Số lượng sản phẩm:</label>
                    <input value={quantity} onChange={(event) => {
                        changeQuantity(event)
                    }} type="text" className="form-control" id="price"
                           placeholder="Nhập số lượng sản phẩm"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Thể loại sản phẩm:</label>
                    <select value={category} onChange={(event) => {
                        changeCategory(event)
                    }} className="form-control" id="category"
                    >
                        <option></option>
                        <option>Thể thao</option>
                        <option>Công nghệ</option>
                        <option>Du lịch</option>
                        <option>Giáo Dục</option>
                        <option>Nghệ thuật</option>
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="Image1" className="form-label">Ảnh sản phẩm 1 :</label>
                <input value={imageUrl1} onChange={(event) => {
                    changeImage1(event)
                }} type="text" className="form-control" id="Image1"
                       placeholder="Nhập url ảnh 1"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Image2" className="form-label">Ảnh sản phẩm 2 :</label>
                <input value={imageUrl2} onChange={(event) => {
                    changeImage2(event)
                }} type="text" className="form-control" id="Image2"
                       placeholder="Nhập url ảnh 2"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Image3" className="form-label">Ảnh sản phẩm 3 :</label>
                <input value={imageUrl3} onChange={(event) => {
                    changeImage3(event)
                }} type="text" className="form-control" id="Image3"
                       placeholder="Nhập url ảnh 3"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Image4" className="form-label">Ảnh sản phẩm 4 :</label>
                <input value={imageUrl4} onChange={(event) => {
                   changeImage4(event)
                }} type="text" className="form-control" id="Image4"
                       placeholder="Nhập url ảnh 4"/>
            </div>
            <button className="btn btn-primary me-2 mr-2" onClick={() => {
                submit()
            }}>Thêm
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/products')}>Trở lại</button>
        </div>
    )
}