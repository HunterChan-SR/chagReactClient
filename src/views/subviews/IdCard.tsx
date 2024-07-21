import {Button} from "antd";
import React, {useEffect, useState} from "react";
import RankImage from "./RankImage";
import {BeanUser} from "../../bean/BeanUser";


export default function IdCard({beanUser}: { beanUser: BeanUser }) {
    const [rankWord, setRankWord] = useState("狗头")
    const ranking = beanUser.ranking
    //回调函数
    useEffect(() => {
        switch (ranking) {
            case 1:
                // setRankWord("最强王者 Challenger")
                setRankWord(" Challenger")
                break;
            case 2:
                // setRankWord("傲视宗师 GrandMaster")
                setRankWord(" GrandMaster")
                break;
            case 3:
                // setRankWord("超凡大师 Master")
                setRankWord(" Master")

                break;
            case 4:
                // setRankWord("荣耀黄金 gold")
                setRankWord(" gold")

                break;
            case 5:
                // setRankWord("不屈白银 silver")
                setRankWord(" silver")

                break;
            case 6:
                // setRankWord("英勇黄铜 bronze")
                setRankWord(" bronze")

                break;
            case 7:
                // setRankWord("坚韧黑铁 iron")
                setRankWord(" iron")
                break;
            default:
                setRankWord("dog")
                break;
        }
    }, [setRankWord, ranking]);

    return (
        <Button size='large' block={true}>
            {beanUser.nickname}
            <RankImage ranking={beanUser.ranking} width={65}/>
            {rankWord}&nbsp;&nbsp;
            rating:{beanUser.rating}
        </Button>
    )
}