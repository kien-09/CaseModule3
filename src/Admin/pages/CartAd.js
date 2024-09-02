import {useEffect, useState} from "react";
import axios from "axios";

export default function CartAd() {
    const [listCard, setListCart] = useState([]);
    const getList = () => {
        axios.get("http://localhost:3000/carts").then(res => {
            setListCart(res.data);
        })
    }
    useEffect(() => {
        getList();
    }, [])
    return (
        <>
            <div className="container mt-5">
                <h2>Danh sách giỏ hàng</h2>
                <br/>
                <table className="table" border={1}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User</th>
                        <th scope="col">Total</th>
                        <th scope="col">Date</th>
                        <th scope="col">Product</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listCard.map((item) => (
                        <>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <th scope="row">{item.user}</th>
                                <th scope="row">{item.total}</th>
                                <th scope="row">{item.date}</th>
                                <th scope="row">{item.products.map(e => (
                                    <tr>
                                        <th scope="row">Id : {e.id}</th>
                                        <th scope="row">Name : {e.name}</th>
                                        <th scope="row">Quantity : {e.quantity}</th>
                                        <th scope="row">Price : {e.price}</th>
                                    </tr>
                                ))}
                                </th>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}