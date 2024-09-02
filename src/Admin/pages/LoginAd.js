import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

export default function LoginAd() {
    let navigate = useNavigate();
    return (
        <div className='login loginAd mt-5'>
            <br/><br/>
            <h1>Login</h1>
            <br/>
            <Formik initialValues={
                {
                    username: "",
                    password: ""
                }
            } onSubmit={values => {
                if (values.username === 'admin' && values.password === 'admin') {
                    alert("Đăng nhập thành công!")
                    localStorage.setItem("admin", 'admin')
                    navigate('/admin')
                } else {
                    alert("Sai username or password!")
                }
            }}>
                <Form>
                    <br/>
                    <Field name={"username"}/>
                    <br/><br/>
                    <Field name={"password"}/>
                    <br/><br/>
                    <button className="btn btn-success">Login</button>
                </Form>
            </Formik>
        </div>
    )
}