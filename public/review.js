var width = window.matchMedia("(max-width: 450px)"),
    width2 = window.matchMedia("(max-width: 607px)"),
    width3 = window.matchMedia("(max-width:322px)"),
    subBut = document.getElementById('reviewSub'),
    toRev = document.getElementById('toRevBut'),
    revInfo = document.getElementById('review_info'),
    radioDiv = document.getElementById('radio'),
    radTextList = document.getElementsByClassName('radText'),
    isClicked = false

function response(){
    if (width3.matches){
        subBut.style.left = (0.5 * (revInfo.clientWidth - subBut.clientWidth)) + 'px';
    } else {
        subBut.style.left = (revInfo.clientWidth - subBut.clientWidth) + 'px';
    }
}

function alterRate(){
    if (width.matches){
        for(var i = 0; i < radTextList.length; i++){
            radTextList[i].style.width = (radioDiv.clientWidth - 20) + 'px'
        };
    } else if (width2.matches) {
        for(var i = 0; i < radTextList.length; i++){
            radTextList[i].style.width = '14.5%';
        };
    } else {
        for(var i = 0; i < radTextList.length; i++){
            radTextList[i].style.width = '16%';
        };
    }
};

response();
alterRate();

window.onresize = function(){
    response();
    alterRate();
};
function testIfFilled(){
    if (isClicked != false &&
        document.getElementById('name').value != '' &&
        document.getElementById('feedback1').value != '' &&
        document.getElementById('feedback2').value != ''){
        return true
    }
    else{
        return false
    }
    
}
document.getElementById("logo").addEventListener("click",()=>{
	window.location = "/";
});
document.getElementById('awful').addEventListener("click",()=>{
    isClicked = awful
})
document.getElementById('bad').addEventListener("click",()=>{
    isClicked = bad
})
document.getElementById('okay').addEventListener("click",()=>{
    isClicked = okay
})
document.getElementById('good').addEventListener("click",()=>{
    isClicked = good
})
document.getElementById('excellent').addEventListener("click",()=>{
    isClicked = excellent
})
document.getElementById("reviewSub").addEventListener("click",()=>{
    if(testIfFilled()){
        document.getElementById('reviewForm').submit()
    }
    else{
        swal(`Plesae leave a feedback.`, {icon:"info"});
    }
    
})