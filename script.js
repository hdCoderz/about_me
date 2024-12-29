function on_load(){
    /*let anim=sessionStorage.getItem("anim");
    if(!(anim=="1")){
        sessionStorage.setItem("anim","1");
    }else{*/
        setTimeout(()=>{
            let e2=document.getElementById("msgbox");
            const clone=e2.cloneNode(true);
            document.getElementById("container").appendChild(clone);
            e2.remove();
            setTimeout(()=>{
                let e=document.getElementById("picture");
                document.getElementById("profile").classList.remove("profile");
                document.getElementById("msg_bar").style.opacity="1";
                document.getElementById("topbtn").style.opacity="1";
                document.getElementById("container").style.borderBottom="2px solid grey";
                e.classList.remove("pfp_anim");
                e.style.height="50px";
                e.style.width="50px";
                document.getElementById("intial_msg").style.display="block";
                document.getElementById("msgbox").classList.add("grid");
                setTimeout(()=>{document.getElementById("intial_msg").style.opacity="1";},100);
            },10);
        },5000);
//}
}
function cls(id){
    document.getElementById(id).style.opacity="0";
    setTimeout(()=>{document.getElementById(id).style.display="none";},200);
}
function open_dialog(id){
    document.getElementById(id).style.display="block";
    setTimeout(()=>{document.getElementById(id).style.opacity="1"},50);
}
function msg_bar(){
    let e =document.getElementById("s");
    if(e.style.opacity==="0"){
        e.style.opacity="1";
    }else{
        e.style.opacity="0";
    }
}
function menu(){
    let e=document.getElementById("menu");
    if(e.style.display=="inline-block"){
        e.style.width="0%";
        setTimeout(()=>{e.style.display="none";},500);
    }else{
        e.style.display="inline-block";
        setTimeout(()=>{e.style.width="80%";},50);
    }
}
const input=document.getElementById("msg_val");
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  });
  function spotify(){
    window.open("https://open.spotify.com/user/31dog6sd4rg4c2e7zdicytt6mzeq?si=d7331b238bf54171","_blank");
  }