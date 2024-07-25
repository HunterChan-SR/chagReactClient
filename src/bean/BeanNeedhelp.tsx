//type NeedHelp struct {
// 	Id           int    `json:"id"`
// 	Days         int    `json:"days"`
// 	Userid       int    `json:"userid"`
// 	Problemtitle string `json:"problemtitle"`
// 	Subcode      string `json:"subcode"`
// 	Context      string `json:"context"`
// 	Recontext    string `json:"recontext"`
// 	Createtime   string `json:"createtime"`
// }
export type BeanNeedhelp = {
	id: number;
	days: number;
	userid: number;
	problemtitle: string;
	subcode: string;
	context: string;
	recontext: string;
	createtime: string;
}
//          "id": 2,
//             "days": 1,
//             "nickname": "老师",
//             "problemtitle": "A01",
//             "subcode": "#include<>\nint main()\n{}.  ",
//             "context": "为什么****",
//             "recontext": "因为你笨",
//             "createtime": "2024-07-25T17:38:35Z"
export type BeanNeedhelpView = {
	id: number;
	days: number;
	nickname: string;
	problemtitle: string;
	subcode: string;
	context: string;
	recontext: string;
	createtime: string;
}