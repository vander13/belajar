// FIREBASE CONFIG
var config = {
    apiKey: "AIzaSyCu2jfi-nWS9x6ayqGj713kAdlm6uhDAII",
    authDomain: "tartc-e14b0.firebaseapp.com",
    databaseURL: "https://tartc-e14b0.firebaseio.com",
    projectId: "tartc-e14b0",
    storageBucket: "tartc-e14b0.appspot.com",
    messagingSenderId: "1044827601323"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var refDb = database.ref();
//END

function image() {
    var img = document.createElement("IMG");
    img.src = "/images/img1.gif";
    $('#image').html(img); 
}

    $('#login').click(function () {
    
    var image = document.createElement("IMG");
    image.setAttribute('height', '30px');
    image.setAttribute('width', '30px');
    image.src= '../assets/img/load.gif';
    $('#progress').html(image);
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
            return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (data) {
                location.href = '/'
            });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
});

$('#logout').click(function () {
    alert('aaa');
    firebase.auth().signOut()
    .then(function () {
        location.href = "login.html";
    })
    .catch(function (error) {
        alert('Terjadi Kesalahan')
    });
});

$('#signup').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
        location.href = 'daftar.html';
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
});

//ENCODE IMAGE TO BASE64 
function encodeImageFileAsURL(cb) {
    return function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }
}

var av;
$('#avatar').change(encodeImageFileAsURL(function (base64Img) {
    return av = base64Img;
}));

// END


$('#nextdaftar').click(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid      = user.uid;
            var username = $('#username').val();
            var password = $('#password').val();
            var nama     = $('#nama').val();
            var tgl      = $('#tanggal').val();
            var gender   = $('#gender').val();
            var ref      = database.ref('users');
            var avatar   = document.querySelector('#avatar').files[0];
            var storage  = firebase.storage();
            var title = $('#avatar').val().split('\\').pop();
                title = title.split('.').pop();
                title = 'avatar.'+title;
            var avatar = av.replace(/^data:image\/[a-z]+;base64,/, "");

            var ref = firebase.storage().ref(uid + '/images/' + title);
            // Upload Avatar kedalam firebase.storage
            ref.putString(avatar, 'base64').then(function (snapshot) {

            // Simpan data user kedalam firebase.database
            var dataUser = {
                username: username,
                password: password,
                nama: nama,
                tgl_lahir: tgl,
                gender: gender,
                avatar: title
            };
            var ref = firebase.database().ref('users/' + uid);
            
            ref.set(dataUser, function (error) {
                if (error) {
                    alert("gagal mendaftar");
                } else if(snapshot) {
                    location.href = '/';
                }
            });
            });
            // console.log(dataUser)
        } else {
            location.href = 'login.html'
        }
    });
});

function pushData() {
    firebase.auth()(function (user) {
        if (user) {
            var uid         = user.uid;
            var username    = $('#username').val();
            var nama        = $('#nama').val();
            var tgl         = $('#tanggal').val();
            var gender      = $('#gender').val();
            var avatar      = document.querySelector('#avatar').files[0];
            var storage     = firebase.storage();
            var title       = $('#avatar').val().split('\\').pop();
                title       = title.split('.').pop();
                title       = 'avatar.'+title;
            var avatar      = av.replace(/^data:image\/[a-z]+;base64,/, "");

            var ref = firebase.storage().ref(uid + '/images/' + title);
            // Upload Avatar kedalam firebase.storage
            ref.putString(avatar, 'base64').then(function (snapshot) {});
            // Simpan data user kedalam firebase.database

            var dataUser = {
                username    : username,
                nama        : nama,
                tgl_lahir   : tgl,
                gender      : gender,
                avatar      : title
            };
            
            var ref = firebase.database().ref('users/' + uid);
            
            ref.set(dataUser, function (error) {
                if (error) {
                    alert("Gagal mendaftar");
                } else {
                    alert("Berhasil mendaftar")
                }
            });
        } 
    });
}



