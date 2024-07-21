import React, {useState} from 'react';
import {Button, Input, Modal} from 'antd';
import axios from "axios";
import {API_URL} from "../../config";
// import {useParams} from "react-router-dom";

export default function SubCodeModal({problemID}: { problemID: number }) {
    //获取父组件参数


    const [open, setOpen] = useState(false);
    const [code, setCode] = useState(''); // 新增的状态用于存储文本区域的值

    const {TextArea} = Input;
    const [loading, setLoading] = useState(false);

    const [disabled, setDisabled] = useState(false)

    function submitCode() {
        setLoading(true);
        setDisabled(true);
        //获取 <TextArea name="code" rows={20}/>
        // console.log(code)


        if (code === '') {
            alert('请输入代码')
            setLoading(false);
            return
        }
        const postData = {
            code: code,
            userid: localStorage.getItem('userid'),
            problemid: problemID + ""
        }
        // console.log(postData)
        axios.post(API_URL + '/submit', postData, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.code === 0) {
                    setCode(response.data.data);
                    alert(response.data.data);
                } else {
                    alert(response.data.msg);
                }
            })
            .catch((error) => {
                alert(error)
            })
    }


    return (
        <>
            <Button onClick={() => {
                setOpen(true)
            }
            } type={'primary'} danger={false}  block={false}>提交代码</Button>
            <Modal open={open} title="提交"
                   onCancel={() => {
                       setLoading(false)
                       setOpen(false)
                       setDisabled(false)
                       setCode("")
                   }}
                   footer={[
                       <Button onClick={submitCode} type={'primary'} block={false} loading={loading}>提交</Button>
                   ]}
            >
                <>
                    <TextArea name="code" rows={20} value={code}
                              disabled={disabled}
                              onChange={(e) => {
                                  setCode(e.target.value)
                              }}
                    />
                </>

            </Modal>
        </>

    );
};
