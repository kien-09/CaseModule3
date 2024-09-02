import {Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../../MyContext";

export default function Login() {
    const navigate = useNavigate();
    const cartId = localStorage.getItem("cartId") ? localStorage.getItem("cartId") : '' ;
    return (
        <div className='login'>
            <br/><br/>
            <h1>Login</h1>
            <br/>
            <Formik initialValues={
                {
                    username: "",
                    password: ""
                }
            } onSubmit={values => {
                axios.post("http://localhost:3000/users/login", values).then((res) => {
                    alert("Đăng nhập thành công!");
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    axios.get(`http://localhost:3000/carts/user/${res.data.user.username}`).then(res => {
                        localStorage.setItem("cartId", res.data.id)
                        navigate('/')
                    }).catch(e => {
                        navigate('/')
                    })
                }).catch(e => {
                    alert("Sai username or password!")
                })
            }}>
                <Form>
                    <Field placeholder="Nhập username" name={"username"}/>
                    <br/><br/>
                    <Field placeholder="Nhập password" name={"password"}/>
                    <br/><br/>
                    <button className="btn btn-success">Login</button>
                </Form>
            </Formik>
        </div>
    )
}