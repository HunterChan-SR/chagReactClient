//type Submit struct {
// 	Id        int    `json:"id"`
// 	Userid    int    `json:"userid"`
// 	Problemid int    `json:"problemid"`
// 	State     string `json:"state"`
// 	Dfbyid    string `json:"dfbyid"`
// }

export type BeanSubmit = {
    id: number,
    userid: number,
    problemid: number,
    state: string,
    dfbyid: string,
}