var counter=0;
//properties
const gk={
    week_names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    month_names:["January","February","March","April","May","June","July","August","September","October","November","December"]
};
const replace_txt=["<",">","?",".","&","!",",",":",";"];
const rtr=["&lt;","&gt;","","","","","","",""];
const math_allowed=["1","2","3","4","5","6","7","8","9","0","+","/","*","-","."];//")","(","[","]","{","}"];
const unknown=["I don't know.I am just a chatbot to give basic info related to HD<br>Ask me simple questions."];
const img={
    user:"images/a.gif",
    pfp:"images/pfp.jpg"
};
class Cmd{
    #filter_t(m){
        if(m==0){
            return '00';
        }
        else if(m<10){
            return `0${m}`;
        }
        return m;
    }
    day(){
        let D=new Date();
        return gk.week_names[D.getDay()];
    }
    month(){
        let D=new Date();
        return gk.month_names[D.getMonth()];
    }
    year(){
        let D=new Date();
        return D.getFullYear();
    }
    date(){
        let D=new Date();
        return `Today is ${D.getDate()} ${this.month()} ${D.getFullYear()}`
    }
    time(){
        let D=new Date();
        return `Time right now is: ${D.getHours()}:${this.#filter_t(D.getMinutes())}`;
    }
}
function lp(arr){
    let r="";
    for(let x in arr){
        r+=arr[x]+"<br>";
    }
    return r;
}
function check_for_commands(txt,usr_msg){
    const prefix="!";
    if(txt.startsWith(prefix)){
        txt=txt.replace("!","");
        //commands
        const cmd=new Cmd();
        const commands=["today","month","day","date","week_names","month_names","time","year","same"];
        if(txt==commands[0]){
            return cmd.date();
        }else if(txt==commands[1]){
            return cmd.month();
        }else if(txt==commands[2]){
            return cmd.day();
        }else if(txt==commands[3]){
            return cmd.date();
        }else if(txt==commands[4]){
            return lp(gk.week_names);
        }else if(txt==commands[5]){
            return lp(gk.month_names);
        }else if(txt==commands[6]){
            return cmd.time();
        }else if(txt==commands[7]){
            return cmd.year();
        }else if(txt==commands[8]){
            return usr_msg;
        }
        else{
            return false;
        }
    }else{
        return false;
    }
}
function msg_display(type,txt,img,align="left",name="HD"){
    const parent=document.getElementById("container");
    const elems=["section","section","h1","div","div","div"];
    const names=["msg_box","profile","name","pfp","msg","section"];
    const obj={};
    for(let x in elems){
        obj[names[x]]=document.createElement(elems[x]);
    }
    obj.section.classList.add("msg_section");
    obj["msg"].classList.add("msg");
    obj["name"].innerHTML=name;
    obj["profile"].classList.add("p");
    obj["pfp"].classList.add("pfp");
    obj.pfp.style.backgroundImage=`url('${img}')`;
    obj["profile"].appendChild(obj.pfp);
    obj.profile.appendChild(obj.name);
    obj.msg_box.appendChild(obj.profile);
    obj.msg_box.appendChild(obj.msg);
    obj.section.id=`${type}:${counter}`;
    if(align=="right"){
        obj.msg_box.style.marginLeft="50%";
        obj.msg_box.style.marginRight="10px";
        obj["msg_box"].classList.add("grid");
        obj["msg"].innerText=txt;
        obj["msg"].classList.add("user_msg");
    }else{
        obj["msg"].innerHTML=txt;
        obj["msg"].classList.add("bot_msg");
        obj["msg_box"].classList.add("flex");
    }
    obj.section.appendChild(obj.msg_box);
    parent.appendChild(obj.section);
    parent.scrollTop = parent.scrollHeight;
    counter++;
}
function valid(txt){
    for(let n in txt){
        if(!(math_allowed.includes(txt[n]))){
            return false;
        }
    }
    return true;
}
function alu(txt){
    txt=filter(txt);
    let result=[];
    let r="";
    for(let x in txt){
        if(valid(txt[x])){
            try{
            let m=eval(txt[x]);
            if(m==undefined||isNaN(m)||m==""){return ['',false]}
            else{
                result.push(parseFloat(m));
            }}
            catch(err){
                console.error(err);
                return ['',false];
            }
        }
    }
    if(result.length==0){
        return ['',false];
    }else if(result.length==1){
        return [`${result}`,true]
    }else{
        for(let i in result){
            if(i>=result.length-1){
                r+=result[i];
            }else{
            r+=result[i]+" and ";
            }
        }
        return [r,true];
    }
}
function rand(n=1){
    let random_number=Math.floor(Math.random()*n);
    return random_number;
}
async function json_read(file){
    try{
        let read=await fetch(file);
        read=await read.json();
        return read;
    }catch(err){
        console.error(err);
    }
}
function replace_txts(txt){
    for(let x in replace_txt){
        if(txt.includes(replace_txt[x])){
            txt=txt.replaceAll(replace_txt[x],rtr[x]);
        }
    }
    return txt;
}
function filter(txt,enabled=true){
    txt=txt.toLowerCase();
    txt=replace_txts(txt);
    if(enabled){
        if(txt.includes(" ")){
            txt=txt.split(" ");
            return txt;
        }else{
            return [txt];
        }
    }else{
        return txt;
    }
}
function check_validity(txt,match_arr){
    let ot=txt;
    txt=txt.replace(/(s)$/,"");
    if(match_arr.includes(txt)){
        return true;
    }
    ot=ot.replace(/(es)$/,"");
    if(match_arr.includes(ot)){
        return true;
    }
    return false;
}
function msg_certainity(msg,question_arr,required=[],negative=[],special,match_sen=[],negative_sen=[],quick_resp){
    let percentage;
    let messageCounter=0;
    let msg2=msg;
    msg2=filter(msg2,false);
    if(!(match_sen==0)){
        for(let x in match_sen){
            if(msg2.includes(match_sen[x])){
                messageCounter+=700;
            }
        }
    }
    if(!(negative_sen==0)){
        for(let x in negative_sen){
            if(msg2.includes(negative_sen[x])){
                messageCounter=0;
                break;
            }
        }
    }
    if(!(quick_resp==1)){
        msg=filter(msg);
        for(let x in msg){
            if(question_arr.includes(msg[x])||check_validity(msg[x],question_arr)){
                messageCounter+=1;
            }
        }
        if(!(required.length==0)){
            var bool=false;
            for(let x in msg){
                if(required.includes(msg[x])||check_validity(msg[x],required)){
                    bool=true;
                    messageCounter+=100;
                }
            }
            if(!(bool)){messageCounter=0;}
        }
        if(!(special==1)){
            //negative.push("my","mine","me","his","her","them");
            console.log("ok");
        }
        if(!(negative.length==0)){
            for(let x in msg){
                if(negative.includes(msg[x])||check_validity(msg[x],negative)){
                    messageCounter=0;
                    break;
                }
            }
        }}
        percentage=parseFloat(messageCounter);
        return (percentage);
}
async function get_resp(msg){
    let alu_val=alu(msg);
    if(!(alu_val[1])){
    let data=await json_read("./knowledge_base.json");
    let q=data.questions;
    let q_keys=Object.keys(q);
    let r={
        //name:msg_certainity(msg,q.name["keywords"],q.name["required"]),
    };
    for(let x in q_keys){
        r[q_keys[x]]=msg_certainity(msg,q[q_keys[x]].keywords,q[q_keys[x]].required,q[q_keys[x]].negative,q[q_keys[x]].special,q[q_keys[x]].match_sen,q[q_keys[x]].negative_sen,q[q_keys[x]].quick_resp);
    }
    //alert(lp(r));
    console.log(r);
    let values=Object.values(r);
    //get max
    let max=Math.max(...values);
    if(max!=0){
        let answer_key=Object.keys(r).find(key => r[key] === max);
        let ans=data.response[answer_key];
        let index=rand(ans.length);
        let response_txt=  data.response[answer_key][index];
        let cfc=check_for_commands(response_txt,filter(msg,false));
        if(cfc!=false){
            return cfc;
        }else{
            return response_txt;
        }
    }else{
        return unknown[rand(unknown.length)];
    }}else{
        return `The answer is ${alu_val[0]}`;
    }
}
async function respond(val){
    let txt=await get_resp(val);
    msg_display("respond",txt,img.pfp);
}
async function sent(){
    let e=document.getElementById("msg_val");
    if(!(e.value=="")){
        msg_display("msg",e.value,img.user,'right','You');
        setTimeout(()=>{respond(e.value);
            e.value="";
        },500);
    }else{
        alert("Please type a message!");
    }
}
