import { Table} from "antd";
import {BeanUser} from "../bean/BeanUser";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config";
import IdCard from "./subviews/IdCard";

function Users() {

    const [beanUsers, setBeanUsers] = useState<BeanUser[]>(
        [
            {
                id: 0,
                username: '正在加载...',
                password: '',
                nickname: '正在加载...',
                rating: 0,
                ranking: 0
            }
        ]
    );

    const columns = [
        {
            title: '排名',
            dataIndex: 'index',
            key: 'index',
            width: '6%'
        },
        {
            title: '积分',
            dataIndex: 'title',
            key: 'title'
        }
    ]

    // index从1开始++
    let index = 0;
    const data = beanUsers.map((item) => {
        return {
            ...item,
            key: item.id,
            index: ++index,
            title: <IdCard beanUser={item}/>
        }
    })



    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(API_URL + '/users', {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                if (response.data.code === 0) {
                    setBeanUsers(response.data.data)
                } else {
                    setBeanUsers([])
                }
            })
            .catch((error)=>{})
    }, [setBeanUsers]);

    return (
        <Table  dataSource={data} columns={columns}>

        </Table>
    )
}

export default Users