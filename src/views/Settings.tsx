import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {BeanModifyPassword, BeanUser} from "../bean/BeanUser";
import {Button, Form, FormProps, Input} from "antd";
import axios from "axios";
import {API_URL} from "../config";

function Settings({beanUser}: { beanUser: BeanUser }) {
    type FieldType = {
        password?: string;
        newpasswd?: string;
        renewpasswd?: string;
    };

    const navigate = useNavigate()
    const [onloading, setOnloading] = useState(false)

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const token = localStorage.getItem('token')
        const userid = localStorage.getItem('userid') as string;
        setOnloading(true)
        if (values.newpasswd === values.renewpasswd) {
            if (values.newpasswd === values.password) {
                alert("新密码不能与原密码相同~")
            } else {
                const putData: BeanModifyPassword = {
                    id: userid,
                    password: values.password as string,
                    newPassword: values.newpasswd as string,
                }
                axios.put(API_URL + '/user', putData, {
                    headers: {
                        Authorization: token
                    }
                }).then((response) => {
                    if (response.data.code === 0) {
                        alert("修改成功!请重新登录！");
                        localStorage.removeItem('token');
                        localStorage.removeItem('userid');
                        navigate('/login');
                    } else {
                        alert("原密码错误!");
                    }
                }).catch((error) => {
                    console.log("error:", error)
                    alert("出错了！请刷新页面，稍后重试")
                    navigate('/login');
                })
            }
        } else {
            alert("两次密码不一致");
        }
        setOnloading(false)
    }
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        alert("格式错误")
    }


    return (
        <div>
            <Form
                name="modifyPasswordForm"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete={"off"}
            >
                <Form.Item
                    label="原密码"
                    name="password"
                    rules={[{required: true, message: '请输入原密码'},
                        {pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含英文字母或数字'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="newpasswd"
                    rules={[{required: true, message: '请输入新密码'},
                        {pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含英文字母或数字'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="确认新密码"
                    name="renewpasswd"
                    rules={[{required: true, message: '请重入新密码'},
                        {pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含英文字母或数字'},
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary"
                            htmlType="submit"
                            loading={onloading}
                    >
                        提交
                    </Button>
                </Form.Item>



            </Form>


        </div>
    )
}

export default Settings