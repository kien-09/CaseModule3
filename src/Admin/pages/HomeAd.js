import {Outlet} from "react-router-dom";
import NarbarAd from "../components/NarbarAd";
import HeaderAd from "../components/HeaderAd";
import "./HomeAd.css"
export default function HomeAd(){
    return(
        <>
            <div className='container-fluid'>
                <HeaderAd/>
                <NarbarAd/>
                <div className="row main">
                    <div className="col-12 main-item">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}