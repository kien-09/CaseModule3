import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Users/Pages/Home";
import Products from "./Users/Pages/Products";
import Detail from "./Users/Pages/Detail";
import Register from "./Users/Pages/Register";
import Login from "./Users/Pages/Login";
import LoginAd from "./Admin/pages/LoginAd";
import HomeAd from "./Admin/pages/HomeAd";
import Cart from "./Users/Pages/Cart";
import ProductsAd from "./Admin/pages/ProductsAd";
import UpdateProduct from "./Admin/pages/UpdateProduct";
import CreateProduct from "./Admin/pages/CreateProduct";
import CategoryAd from "./Admin/pages/CategoryAd";
import UpdateCategory from "./Admin/pages/UpdateCategory";
import CreateCategory from "./Admin/pages/CreateCategory";
import CartAd from "./Admin/pages/CartAd";
import FirebaseImageUpload from "./FirebaseImageUpload/FirebaseImageUpload";

function App() {
    return (
        <Routes>
            <Route path={''} element={<Home/>}>
                <Route path={'products'} element={<Products/>}/>
                <Route path={'detail/:id'} element={<Detail/>}/>
                <Route path={'users/register'} element={<Register/>}/>
                <Route path={'users/login'} element={<Login/>}/>
                <Route path={'carts'} element={<Cart/>}/>
            </Route>
            <Route path={'admin'} element={<HomeAd/>}>
                <Route path={'login'} element={<LoginAd/>}/>
                <Route path={'products'} element={<ProductsAd/>}/>
                <Route path={'products/update/:id'} element={<UpdateProduct/>}/>
                <Route path={'products/create'} element={<CreateProduct/>}/>
                <Route path={'categories'} element={<CategoryAd/>}/>
                <Route path={'categories/update/:id'} element={<UpdateCategory/>}/>
                <Route path={'categories/create'} element={<CreateCategory/>}/>
                <Route path={'carts'} element={<CartAd/>}/>
            </Route>
            <Route path={'firebase'} element={<FirebaseImageUpload/>}></Route>
        </Routes>
    );
}

export default App;
