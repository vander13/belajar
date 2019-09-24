function bindEvent(p) {

    p.on('signal', function (data) {
        debugger
    })

}

$('#mulai').click(function () {
    var constraints = {
        audio: true,
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {

        var p = new SimplePeer({
            initiator: true,
            stream: stream,
            tricle:false
        })

        var video = document.querySelector('#receiver-video');
        video.volume = 0;
        var url = video.srcObject = stream;
        video.play();


    }).catch(function (err) {
        console.log('Error in getting stream', err);
    });

});

$('#gabung').click(function (e) { 
    e.preventDefault();
    var p = new SimplePeer({
        initiator: false,
        tricle: false

    })
    var constraints = {
        audio: true,
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {

        var p = new SimplePeer({
            initiator: true,
            stream: stream,
            tricle:false
        })

        var video = document.querySelector('#join-video');
        video.volume = 0;
        var url = video.srcObject = stream;
        video.play();


    }).catch(function (err) {
        console.log('Error in getting stream', err);
    });
});