import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MarkDownPage() {
    const [markdownContent, setMarkdownContent] = useState('' +
        '## 你好 \n ### 你好 \n  ```cpp \n #include<iostream> \n int main() \n ```  \n $\na_i\n$ \n');


    return (
        <div>
            <ReactMarkdown
                children={markdownContent}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            />
        </div>
    );
}
