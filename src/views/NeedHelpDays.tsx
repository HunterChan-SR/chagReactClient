import {Button, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {BeanNeedhelpdays} from "../bean/BeanNeedhelpdays";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config";

export default function NeedHelpDays() {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState<BeanNeedhelpdays[]>([])

    const data = dataSource.map((item) => {
        return {
            ...item,
            key: item.id,
            day: <Button onClick={() => {
                navigate('/needhelp/' + item.id)
            }} type={'text'} size='large' block={true}> day {item.id} </Button>
        }
    })

    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day'
        }
    ]
    useEffect(() => {
        axios.get(API_URL + '/needhelps', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(
            (response) => {
                if (response.data.code === 0) {
                    setDataSource(response.data.data)
                } else {
                    alert(response.data.msg);
                    navigate('/users');
                }
            }
        )
            .catch(
                (error) => {
                    alert(error);
                    navigate('/users');
                }
            )
    }, [navigate,setDataSource]);

    return (
        <div>
            <Table dataSource={data} columns={columns}>
            </Table>
        </div>
    )
}