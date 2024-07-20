import {Button, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config";
import {BeanContest} from "../bean/BeanContest";
import {useNavigate} from "react-router-dom";

export default function Contests() {

    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState<BeanContest[]>([
        // {
        //     id: 1,
        //     title: '正在加载...'
        // }
    ])

    //把每个数据项都组装成一个按钮
    const data = dataSource.map((item) => {
        return {
            ...item,
            key: item.id,
            title: <Button onClick={() => {
                navigate('/contest/' + item.id)
            }}  type={'text'} size='large' block={true}>{item.title}</Button>
        }
    })


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '4%'
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }
    ]

    useEffect(() => {
        axios.get(API_URL + '/contests', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.code === 0) {
                    setDataSource(response.data.data)
                } else {
                    alert(response.data.msg);
                    navigate('/users');
                }
            })
            .catch((error) => {
                alert(error);
                navigate('/users');
            })
    }, [setDataSource,navigate]);

    // 使用antd实现一列按钮，每个按钮都对应contest/:id
    return (
        <div>

            <Table dataSource={data} columns={columns}>
            </Table>


        </div>
    )
}