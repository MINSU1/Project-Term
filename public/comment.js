var commentArr = document.getElementById('review_data').value;
list = commentArr.split(",")

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
    newName.innerHTML = i[0];
    for (var m = 0; m < parseInt(i[2]); m++){
        newStar = document.createElement('span');
        newStar.className = 'fa fa-star checked';
        newRating.appendChild(newStar);
    }
    newDate.innerHTML = `${i[1][1]}\\${i[1][2]}\\${i[1][3]}`
    newFeedback.innerHTML = i[3];
    newCont.appendChild(newName);
    newCont.appendChild(newRating);
    newCont.appendChild(newDate);
    newCont.appendChild(newFeedback);
    document.getElementById('cmtDisplay').appendChild(newCont);
};
x = 0
for (i = 0; i < list.length; i+=6){
     name = list[i+1]
     time = list[i+2].split(' ')
     score = list[i+3]
     comment = list[i+4].replace('^',',')
     sugestion = list[i+5].replace('^',',')
     createComments([name,time,score,comment,sugestion])
};