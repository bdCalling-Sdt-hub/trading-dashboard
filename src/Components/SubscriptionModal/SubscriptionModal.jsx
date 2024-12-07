import { Form, Input, Modal, Select } from "antd"
import { useEffect } from "react"
import { RxCross2 } from "react-icons/rx"
import { TbCopyCheck } from "react-icons/tb"
import { useUpdateSubscriptionMutation } from "../../redux/Api/subscription"
import { toast } from "sonner"

const SubscriptionModal = ({ openAddModal, setOpenAddModal, singlePlanData }) => {
    const [updateSubscription] = useUpdateSubscriptionMutation()
    const [form] = Form.useForm()
    const onFinish = (value) => {
        // console.log(value)
        const data = {
            "planName": value?.SubscriptionPlan,
            "fee": value?.MembershipFeePerMonth,
            // "pointRangeStart":0,
            "pointRangeEnd": value?.pointRange,
            "swapPoint": value?.PointEarnPerSwap,
            "positiveCommentPoint": value?.PointLosePerPositiveComment,
            "negativeCommentPoint": value?.PointLosePerNegativeComment,
            // "duration":""

        }
        const id = singlePlanData?.id
        // console.log(id);
        updateSubscription({ id, data }).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenAddModal(false)
            })
            .catch((error) => toast.error(error?.data?.message));
    }


    useEffect(() => {
        if (singlePlanData) {
            form.setFieldsValue({
                SubscriptionPlan: singlePlanData.subscriptionPlan,
                MembershipFeePerMonth: singlePlanData?.membershipFee,
                pointRange: singlePlanData?.pointsRange,
                PointEarnPerSwap: singlePlanData?.pointsPerSwap,
                PointLosePerPositiveComment: singlePlanData?.pointsPerPositiveComment,
                PointLosePerNegativeComment: singlePlanData?.pointsPerNegativeComment,
            });
        }
    }, [singlePlanData])


    return (
        <Modal
            open={openAddModal}
            centered
            footer={false}
            onCancel={() => setOpenAddModal(false)}
        >
            <div>
                <p className='text-xl text-center py-2 font-semibold'>Edit</p>
                <Form className=''
                    layout='vertical'
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name={`SubscriptionPlan`}
                        label={`Subscription Plan`}

                    >
                        <Input className=' border outline-none' placeholder='Gold' />
                    </Form.Item>
                    <Form.Item
                        name={`MembershipFeePerMonth`}
                        label={`Membership Fee Per Month`}

                    >
                        <Input className=' border outline-none' placeholder='$19.99' />
                    </Form.Item>
                    <Form.Item
                        name={`pointRange`}
                        label={`Point Range`}

                    >
                        <Input className=' border outline-none' placeholder='0-24,999' />
                    </Form.Item>
                    <Form.Item
                        name={`PointEarnPerSwap`}
                        label={`Point Earn Per Swap`}

                    >
                        <Input className=' border outline-none' placeholder='20% of product value' />
                    </Form.Item>
                    <Form.Item
                        name={`PointLosePerPositiveComment`}
                        label={`Point Earn per positive comment`}

                    >
                        <Input className=' border outline-none' placeholder='5' />
                    </Form.Item>
                    <Form.Item
                        name={`PointLosePerNegativeComment`}
                        label={`Point Lose per negative comment`}

                    >
                        <Input className=' border outline-none' placeholder='10' />
                    </Form.Item>



                    <div className='flex items-center gap-2'>
                        <button className='flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm'>
                            <TbCopyCheck /> save
                        </button>
                        <button onClick={() => setOpenAddModal(false)} className='py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm'>
                            <RxCross2 /> Cancel
                        </button>
                    </div>

                </Form>
            </div>
        </Modal>
    )
}

export default SubscriptionModal