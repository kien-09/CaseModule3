import {Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

export default function Register() {
    let navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    return (
        <div className='register'>
            <br/>
            <h1>Register</h1>
            <br/>
            <Formik initialValues={
                {
                    username: "",
                    password: "",
                    dob: "",
                    name: ""
                }
            } onSubmit={values => {
                values.dob = startDate ? startDate.toLocaleDateString('en-CA') : ''
                axios.post("http://localhost:3000/users/register", values).then(res => {
                    alert("Đăng ký thành công!");
                    navigate("/users/login")
                }).catch(e => {
                    alert("Tài khoản này đã được đăng ký")
                })
            }}>
                <Form>
                    <Field placeholder="Nhập tên" name={"name"}/>
                    <br/><br/>
                    <DatePicker placeholderText={'Nhập ngày sinh'}
                        dateFormat="dd/MM/yyyy"
                        selected={startDate} onChange={(date) => setStartDate(date)}
                    />
                    <br/><br/>
                    <Field placeholder="Nhập username" name={"username"}/>
                    <br/><br/>
                    <Field placeholder="Nhập password" name={"password"}/>
                    <br/><br/>
                    <button className="btn btn-success">Register</button>
                </Form>
            </Formik>
        </div>
    )
}