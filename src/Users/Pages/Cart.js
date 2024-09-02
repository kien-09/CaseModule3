import axios from "axios";
import {useContext} from "react";
import {MyContext} from "../../MyContext";
import {useNavigate} from "react-router-dom";

export default function Cart() {
    const {listCarts, setListCarts} = useContext(MyContext);
    const navigate = useNavigate();
    const cartId = localStorage.getItem("cartId") ? localStorage.getItem("cartId") : '';
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''
    const changeQuantity = (quantityNew, idProduct) => {
        let newListProducts = listCarts?.products?.map(item => {
            if (item.id === idProduct) {
                return {
                    ...item,
                    quantity: quantityNew
                }
            }
            return {...item}
        })
        newListProducts = newListProducts.filter(item => item.quantity > 0)
        const total = newListProducts?.reduce((acc, curr) => curr.quantity * curr.price + acc, 0)
        return {
            products: newListProducts,
            total
        }
    }
    const haneldChangeCart = (newQuantity, idProduct) => {
        const data = {
            ...changeQuantity(newQuantity, idProduct),
            user
        }
        axios.put(`http://localhost:3000/carts/${cartId}`, data).then(res => {
            setListCarts(res.data);
        })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/carts/${cartId}`).then(res => {
            setListCarts({});
            localStorage.removeItem("cartId")
        }).catch(e => {
            alert("Bạn chưa có sản phẩm nào!")
        })
    }

    return (
        <>
            <button className="btn btn-secondary" onClick={() => {
                navigate(-1)
            }}> Trở lại
            </button>
            <h1 className="cart">Danh sách giỏ hàng của bạn</h1>
            <br/>
            {listCarts && listCarts?.products?.length > 0 ?
                <div className='cart-item'>
                    <div>
                        {
                            listCarts?.products?.map((item, index) => (
                                <div key={index}>
                                    <h3>{item.name}</h3>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>${item.price}</p>
                                    <button onClick={() => haneldChangeCart(item.quantity - 1, item.id)}>-</button>
                                    <button onClick={() => haneldChangeCart(item.quantity + 1, item.id)}>+</button>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        Tổng tiền: ${listCarts.total}
                    </div>
                    <br/>
                    <button onClick={handleDelete}>Xoá tất cả</button>
                </div>
                : <h3>Giỏ hàng trống</h3>
            }
            <br/><br/>

        </>
    )
}