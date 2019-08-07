if (navigator.geolocation) {
    //Geolocation APIが利用できる場合
    //現在位置を取得する
    navigator.geolocation.getCurrentPosition(

        //getCurrentPositionの第１引数
        function successFunc(position) {
            // mobile backendアプリとの連携
            var ncmb = new NCMB("3bfa8718ce052e1ca1f992e74e255e22e27e176e9b709358b0bb46500ec2d90a", "81d6c842a24bbe4af6a517da7d4c9864e52ef50c3fb2722d1b51b332f32f67e2");
            // クラスのTestClassを作成
            var gpsLogClass = ncmb.DataStore("gpsLog");

            // データストアへの登録
            var gpsLogClass = new gpsLogClass();
            gpsLogClass.set("Lat", position.coords.latitude);
            gpsLogClass.set("Lng", position.coords.longitude);
            gpsLogClass.save()
                .then(function() {
                    // 保存に成功した場合の処理
                    // alert("sending")
                    var sending=document.getElementsByIdName('sending');
                    sending.innerHTML+="sending";
                })
                .catch(function(err) {
                    // 保存に失敗した場合の処理
                    // alert("error")
                });
        },

        //getCurrentPositionの第２引数
        function errorFunc(error) {
            var errorInfo = [
                "0: UNKNOWN_ERROR 原因不明のエラーが発生しました",
                "1: PERMISSION_DENIED 利用者が位置情報の取得を許可されませんでした",
                "2: POSITION_UNAVAILABLE 電波状況などで位置情報が取得できませんでした",
                "3: TIMEOUT 位置情報の取得に時間がかかり取得できませんでした"
            ];

            var errorMessage = error.code;

            alert(errorMessage);

        },

        {
            //getCurrentPositionの第３引数
            "enableHighAccuracy": true,
            "timeout": 8000,
            "maximumAge": 2000,
        }
    );


} else {
    //Geolocation APIが利用できない場合
    alert("現在利用している端末では、位置情報を取得できません。")
}

//setTimeout("location.reload()",5000);
