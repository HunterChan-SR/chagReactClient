import {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {API_URL} from "../config";
import axios from "axios";

export default function SavedFiles() {

    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '文件',
            dataIndex: 'filename',
            key: 'filename'
        }
    ]

    const data = dataSource.map((item: { filename: string }) => {
        return {
            filename: <Button href={API_URL + '/savedfile/' + item.filename+'?token='+localStorage.getItem('token')}
                              type={'primary'}  block={false} target={'_blank'} >
                {item.filename}
            </Button>

        }
    })
    useEffect(() => {
        axios.get(API_URL + '/savedfiles', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(
                (response) => {
                    if (response.data.code === 0) {
                        setDataSource(response.data.data)
                    } else {
                        alert(response.data.msg);
                    }
                }
            )
            .catch(
                (error) => {
                    alert(error);
                }
            )
    }, []);

    return (
        <Table dataSource={data} columns={columns}>

        </Table>
    );
}