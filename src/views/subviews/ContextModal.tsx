import {Button, Input, Modal} from "antd";
import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "../../config";

export default function ContextModal({days}: { days: string }) {
    const [open, setOpen] = useState(false);
    const [problemtitle, setProblemtitle] = useState('');
    const [subcode, setSubcode] = useState('');
    const [context, setContext] = useState('');

    const {TextArea} = Input;
    const [loading, setLoading] = useState(false);

    const [disabled, setDisabled] = useState(false)

    function subContext() {
        setLoading(true);
        setDisabled(true);
        if (problemtitle === '' || subcode === '' || context === '') {
            alert('请输入问题')
            setLoading(false);
            return
        }
        console.log(days)
        const postData = {
            days: parseInt(days),
            userid: parseInt(localStorage.getItem('userid') as string),
            problemtitle: problemtitle,
            subcode: subcode,
            context: context
        }
        axios.post(API_URL + '/needhelp/context', postData, {
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
            <Button type={'primary'} danger={false} block={false}
                    style={{background: "red"}}
                    onClick={() => {
                        setOpen(true)
                    }}>
                提问
            </Button>
            <Modal open={open} title="提交问题"
                   onCancel={() => {
                       setLoading(false)
                       setOpen(false)
                       setDisabled(false)
                       setSubcode("")
                       setContext("")
                       setProblemtitle("")
                   }}
                   footer={[
                       <Button onClick={subContext} type={'primary'} block={false} loading={loading}>提交</Button>
                   ]}
            >
                <>
                    <p>问题标题</p>
                    <TextArea name="problemtitle" rows={1} value={problemtitle}
                              disabled={disabled}
                              onChange={(e) => {
                                  setProblemtitle(e.target.value)
                              }}
                    >
                    </TextArea>
                </>
                <>
                    <p>错误代码</p>
                    <TextArea name="subcode" rows={20} value={subcode}
                              disabled={disabled}
                              onChange={(e) => {
                                  setSubcode(e.target.value)
                              }}
                    />
                </>
                <>
                    <p>问题描述</p>
                    <TextArea name="context" rows={20} value={context}
                              disabled={disabled}
                              onChange={(e) => {
                                  setContext(e.target.value)
                              }}
                    />
                </>

            </Modal>
        </div>
    )
}