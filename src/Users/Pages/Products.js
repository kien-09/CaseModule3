import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";

export default function Products() {
    const {listCarts, setListCarts} = useContext(MyContext)
    const [list, setList] = useState([]);
    const [nameSearch, setNameSearch] = useState('')
    const [categorySearch, setCategorySearch] = useState('')
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ''
    const getAll = () => {
        axios.get("http://localhost:3000/products").then(res => {
            setList(res.data);
        })
    }
    useEffect(() => {
        getAll();
    }, []);
    let findNameContain = (event) => {
        setNameSearch(event.target.value);
        let input = event.target.value;
        if (input === "") {
            getAll();
        } else {
            let newList = list.filter((item) => {
                let nameProduct = item.name;
                return nameProduct.toLowerCase().includes(input.toLowerCase());
            });
            setList(newList);
        }
    }
    let findCategoryContain = (event) => {
        setCategorySearch(event.target.value);
        let input = event.target.value;
        if (input === "") {
            getAll();
        } else {
            let newList = list.filter((item) => {
                let categoryProduct = item.category;
                return categoryProduct.toLowerCase().includes(input.toLowerCase());
            });
            setList(newList);
        }
    }
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
            <form className="form-inline my-2 my-lg-4 ml-4">
                <input value={nameSearch} onChange={(event) => {
                    findNameContain(event);
                }} className="form-control mr-sm-2" type="search" placeholder="Name Product"
                       aria-label="Search"/>
                <input value={categorySearch} onChange={(event) => {
                    findCategoryContain(event);
                }} className="form-control mr-sm-2" type="search" placeholder="Category Product"
                       aria-label="Search"/>
                <br/><br/>
            </form>
            <div className="row">
                <div className="col-12"></div>
                {list.map(item => (
                    <>
                        <div className="col-4 mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <p><img src={item.images[0]} alt={"Ảnh sản phẩm"}></img></p>
                                    <h5 className="card-title">{item.name}</h5>
                                    <Link to={'/detail/' + item.id}>Xem chi tiết</Link>
                                    <br/><br/>
                                    <button type="button" onClick={() => handleAddCart({
                                        id: item.id, name: item.name, quantity: 1, price: item.price
                                    })}>Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}