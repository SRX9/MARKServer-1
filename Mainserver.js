var express = require('express');
var bodyparser = require('body-parser');
var cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyparser.json());
const port=process.env.PORT||3000;
var q=[];
var q1='';
var q2='';
var user1="Raj";
var user2="Rinku";
app.post('/sendmsg', (req, res) => {
    if(req.body.user===user1)
    {
        q1=req.body.msg;
        res.send("send successfully");
        q.push("Time=>"+String(new Date())+"====>Send successfull by "+user1+" to "+user2+" => "+req.body.msg);
        //console.log(" message :=>" + req.body.msg);
    }
    if(req.body.user===user2)
    {
        q2=req.body.msg;
        res.send("send successfully");
        q.push("Time=>" + String(new Date()) + "====>Send successfull by " + user2 + " to " + user1 + " => " + req.body.msg);
        //console.log(" message :=>" + req.body.msg);
    }
    }, (e) => {
        //console.log("Sorry problem sending message "+e)
        q.push("Time=>" + String(new Date()) +" ====>Sorry problem sending message from post");
    });
app.get('/checkforuser',(req,res)=>{
    if(user1===req.query.user || user2===req.query.user)
    {
        res.send({ispresent:true});
    }
    else{
        res.send({ispresent:false});
    }
});
app.get('/getmsg', (req, res) => {

        if(req.query.user===user1)
        {
            if(q2==='')
            {
                res.send([]);
                return;
            }
            else
            {
                res.send([{msg: q2, user: user2}]);
                q2='';
                q.push("Time=>" + String(new Date()) + " ====>Message"+q2+" Recieved By" + user1);
                //console.log("Messages are send to user1");
            } 
        }
    if (req.query.user === user2) {
        if (q1 === '') {
            res.send([]);
            return;
        }
        else {
            res.send([{msg:q1,user:user1}]);
            q1='';
            q.push("Time=>" + String(new Date()) + " ====>Message" + q1 + " Recieved By " + user2);
            //console.log("Messages are send to user2");
        }
    }
}, (e) => {
    //console.log("Sorry problem sending message " + e)
    q.push("Time=>" + String(new Date()) +"===>Sorry problem sending message from get")
});

app.get('/serverinfo',(req,res)=>{
    res.send(q);
    q=[];
},(e)=>{
    console.log("Problem Connecting"+e);
});

app.listen(port,()=>{
    q.push("Time=>" + String(new Date()) +"===>Server is Live Since then...")
    console.log("Server is Live ...");
})
