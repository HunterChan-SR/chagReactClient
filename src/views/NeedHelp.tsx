import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, Table, Typography} from "antd";
import {Fragment, useEffect, useState} from "react";
import {BeanNeedhelpView} from "../bean/BeanNeedhelp";
import axios from "axios";
import {API_URL} from "../config";
import ReContextModal from "./subviews/ReContextModal";
import ContextModal from "./subviews/ContextModal";
import {ReContextListModal} from "./subviews/ReContextListModal";

export default function NeedHelp() {
    const navigate = useNavigate()
    const {TextArea} = Input;
    const {id} = useParams()
    const [dataSource, setDataSource] =
        useState<BeanNeedhelpView[]>()
    const columns = [
        {
            title: '提问者',
            dataIndex: 'nickname',
            key: 'nickname'
        },
        {
            title: '问题标题',
            dataIndex: 'problemtitle',
            key: 'problemtitle'
        },
        {
            title: '提交代码',
            dataIndex: 'subcode',
            key: 'subcode'
        },
        {
            title: '问题描述',
            dataIndex: 'context',
            key: 'context'
        },
        {
            title: '创建日期',
            dataIndex: 'createtime',
            key: 'createtime'
        },
        {
            title: '查看解答',
            dataIndex: 'actionList',
            key: 'actionList'
        },
        {
            title: '我要解答',
            dataIndex: 'action',
            key: 'action'
        }
    ]


    const data = dataSource?.map((item) => {

        return {
            ...item,
            key: item.id,
            problemtitle: <Typography.Text copyable={false}>{item.problemtitle.split('\n').map((line, index) =>
                <Fragment key={index}>{line}<br/></Fragment>)}</Typography.Text>,
            subcode: <Typography.Text copyable={false}>{
                item.subcode.split('\n').map((line, index) =>
                    <Fragment key={index}>{line}<br/></Fragment>)
            } </Typography.Text>,
            //subcode: <TextArea name="code" rows={50} value={item.subcode} disabled={true}/>,
            context: <Typography.Text>{item.context.split('\n').map((line, index) =>
                <Fragment key={index}>{line}<br/></Fragment>)}</Typography.Text>,
           // recontext: <Typography.Text>{item.recontext.split('\n').map((line, index) =>
            //    <Fragment key={index}>{line}<br/></Fragment>)}</Typography.Text>,
            actionList:<ReContextListModal id={item.id} />,
            action: <ReContextModal id={item.id}/>

        }
    })


    useEffect(() => {
        axios.get(API_URL + '/needhelp/' + id, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(
            (response) => {
                if (response.data.code === 0) {
                    setDataSource(response.data.data)
                } else {
                    alert(response.data.msg);
                    navigate('/users')
                }
            }
        )
            .catch(
                (error) => {
                    alert(error);
                    navigate('/users')
                }
            )
    }, [id, navigate, setDataSource]);


    return (
        <div>
            <ContextModal days={id + ""}/>
            <Table dataSource={data} columns={columns}>
            </Table>
        </div>
    )
}