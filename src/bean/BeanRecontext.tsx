//create table recontext
// (
//     id           int primary key auto_increment,
//     needhelpid   int references needhelp (id),
//     recontext    varchar(2047),
//     createtime   datetime default current_timestamp
// );

export type BeanRecontext = {
    id: number;
    needhelpid: number;
    recontext: string;
    createtime: string;
}