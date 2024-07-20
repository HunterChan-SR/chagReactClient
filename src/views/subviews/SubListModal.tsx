import {Button, Form, Modal, Table} from "antd";
import {useEffect, useState} from "react";
import {BeanSubmit} from "../../bean/BeanSubmit";
import axios from "axios";
import {API_URL} from "../../config";

export default function SubListModal({problemID}: { problemID: number }) {
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState<BeanSubmit[]>(
        []
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state'
        }
    ]

    useEffect(() => {
            axios.get(API_URL + '/submit/' + localStorage.getItem('userid') + '/' + problemID, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.code === 0) {
                        setDataSource(response.data.data)
                    } else {
                        alert(response.data.msg);
                    }
                }).catch((error) => {
                alert(error);
            })
        }, [setDataSource]);


    return (
        <div>
            <Button type="primary" danger={true} block={false} onClick={() => {
                setOpen(true)
            }}>提交列表</Button>
            <Modal
                title="提交列表"
                open={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            >
                <>
                    <Table dataSource={dataSource} columns={columns}>

                    </Table>
                </>
            </Modal>
        </div>
    )
}