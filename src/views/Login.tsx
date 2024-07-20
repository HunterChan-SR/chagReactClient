import {Button, Form, FormProps, Input} from "antd";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../config";
import {useNavigate} from "react-router-dom";


export default function Login() {
    type FieldType = {
        username?: string;
        password?: string;
    };

    const navigate = useNavigate()
    const [onloading, setOnloading] = useState(false)
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // console.log("submit", values)
        setOnloading(true)
        axios.post(API_URL + '/login', values)
            .then((response) => {
                // console.log(response.data);
                if (response.data.code === 0) {
                    alert("登录成功!")
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('userid', response.data.data.userid);
                    navigate('/')
                } else {
                    alert("用户名或密码错误！")
                }
                setOnloading(false)
            })
            .catch((error) => {
                alert("出错了！请刷新页面，稍后重试")
                navigate('/')
            });
    }
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        alert("格式错误")
    }
    return (

        <Form
            name="loginForm"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600, margin: 'auto'}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete={"off"}
        >
            <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[{required: true, message: '请输入用户名'},
                    {pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能包含英文字母或数字'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{required: true, message: '请输入密码'},
                    {pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含英文字母或数字'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary"
                        htmlType="submit"
                        loading={onloading}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>


    )
}