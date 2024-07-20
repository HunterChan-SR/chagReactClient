///contest/:id
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BeanProblem} from "../bean/BeanPromblem";
import {Button, Table} from "antd";
import axios from "axios";
import {API_URL} from "../config";
import SubCodeModal from "./subviews/SubCodeModal";
import SubListModal from "./subviews/SubListModal";

export default function Problems() {
    //获取参数
    const {id} = useParams();
    // console.log("id:", id)
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState<BeanProblem[]>(
        [
            // {
            //     id: 1,
            //     title: '正在加载...',
            //     contestid: 1
            // }
        ]
    )

    const data = dataSource.map((item) => {
        return {
            ...item,
            key: item.id,
            // title: <Button href={'/#/problem/' + item.id} type={'text'} size='large' block={true}>{item.title}</Button>
            // title: <Button size={'large'} block={true} >{item.title}</Button>,
            title: item.title,
            problem: <Button href={API_URL+'/problem/' + item.id+'?token='+localStorage.getItem('token')}
                type={'primary'}  block={false} target={'_blank'} >查看</Button>,
            submitlist:<SubListModal problemID={item.id}></SubListModal>,
            submit:<SubCodeModal problemID={item.id} ></SubCodeModal>,
        }
    })
    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id'
        // },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: '93%',
        },
        {
            title: '查看',
            dataIndex: 'problem',
            key: 'problem'
        },
        {
            title: '提交记录',
            dataIndex: 'submitlist',
            key: 'submitlist'
        },
        {
            title: '提交',
            dataIndex: 'submit',
            key: 'submit'
        }
    ]
    useEffect(() => {
        axios.get(API_URL + '/contest/' + id, {
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
    }, [id, navigate, setDataSource]);

    return (
        <div>
          
            <Table dataSource={data} columns={columns}>
            </Table>
        </div>
    )
}