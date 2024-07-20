import {Button, Image} from 'antd';
import React, {useState, useEffect} from 'react';
import ico from '../../images/ico.jpg'
import challenger from '../../images/challenger.png';
import grandmaster from '../../images/grandmaster.png';
import master from '../../images/master.png';
import gold from '../../images/gold.png';
import silver from '../../images/silver.png';
import bronze from '../../images/bronze.png';
import iron from '../../images/iron.png'



function RankImage({ranking, width}: { ranking: number, width: number }) {

    const [src, setSrc] = useState(ico);

    useEffect(() => {
        let newSrc = ico; // 默认值
        switch (ranking) {
            case 1:
                newSrc = challenger;
                break;
            case 2:
                newSrc = grandmaster;
                break;
            case 3:
                newSrc = master;
                break;
            case 4:
                newSrc = gold;
                break;
            case 5:
                newSrc = silver;
                break;
            case 6:
                newSrc = bronze;
                break;
            case 7:
                newSrc = iron;
                break;
            default:
                newSrc = ico;
        }
        setSrc(newSrc);
    }, [ranking]); // 注意这里添加了[ranking]作为依赖数组，确保每次ranking改变时都会重新运行useEffect

    return (
        <Image src={src} width={width}/>
    );
}

export default RankImage;
