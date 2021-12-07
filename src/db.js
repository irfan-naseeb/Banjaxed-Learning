let posts = [
    {
        id : "1",
        title : "lorem ipsum",
        body : "something is here",
        published : false,
        author : '2'
    },
    {
        id : "2",
        title : "lorem ipsum 2",
        body : "something is here 2",
        published : false,
        author : '1'
    },
    {
        id : "3",
        title : "lorem ipsum3",
        body : "something is here3 ",
        published : false,
        author : '1'
    }
]
let users = [{
    id : "1",
    name : "user # 1",
    email : "nafri@banjaxed",
    age : 22
},
{
    id : "2",
    name : "user # 2 ",
    email : "irfan@banjaxed",
    age : 19
}
]
let comments = [
    {
        id : '1',
        text : 'text1', 
        author : '1',
        postID : '1',
    },
    {
        id : '2',
        text : 'text2',
        author : '1',
        postID : '3',
    },
    {
        id : '3', 
        text : 'text3',
        author : '2',
        postID : '2',
    },
    {
        id : '4', 
        text : 'text4',
        author : '2',
        postID : '1',
    }

]


const db = {
    users, 
    posts, 
    comments,
}

export {db as default}