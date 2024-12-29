var counter=0;
//properties
const replace_txt=["<",">","hd's"];
const rtr=["&lt;","&gt;","your"];
const math_allowed=["1","2","3","4","5","6","7","8","9","10","+","/","*","-",".",")","(","[","]","{","}"];
const unknown=["I don't know","?","What","I have no idea"];
const img={
    user:"images/a.gif",
    pfp:"images/pfp.jpg"
};
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
    obj["msg"].innerHTML=txt;
    obj["name"].innerHTML=name;
    obj["profile"].classList.add("p");
    obj["msg_box"].classList.add("grid");
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
        if(txt.includes(rtr[x])){
            txt=txt.replaceAll(replace_txt[x],rtr[x]);
        }
    }
    return txt;
}
function filter(txt){
    txt=replace_txts(txt);
    txt=txt.toLowerCase();
    if(txt.includes(" ")){
        txt=txt.split(" ");
        return txt;
    }else{
        return [txt];
    }
}
function msg_certainity(msg,question_arr,required=[]){
    let percentage;
    msg=filter(msg);
    let arr_len=question_arr.length;
    let messageCounter=0;
    for(let x in msg){
        if(question_arr.includes(msg[x])){
            messageCounter+=1;
        }
    }
    
    if(!(required.length==0)){
        let bool=false;
        for(let x in msg){
            if(required.includes(msg[x])){
                bool=true;
                break;
            }
        }
        if(!bool){messageCounter=0;}
    }
    percentage=parseFloat(messageCounter);
    return (percentage*100);
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
        r[q_keys[x]]=msg_certainity(msg,q[q_keys[x]].keywords,q[q_keys[x]].required);
    }
    console.log(r);
    let values=Object.values(r);
    //get max
    let max=Math.max(...values);
    if(max!=0){
        let answer_key=Object.keys(r).find(key => r[key] === max);
        let ans=data.response[answer_key];
        let index=rand(ans.length);
        return  data.response[answer_key][index];
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
