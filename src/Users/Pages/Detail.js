import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {MyContext} from "../../MyContext";

export default function Detail() {
    const {listCarts, setListCarts} = useContext(MyContext);
    const [data, setData] = useState([]);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''
    const navigate = useNavigate()
    let {id} = useParams();
    useEffect(() => {
        axios.get("http://localhost:3000/products/" + id).then(res => {
            setData(res.data)
        })
    }, [])
    const changeQuantity = (product) => {
        let isCheck = false
        const newListProducts = listCarts?.products?.map(item => {
            if (item.id === product.id) {
                isCheck = true
                return {
                    ...item, quantity: item.quantity + 1
                }
            }
            return item
        })
        if (!isCheck) {
            newListProducts.push(product)
        }
        const total = newListProducts?.reduce((acc, curr) => curr.quantity * curr.price + acc, 0)
        return {
            products: newListProducts, total
        }
    }
    const handleAddCart = (product) => {
        if (user) {
            let data = {}
            if (!localStorage.getItem("cartId")) {
                data = {
                    user: user?.username, total: product.price, products: [product]
                }
            } else {
                data = {
                    user: user?.username, ...changeQuantity(product),
                }
            }
            axios.post(`http://localhost:3000/carts/`, data).then(res => {
                setListCarts(res.data);
                localStorage.setItem("cartId", res.data.id)
            })
        } else {
            alert('Bạn cần đăng nhập để thêm giỏ hàng')
        }
    }
    return (
        <>
            <button className="btn btn-secondary" onClick={()=>{
                navigate(-1)
            }}>trở lại</button>
            <div className="detail">
                {data?.images?.map((item, index) => (
                    <span key={index}><img className="mr-4 mb-2 " src={item} alt={"Ảnh sản phẩm"}/></span>
                ))}
                <h5 className="card-title">{data.name}</h5>
                <h6 className="card-title">Giá: ${data.price}</h6>
                <button type="button" onClick={() => handleAddCart({
                    id: data.id, name: data.name, quantity: 1, price: data.price
                })}>Thêm vào giỏ hàng
                </button>
            </div>
        </>

    )
}