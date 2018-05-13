var commentArr = JSON.parse(document.getElementById('review_data').innerHTML);

//logo links back to home
document.getElementById("logo").addEventListener("click",()=>{
    window.location = "/";
});

function createComments(i){
    newCont = document.createElement('div');
    newName = document.createElement('div');
    newRating = document.createElement('div');
    newDate = document.createElement('div');
    newFeedback = document.createElement('div');
    newCont.className = 'commentDiv';
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    newCont.style.backgroundColor = 'rgba('+ red + ',' + green + ',' + blue + ', 0.5)';
    newName.className = 'userName';
    newRating.className = 'rating';
    newDate.className = 'date';
    newFeedback.className = 'feedback';
    newName.innerHTML = commentArr[i].name;
    for (var m = 0; m < commentArr[i].rating; m++){
        newStar = document.createElement('span');
        newStar.className = 'fa fa-star checked';
        newRating.appendChild(newStar);
    }
    newDate.innerHTML = commentArr[i].date.slice(0,4) + '/' + commentArr[i].date.slice(4,6) + '/' + commentArr[i].date.slice(6,8);
    newFeedback.innerHTML = commentArr[i].comment;
    newCont.appendChild(newName);
    newCont.appendChild(newRating);
    newCont.appendChild(newDate);
    newCont.appendChild(newFeedback);
    document.getElementById('cmtDisplay').appendChild(newCont);
};

for (var i = 0; i < commentArr.length; i++){
    createComments(i)
};