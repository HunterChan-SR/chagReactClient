import {Button, Form} from "antd";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"; // Import useNavigate for navigation

export default function Login() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local token and userid
        localStorage.removeItem('token');
        localStorage.removeItem('userid');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <Form
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600, margin: 'auto'}}
        >
            <Form.Item
                wrapperCol={{offset: 8, span: 16}}>
                <h3>确认是否退出登录</h3>
            </Form.Item>

            <Form.Item
                wrapperCol={{offset: 8, span: 16}}>
                <Button onClick={handleLogout}>确定</Button>
            </Form.Item>

        </Form>
    );
}