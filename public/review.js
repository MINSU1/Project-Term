var width = window.matchMedia("(max-width: 450px)"),
    width2 = window.matchMedia("(max-width: 607px)"),
    width3 = window.matchMedia("(max-width:322px)"),
    subBut = document.getElementById('reviewSub'),
    toRev = document.getElementById('toRevBut'),
    revInfo = document.getElementById('review_info'),
    radioDiv = document.getElementById('radio'),
    radTextList = document.getElementsByClassName('radText');

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
    
document.getElementById("logo").addEventListener("click",()=>{
	window.location = "/";
});