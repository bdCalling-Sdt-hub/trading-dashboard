import { Button, Form, Input, } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/Api/userApi";
import img from '../../assets/images/forget.png'
import { toast } from "sonner";

const ForgotPassword = () => {
    const [forgotPassword] = useForgotPasswordMutation()
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log(values);
        forgotPassword(values).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                navigate('/auth/otp')
                localStorage.setItem('email',  values?.email)
            })
            .catch((error) => toast.error(error?.data?.message));
        // navigate("/auth/otp")
    };
    return (
        <div className="grid grid-cols-2 items-center h-[100vh]"
            style={{
                width: "100%",
                // background: "#BD8E05",
                height: "100vh",
            }}
        >


            <div className="bg-[#C0D4FB] h-full flex items-center justify-center ">
                <img src={img} className="object-contain h-[50%]" alt="" />
            </div>
            <div className=" bg-white flex justify-center items-center">
                <Form
                    name="normal_login"
                    className="password-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{ width: "630px", background: "white", borderRadius: "12px", padding: "90px 57px" }}

                    onFinish={onFinish}
                >
                    <h1 style={{ fontSize: "32px", marginBottom: "54px", color: "#494949", textAlign: "center" }}>Forgot Password</h1>

                    <div style={{ marginBottom: "24px" }}>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}> Email Address</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="email"
                            id="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                style={{
                                    border: "1px solid #E0E4EC",
                                    height: "52px",
                                    background: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}

                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            style={{
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#3475F1",
                                color: "white",
                                alignSelf: "bottom",
                                marginTop: "30px",
                            }}
                        >
                           
                                Send a Code

                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;