import {Button, Input, Modal} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../config";

export default function ReContextModal({id}: { id: number }) {

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState(''); // 新增的状态用于存储文本区域的值

    const {TextArea} = Input;
    const [loading, setLoading] = useState(false);

    const [disabled, setDisabled] = useState(false)


    const [hiddenButton, setHiddenButton] = useState(false)
    // useEffect(() => {
    //     if (localStorage.getItem('userid') === '1') {
    //         setHiddenButton(false)
    //     }
    // }, []);

    function subReContext() {
        setLoading(true);
        setDisabled(true);
        if (code === '') {
            alert('请输入解答')
            setLoading(false);
            return
        }
        const postData = {
            recontext: code,
            needhelpid: id,
            userid:  parseInt(localStorage.getItem('userid') as string)
        }
        axios.post(API_URL + '/recontext', postData, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.code === 0) {
                    alert(response.data.msg)
                    setOpen(false)
                    setLoading(false)
                    setDisabled(false)
                } else {
                    alert(response.data.msg)
                }
            })
            .catch((error) => {
                alert(error)
            })
    }


    return (
        <div>
            <Button hidden={hiddenButton} type={'primary'} danger={false} block={false}
                    onClick={() => {
                        setOpen(true)
                    }}>
                我要解答
            </Button>
            <Modal open={open} title="提交解答"
                   onCancel={() => {
                       setLoading(false)
                       setOpen(false)
                       setDisabled(false)
                       setCode("")
                   }}
                   footer={[
                       <Button onClick={subReContext} type={'primary'} block={false} loading={loading}>提交</Button>
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


        </div>
    )
}