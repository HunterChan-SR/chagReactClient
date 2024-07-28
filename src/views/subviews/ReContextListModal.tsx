import {Fragment, useEffect, useState} from "react";
import {BeanSubmit} from "../../bean/BeanSubmit";
import axios from "axios";
import {API_URL} from "../../config";
import {Button, Modal, Table, Typography} from "antd";
import {BeanRecontext} from "../../bean/BeanRecontext";

export function ReContextListModal({id}: { id: number }) {
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState(
        []
    );
    const [solved, setSolved] = useState('red');

    const data = dataSource.map((item: BeanRecontext) => {
        return {
            ...item,
            key: item.id,
            recontext: <Typography.Text>{item.recontext.split('\n').map((line, index) =>
                <Fragment key={index}>{line}<br/></Fragment>)}</Typography.Text>

        }
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '解答人',
            dataIndex: 'nickname',
            key: 'nickname'
        },
        {
            title: '解答',
            dataIndex: 'recontext',
            key: 'recontext'
        },
        {
            title: '时间',
            dataIndex: 'createtime',
            key: 'createtime'
        }
    ]

    useEffect(() => {
        axios.get(API_URL + '/recontext/' + id, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        ).then((response) => {
            if (response.data.code === 0) {
                setDataSource(response.data.data)
                if (response.data.cnt > 0) {
                    setSolved('green');
                }

            } else {
                alert(response.data.msg);
            }
        }).catch((error) => {
            alert(error);
        })
    }, [setDataSource, setSolved]);


    return (
        <div>
            <Button type="primary" style={{backgroundColor: solved}} danger={true} block={false} onClick={() => {
                setOpen(true)
            }}>查看解答</Button>
            <Modal
                width={2000}
                title="解答列表"
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