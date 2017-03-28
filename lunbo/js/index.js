/**
 * Created by zbh on 2017/3/8.
 */

var arrLeft = document.querySelector('.arrow_left');
var arrRight = document.querySelector('.arrow_right');
var carousel = function () {
    var images = document.querySelector('.images');
    var img = document.querySelectorAll('.images img');
    var dots = document.querySelectorAll('.dots li');

    var imageWidth = img[0].offsetWidth;
    var imagesLeft = images.offsetLeft;
    var totalWidth = imageWidth * (img.length - 1) * (-1);
    var j = 0;
    var timer;


    function animate(images,laterLeft) {
        var times = 20,                           //一次动画要分20次完成
            animateTimes = 600,                   //一次动画切换所要花的时间
            intervalTimes = animateTimes / times,   //一次动画要分20次完成，每次耗时即循环时间
            newImagesLeft = images.offsetLeft,
            speed = (laterLeft -newImagesLeft ) / 20,// newImagesLeft是移动前的left值，laterLeft是移动后的left值
            i = 0,
            t= setInterval(function () {
            newImagesLeft += speed;
            images.style.left = newImagesLeft + 'px';
            i++;
            if (i == times) {
                clearInterval(t);
            }
        }, intervalTimes)
    }

    function nextImg() {
        dots[j].className='unselected';
        // console.log('imagesLeft'+imagesLeft);
        // console.log('totalWidth'+totalWidth);
        if (imagesLeft <= totalWidth) {
            images.style.left = 0 + 'px';
            imagesLeft = 0 ;
            j = 1;
            // console.log('inner');
        } else {
            j++;
            if (j == 4) {
                j = 0;
            }
            // console.log('other');
        }
        imagesLeft -= imageWidth;
        animate(images,imagesLeft);
        dots[j].className='selected';
    }

    function lastImg() {
        dots[j].className='unselected';
        if (imagesLeft >=0) {
            images.style.left = totalWidth + 'px';
            imagesLeft = totalWidth;
            j = 3;
        } else {
            j--;
            if (j == -1) {
                j = 3;
            }
        }
        imagesLeft += imageWidth;
        animate(images,imagesLeft);
        dots[j].className='selected';
    }

    function autoStart() {
        timer=setInterval(nextImg,2500);
    }
    function stop() {
        clearInterval(timer);
    }
    function dotsClick(event) {
        var e=event||window.event;
        var target=e.target||e.srcElement;
        var num;
        num=parseInt(target.getAttribute('data-num'));
        imagesLeft=num*imageWidth*(-1);
        animate(images,imagesLeft);
        for(var i=0;i<dots.length;i++){
            dots[i].className='unselected';
        }
        target.className='selected';
        j=num;

    }
    return {
        nextimg:nextImg,
        lastimg:lastImg,
        autostart:autoStart,
        stops:stop,
        dotsclick:dotsClick
    }

}();

window.onload = function () {
    carousel.autostart();
}
document.querySelector('#carousel').addEventListener('mouseover',carousel.stops,false);
document.querySelector('#carousel').addEventListener('mouseout',carousel.autostart,false);
document.querySelector('.dots').addEventListener('click',carousel.dotsclick,false);
arrRight.addEventListener('click',carousel.nextimg,false);
arrLeft.addEventListener('click',carousel.lastimg,false);