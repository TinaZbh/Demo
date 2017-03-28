/**
 * Created by zbh on 2017/3/16.
 */

var indexAction = function () {
    var doc = document;

    var addEvent = function (target, event, fn) {
        if (target.addEventListener) {
            target.addEventListener(event, fn, false);
        } else if (target.attachEvent) {
            target.attachEvent('on' + event, fn);
        } else {
            target['on' + event] = fn();
        }
    };
    var onSuccess = function (stream) {
        var voice = doc.querySelector('.voice');
        var voiceFrame = doc.querySelector('#voice_frame');
        voice.src = window.URL.createObjectURL(stream);
        var underLayer = doc.createElement('div');
        underLayer.id = 'underLayer';
        underLayer.style.position = 'absolute';
        underLayer.style.height = '100%';
        underLayer.style.width = '100%';
        underLayer.style.left = '0';
        underLayer.style.top = '0';
        underLayer.style.zIndex = '998';
        underLayer.style.backgroundColor = 'rgba(0,0,0,0.3)';
        doc.body.appendChild(underLayer);
        voiceFrame.style.display = 'block';
        var close = doc.querySelector('.close');
        addEvent(close, 'click', function () {
            voiceFrame.style.display = 'none';
            underLayer.style.display = 'none';
        });
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext;
        var audioInput = context.creatMediaStreamSource(stream);
        audioInput.connect(context.destination);
    };
    var onError = function (error) {
        console.log('navigator.getUserMedia error: ', error);
    };

    var privateBindSearchFrame = function () {
        var searchFrame = doc.querySelector('.search_frame');
        addEvent(searchFrame, 'mouseover', function () {
            if (doc.activeElement.tagName !== 'INPUT') {
                searchFrame.classList.add('search_hov');
            }
        });
        addEvent(searchFrame, 'mouseout', function () {
            searchFrame.classList.remove('search_hov');
        });
    };

    var privateBindSearchFrameInput = function () {
        var searchFrameInput = doc.querySelector('.search_frame input');
        var searchFrame = doc.querySelector('.search_frame');
        var searchHint = doc.querySelector('.search_hint');
        var timer=null;
        addEvent(searchFrameInput, 'focus', function () {
            searchFrame.classList.remove('search_hov');
            searchFrame.classList.add('search_foc');
            if(searchFrameInput.value!=''){
                searchHint.style.display = 'block';
            }
        });
        // var bFun=function () {
        //     searchFrame.classList.remove('search_hov');
        //     searchFrame.classList.remove('search_foc');
        //     searchHint.style.display = 'none';
        //     console.log(3)
        // }
        // var timer=setTimeout(bFun,150);
        // addEvent(searchFrameInput, 'blur', timer);
        // function blurDelay() {
        //     var searchFrame = doc.querySelector('.search_frame');
        //     var searchHint = doc.querySelector('.search_hint');
        //     var bFun=function () {
        //         searchFrame.classList.remove('search_hov');
        //         searchFrame.classList.remove('search_foc');
        //         searchHint.style.display = 'none';
        //         console.log(3)
        //     }
        //     setTimeout(bFun(),25);
        // }
        addEvent(searchFrameInput, 'input', function () {
            //假设resData是响应回来的数据
            var resData = {
                "code": 200,
                "msg": "success",
                "data": [
                    {
                        "id": 1,
                        "name": "结果1"
                    },
                    {
                        "id": 2,
                        "name": "结果2"
                    },
                    {
                        "id": 3,
                        "name": "结果3"
                    },
                    {
                        "id": 4,
                        "name": "结果4"
                    },
                    {
                        "id": 5,
                        "name": "结果5"
                    },
                    {
                        "id": 6,
                        "name": "结果6"
                    },
                    {
                        "id": 7,
                        "name": "结果7"
                    }
                ]
            };
            var inputValue=searchFrameInput.value;
            var len = resData.data.length;
            var _s=0;
            if (len > 0) {
                var innerStr = "";
                searchHint.style.display = 'block';
                for (var i = 0; i < len; i++) {
                    innerStr += "<li>" + resData.data[i].name + "</li>";
                }
                searchHint.innerHTML = innerStr;
            }
            if (inputValue == ''||len===0) {
                searchHint.style.display = 'none';
            }
            var searchHintLi = doc.querySelectorAll('.search_hint li');
            for(var i=0;i<searchHintLi.length;i++){
                (function (i) {
                    addEvent(searchHintLi[i],'mouseover',function () {

                        searchHintLi[i].style.backgroundColor="#F8F8F8";
                    });
                    addEvent(searchHintLi[i],'mouseout',function () {
                        searchHintLi[i].style.backgroundColor="white";
                    });
                    addEvent(searchHintLi[i],'click',function () {
                        // clearTimeout(timer);
                        searchFrameInput.value=searchHintLi[i].innerHTML;
                    })
                })(i);
            }
            addEvent(searchFrameInput,'keydown',function (event) {
                var e=event||window.event;
                for(var i=0;i<len;i++){
                    (function (i) {
                        searchHintLi[i].style.backgroundColor="white";
                    })(i);
                }
                if(e&&e.keyCode==40){
                    _s++;
                    if(_s>len){
                        _s=_s%(len+1);
                    }
                    if(_s==0){
                        searchHint.scrollTop=0;
                        searchFrameInput.value=inputValue;
                    }else if(_s<5){
                        searchHint.scrollTop=0;
                        searchHintLi[_s-1].style.backgroundColor="#F8F8F8";
                        searchFrameInput.value=searchHintLi[_s-1].innerHTML;
                    }else{
                        // searchHint.scrollTop=25*(_s-4);
                        searchHint.scrollTop+=25;
                        searchHintLi[_s-1].style.backgroundColor="#F8F8F8";
                        searchFrameInput.value=searchHintLi[_s-1].innerHTML;
                    }


                }else if(e&&e.keyCode==38){
                    _s--;
                    if(_s<0){
                        _s=(len+1)+_s%(len+1);
                    }
                    if(_s==0){
                        searchHint.scrollTop=0;
                        searchFrameInput.value=inputValue;
                    }else if(_s<5){
                        searchHint.scrollTop=0;
                        searchHintLi[_s-1].style.backgroundColor="#F8F8F8";
                        searchFrameInput.value=searchHintLi[_s-1].innerHTML;
                    }else{
                        searchHint.scrollTop=25*(_s-4);
                        searchHintLi[_s-1].style.backgroundColor="#F8F8F8";
                        searchFrameInput.value=searchHintLi[_s-1].innerHTML;
                    }

                }

            });
        });
    };
    var privateBindVoice = function () {
        var voice = doc.querySelector('.voice');
        addEvent(voice, 'click', function () {
            if (navigator.getUserMedia) {
                navigator.getUserMedia({audio: true}, onSuccess, onError);
            } else {
                // voice.src='****.mp3';
                alert('您的浏览器不支持navigator.getUserMedia');
            }
        });
    };
    var privateBindCamera = function () {
        var camera = doc.querySelector('.camera');
        addEvent(camera, 'click', function () {
            if (navigator.getUserMedia) {
                navigator.getUserMedia({vedio: true}, onSuccess, onError);
            } else {
                // voice.src='****.mp4';
                alert('您的浏览器不支持navigator.getUserMedia');
            }
        });
    };

    return {
        init: function () {
            privateBindSearchFrame();
            privateBindSearchFrameInput();
            privateBindVoice();
            privateBindCamera();
        }
    }
};

function blurDelay() {
    var searchFrame = document.querySelector('.search_frame');
    var searchHint = document.querySelector('.search_hint');
    var bFun=function () {
        searchFrame.classList.remove('search_hov');
        searchFrame.classList.remove('search_foc');
        searchHint.style.display = 'none';
    }
    setTimeout(bFun,150);
}
(function () {
    var index = indexAction();
    index.init();


})();