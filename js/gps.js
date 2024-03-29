if (navigator.geolocation) {
  // mobile backendアプリとの連携
  var ncmb = new NCMB("3bfa8718ce052e1ca1f992e74e255e22e27e176e9b709358b0bb46500ec2d90a", "81d6c842a24bbe4af6a517da7d4c9864e52ef50c3fb2722d1b51b332f32f67e2");
  // クラスのTestClassを作成
  var gpsLogClass = ncmb.DataStore("gpsLog");
  // データストアへの登録
  var gpsLogClass = new gpsLogClass();

  //サーバーアップロードの時間を記録
  var updateTime = new Date();
  //５分以上経っていてかつ１度も更新していないかをチェックするための変数
  // var tryFlg=0;

  document.getElementById('geolocation_data').innerHTML = "現在位置　取得中…";
  //Geolocation APIが利用できる場合
  //現在位置を取得する
  navigator.geolocation.watchPosition(
    //getCurrentPositionの第１引数
    function successFunc(position) {
      //位置情報をindex.htmlに表示
      var geo_text = "緯度:" + position.coords.latitude + "<br/>";
      geo_text += "経度:" + position.coords.longitude + "<br/>";
      geo_text += "高度:" + position.coords.altitude + "<br/>";
      geo_text += "位置精度:" + position.coords.accuracy + "<br/>";
      geo_text += "高度精度:" + position.coords.altitudeAccuracy + "<br/>";
      geo_text += "移動方向:" + position.coords.heading + "<br/>";
      geo_text += "速度:" + position.coords.speed + "<br/>";

      document.getElementById('geolocation_data').innerHTML = geo_text;

      //時間をチェックし５分以上時間が経っていればデータアップロード
      var checkTime = new Date();
      // checkTime=checkTime-300000;
      checkTime=new Date(checkTime-60000);


      if (checkTime >= updateTime) {
        // if(tryFlg==0){
        gpsLogClass.set("Lat", position.coords.latitude);
        gpsLogClass.set("Lng", position.coords.longitude);
        gpsLogClass.save()
        .then(function(gpsLogClass) {
          gpsLogClass.set("Lat", position.coords.latitude);
          gpsLogClass.set("Lng", position.coords.longitude);
        })
        .then(function(gpsLogClass) {
            // 保存に成功した場合の処理
            var nowTime = new Date();
            updateTime = nowTime;
            document.getElementById('sending').innerHTML = "data_uplode_success_" + updateTime;
            // tryFlg=1;
          })
          .catch(function(err) {
            document.getElementById('sending').innerHTML = "data_uplode_error_" + checkTime;
            // tryFlg=1;
          });
      } else {
        document.getElementById('sending').innerHTML = "data_uplode_to_" + updateTime+"<br/>try_"+checkTime;
        // tryFlg=0;
      }
    // }else {
    //   document.getElementById('sending').innerHTML = "data_uplode_to_" + updateTime+"<br/>try_"+checkTime;
    //   tryFlg=0;
    // }

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

      document.getElementById('geolocation_data').innerHTML = "geolocation_error[ " + errorInfo[error.code] + " ]";

    },

    //getCurrentPositionの第３引数
    {
      "enableHighAccuracy": true,
      "timeout": 3000,
      "maximumAge": 2000,
    });


} else {
  //Geolocation APIが利用できない場合
  document.getElementById('geolocation_data').innerHTML = "現在利用している端末では、位置情報を取得できません。";
}

//setTimeout("location.reload()",5000);
