import { Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import { Menu, MenuProps} from "antd";
import Settings from "../views/Settings";
import Contests from "../views/Contests";
import Users from "../views/Users";
import {API_URL} from "../config";
import axios from "axios";
import { useEffect, useState} from "react";
import IdCard from "../views/subviews/IdCard";
// import SubMenu from "antd/lib/menu/SubMenu";
import Login from "../views/Login";
import Exit from '../views/Exit'
import {BeanUser} from "../bean/BeanUser";
import Problems from "../views/Problems";
import NeedHelpDays from "../views/NeedHelpDays";
import NeedHelp from "../views/NeedHelp";

type MenuItem = Required<MenuProps>['items'][number];

function CLayout() {
    const navigate = useNavigate();
    const [beanUser, setBeanUser] = useState<BeanUser>(
        {
            id: 0,
            username: '正在加载..',
            password: '',
            nickname: '正在加载..',
            rating: 0,
            ranking: 0,
        }
    );

    const [loginexit, setLoginExit] = useState(
        // {
        //     label: '登录',
        //     key: 'login',
        //     icon: <Link to='login'></Link>,
        // }
        {
            label: '退出',
            key: 'exit',
            icon: <Link to='exit'>
            </Link>
        }
    )

    const items: MenuItem[] = [
        {
            label: '比赛',
            key: 'contests',
            icon: <Link to='contests'></Link>,
        },
        {
            label: '积分榜',
            key: 'users',
            icon: <Link to='users'></Link>,
        },
        {
          label: '提问',
          key: 'needhelps',
          icon: <Link to='needhelps'></Link>,
        },
        {
            label: '设置',
            key: 'settings',
            icon: <Link to='settings'></Link>,
        },
        loginexit
    ];

    //回调函数
    useEffect(() => {

        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');
        if (token) {
            axios.get(API_URL + '/user/' + userid, {
                headers: {
                    Authorization: token
                }
            })
                .then((response) => {
                    if (response.data.code === 0) {
                        setBeanUser(response.data.data);
                    }
                })
                .catch( (error)=> {
                    alert("出错了！请刷新页面，稍后重试!")
                    navigate('/')
                })
        } else {
            setLoginExit(
                {
                    label: '登录',
                    key: 'login',
                    icon: <Link to='login'></Link>,
                }
            )
            alert("请先登录！");
            navigate('/login')
        }
    }, [navigate]);

    return (
        <div>
            <IdCard beanUser={beanUser}  />
            <Menu mode="horizontal" items={items}>
            </Menu>
            <Routes>
                <Route path="/" element={<Users/>}/>
                <Route path="/contests" element={<Contests/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/settings" element={<Settings beanUser={beanUser} />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/exit" element={<Exit/>}/>
                <Route path="/contest/:id" element={<Problems/>}/>
                <Route path="/needhelps" element={<NeedHelpDays/>}/>
                <Route path="/needhelp/:id" element={<NeedHelp/>}/>
                {/*    默认路由*/}
                <Route path="*" element={<Users/>}/>
            </Routes>
            <Outlet/>

        </div>

    )
}

export default CLayout