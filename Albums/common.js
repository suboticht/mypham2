let albums = [
    {
        id: 1,
        name: 'Vũ',
        artist:'Album 01',
        image: './images/bg-vu.jpg',
        songs: [
            {
                name:'Lạ Lùng',
                path:'./music/lalung.mp3',
                image:'./images/vu.jpg'
            },
            {
                name:'Bước qua nhau',
                path:'./music/buocquanhau.mp3',
                image:'./images/vu.jpg'
            },
            {
                name:'Happy for you',
                path:'./music/happyforyou.mp3',
                image:'./images/vu.jpg'
            },
        ]
    },
    {
        id: 2,
        name: 'Anh Tú',
        artist:'Album 02',
        image: './images/bg-anhtu.jpg',
        songs: [
            {
                name:'Ngày mai người ta lấy chồng',
                path:'./music/ngaymainguoitalaychong.mp3',
                image: './images/anhtu.png',
            },
            {
                name:'Rời bỏ',
                path:'./music/roibo.mp3',
                image: './images/anhtu.png',
            },
            {
                name:'Khóa biệt ly',
                path:'./music/khoabietly.mp3',
                image: './images/anhtu.png',
            },
        ]
    },
    {
        id: 3,
        name: 'Hòa Minzy',
        artist:'Album 03',
        image: './images/bg-hoaminzy.jpg',
        songs: [
            {
                name:'Thị Mầu',
                path:'./music/thimau.mp3',
                image:'./images/hoaminzy.jpg'
            },
            {
                name:'Cơn gió lạ',
                path:'./music/congiola.mp3',
                image:'./images/hoaminzy.jpg'
            },
            {
                name:'Kén cá chọn canh',
                path:'./music/kencachoncanh.mp3',
                image:'./images/hoaminzy.jpg'
            },
        ]
    },
]
let current=0;
const getParam = function(){
    var queryString = window.location.search;
    var queryObject = new Object();
    if(queryString){
      queryString = queryString.substring(1);
      var parameters = queryString.split('&');
    
      for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');
    
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        queryObject[paramName] = paramValue;
      }
    }
    return queryObject;
}
let albumID = getParam().id;
$.each(albums, function( index, album ) {
    $('.albums').append(
        `<div class="album">
                <a href="./songs.html?id=${index}">
                    <img src="${album.image}" alt="">
                    <p>${album.name}</p>
                </a>
            </div>`
    );
})
if(albumID) {
    let songs = albums[albumID].songs;
    $.each(songs, function( index, song ) {
        $('.list-song').append(`<p class='song' data-id='${index}'><span>${index+1}. </span>${song.name}</p>`);
    })
    $(document).on('click','.song',function(){
        let id = $(this).attr('data-id');
        setSong(id);
        playMusic();
    });

    $('.btn-play').click(function(){
        if($('.btn-play').hasClass('pause')){
            $('#audio')[0].play();
        }else{
            $('#audio')[0].pause();
        }
        $('.btn-play').toggleClass('pause');
        $('.box-disk').toggleClass('play');
    });

    const setSong=(i)=>{
        $('.time-bar').val(0);
        let song=songs[i];
        current=i;
        $('#audio')[0].src=song.path;
        $('.name').html(`${song.name} - ${albums[albumID].name}`);
        $('.artist').html(albums[albumID].artist);
        $('.box-disk').css('background-image', 'url("' + song.image + '")');

        $('.current-time').html('00:00');
        setTimeout(()=>{
            document.querySelector('.time-bar').max=$('#audio')[0].duration;
            $('.music-time').html(formatTimes($('#audio')[0].duration));
        }, 300);
        let id = Number(i)+1;
        $(".song").removeClass('active')
        $(".song:nth-child(" +id+ ")").addClass('active')
    }
    setSong(0);

    const formatTimes=(time)=>{
        let min=Math.floor(time / 60);
        if(min<10){
            min=`0${min}`;
        }
        let sec=Math.floor(time % 60);
        if(sec<10){
            sec=`0${sec}`;
        }
        return `${min}:${sec}`;
    }

    setInterval(() => {
        $('.time-bar').val($('#audio')[0].currentTime);
        $('.current-time').html(formatTimes($('#audio')[0].currentTime));
        if(Math.floor($('#audio')[0].currentTime)==Math.floor(document.querySelector('.time-bar').max)){
            $('.next').click();
        }
    }, 500);

    $('.time-bar').change(function(){
        document.querySelector('#audio').currentTime=$('.time-bar').val();
    });

    const playMusic=()=>{
        $('#audio')[0].play();
        $('.btn-play').removeClass('pause');
        $('.box-disk').addClass('play');
    }

    $('.next').click(function(){
        if(current>=songs.length-1){
            current=0;
        }else{
            current++;
        }
        setSong(current);
        playMusic();
    }); 

    $('.prev').click(function(){
        if(current<=0){
            current=songs.length-1;
        }else{
            current--;
        }
        setSong(current);
        playMusic();
    }); 
}
