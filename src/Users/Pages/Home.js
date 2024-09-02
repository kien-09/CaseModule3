import Header from "../Components/Header";
import Narbar from "../Components/Narbar";
import {Outlet} from "react-router-dom";
import Left from "../Components/Left";
import Right from "../Components/Right";
import "./Home.css"

export default function Home(){
    return(
        <div className='container-fluid'>
            <Header/>
            <Narbar/>
            <div className="row main">
                <Left/>
                <div className="col-7 main-item">
                    <Outlet/>
                </div>
                <Right/>
            </div>
        </div>
    )
}