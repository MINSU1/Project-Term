for (var i = 0; i < document.getElementsByClassName('toRevPage').length; i++){
    document.getElementById(document.getElementsByClassName('toRevPage')[i].id).addEventListener('click', function(){
        document.getElementById('review_header').style.display = 'none';
        document.getElementById('endScreen').style.display = 'none';
        document.getElementById('review_info').style.display = 'none';
        document.getElementById('revPage').style.display = 'block';
    })
};

document.getElementById('backBut').addEventListener('click', function(){
    document.getElementById('revPage').style.display = 'none';
    if (counter == 0){
        document.getElementById('review_header').style.display = 'block';
        document.getElementById('review_info').style.display = 'block';
    } else if (counter == 1){
        document.getElementById('review_header').style.display = 'block';
        document.getElementById('endScreen').style.display = 'block';
    }
});

