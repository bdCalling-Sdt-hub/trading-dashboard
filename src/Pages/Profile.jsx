import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { CiEdit } from "react-icons/ci";
import { useChangePasswordMutation, useGetProfileQuery, useUpdateProfileMutation } from "../redux/Api/userApi";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { imageUrl } from "../redux/Api/baseApi";
import { useNavigate } from "react-router-dom";



const admin = false;
const Profile = () => {
    /** all API */
    const { data: getProfile } = useGetProfileQuery()
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()
    const [changePassword, { isLoading: changePasswordLoading }] = useChangePasswordMutation()

    const navigate = useNavigate()

    const [image, setImage] = useState();
    const [form] = Form.useForm()
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "Profile");
    const [passError, setPassError] = useState('')
    const handlePageChange = (tab) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }

    const onFinish = (values) => {
        if (values?.newPassword === values.currentPassword) {
            return setPassError('Your old password cannot be your new password')
        }
        if (values?.newPassword !== values?.confirmPassword) {
            return setPassError("Confirm password doesn't match")
        } else {
            setPassError('')
        }
        changePassword(values).unwrap()
            .then((payload) => {
                toast.success("Your password change successfully Please login again!")
                localStorage.removeItem('token')
                navigate('/auth/login')
            })
            .catch((error) => toast.error(error?.data?.message));
    };
    const onEditProfile = (values) => {
        const formData = new FormData()
        if (image) {
            formData.append("profile_image", image);
        }
        if (values?.fullName) {
            formData.append('name', values?.fullName)
        }
        if (values?.mobileNumber) {
            formData.append('phone_number', values?.mobileNumber)
        }
        if(values?.address){
            formData.append('address', values?.address)

        }
        updateProfile(formData).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    }
    useEffect(() => {
        const data = {
            fullName: getProfile?.data?.result?.name,
            email: getProfile?.data?.result?.email,
            mobileNumber: getProfile?.data?.result?.phone_number,
            address: getProfile?.data?.result?.address
        }
        form.setFieldsValue(data)
    }, [getProfile])

    return (
        <div>

            <div className='container pb-16'>

                <div className='bg-base py-9 px-10 rounded flex items-center justify-center flex-col gap-6'>
                    <div className='relative w-[140px] h-[124px] mx-auto'>
                        <input type="file" onInput={handleChange} id='img' style={{ display: "none" }} />
                        <img
                            style={{ width: 140, height: 140, borderRadius: "100%" }}
                            src={`${image ? URL.createObjectURL(image) : `${imageUrl}${getProfile?.data?.result?.profile_image}`}`}
                            alt=""
                            className="border-blue-500 border-2 shadow-2xl"
                        />

                        {
                            tab === "Profile" && <label
                                htmlFor="img"
                                className='
                            absolute top-1/2 -right-2
                            bg-white
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        '
                            >
                                <CiEdit color='#929394' />
                            </label>
                        }

                    </div>
                    <div className='w-fit'>
                        <p className=' text-[#575757] text-[24px] leading-[32px] font-semibold  '>{getProfile?.data?.result?.name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 my-6">
                    <p
                        onClick={() => handlePageChange("Profile")}
                        className={`
                        ${tab === "Profile" ? "border-[#3475F1] border-b-2 font-semibold text-[#3475F1]" : "border-b-2 border-transparent font-normal text-gray-600"}
                        pb-2 cursor-pointer text-[16px] leading-5  
                    `}
                    >
                        Edit Profile
                    </p>
                    <p
                        onClick={() => handlePageChange("Change Password")}
                        className={`
                        ${tab === "Change Password" ? "border-[#3475F1] border-b-2 font-semibold text-[#3475F1]" : "border-b-2 border-transparent font-normal  text-gray-600"}
                        pb-2 cursor-pointer text-base leading-[18px]  
                    `}
                    >
                        Change Password
                    </p>
                </div>
                {
                    tab === "Profile"
                        ?
                        <div
                            className='max-w-[481px] mx-auto rounded-lg p-6'

                        >
                            <h1 className='text-center text-secondary leading-7 text-2xl font-medium mb-7'>Edit
                                Profile</h1>
                            <Form
                                onFinish={onEditProfile}
                                layout="vertical"
                                form={form}
                            >
                                <Form.Item
                                    name="fullName"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">User
                                        Name</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 40,
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            backgroundColor: "#F6F6F6",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="name123"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Email</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            border: "1px solid #DCDDDE",
                                            backgroundColor: "#F6F6F6",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        disabled
                                        className='text-[16px] leading-5'
                                        placeholder={`xyz@gmail.com`}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="mobileNumber"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Contact
                                        no</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            backgroundColor: "#F6F6F6",
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="+9900700007"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Address</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            backgroundColor: "#F6F6F6",
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="79/A Joker Vila, Gotham City"
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width: 197,
                                            height: 48,
                                            color: "#FCFCFC",
                                            background: '#3475F1'
                                        }}
                                        disabled={isLoading}
                                        className='font-normal text-[16px] leading-6 bg-primary'
                                    >
                                        {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />} /> : "Save & Changes"}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        :
                        <div
                            className='max-w-[481px] mx-auto rounded-lg p-6'

                        >
                            <h1 className='text-center text-secondary leading-7 text-2xl font-medium mb-7'>Change
                                Password</h1>
                            <Form
                                layout='vertical'
                                onFinish={onFinish}
                                form={form}
                            >
                                <Form.Item
                                    name="oldPassword"
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Current
                                        Password</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Current Password!"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            backgroundColor: "#F6F6F6",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="***************"
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter New Password!"
                                        }
                                    ]}
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">New
                                        Password</p>}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            backgroundColor: "#F6F6F6",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="************"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Confirm
                                        Password</p>}
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Confirm Password!"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            backgroundColor: "#F6F6F6",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="***************"
                                    />
                                </Form.Item>
                                {passError && <p className="text-red-600 -mt-4 mb-2 text-center">{passError}</p>}
                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width: 197,
                                            height: 48,
                                            color: "#FFFFFF",
                                            background: '#3475F1'
                                        }}
                                        disabled={changePasswordLoading}
                                        className='font-normal text-[16px] leading-6 bg-primary'
                                    >
                                        {changePasswordLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />} /> : 'Save Changes'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                }
            </div>
        </div>
    );
};

export default Profile;