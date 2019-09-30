//-------csv load
// function getCSV() {
//   var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
//   req.open("get", "data/taisai_static_place_data.csv", true); // アクセスするファイルを指定
//   req.send(null); // HTTPリクエストの発行
//
//   var csv=[];
//
//   // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
//   req.onload = function() {
//     csv=convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
//   }
//   // console.log("getCSV-"+csv[1][1]);
//   // return csv;
// }
//
// // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
// function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
//   var result = []; // 最終的な二次元配列を入れるための配列
//   var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
//
//   // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
//   for (var i = 0; i < tmp.length; ++i) {
//     result[i] = tmp[i].split(',');
//   }
//   alert("convertCSVtoArray-"+result[1][1]);
//   // return result;
// }
// getCSV();
//--------------------

var map;
var marker = [];
var infoWindow = [];
var markerData = [];
// markerData=getCSV(); //最初に実行される

// console.log(markerDate[1][1]);

function initMap() {
  // Geolocation APIに対応している
  if (navigator.geolocation) {
    console.log("...markerDareBefore");
    // markerData=function(){
    fetch('https://shimada-city-sample.appspot.com/api/pos/',{
    mode: 'cors'
})
      var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open("get", "https://shimada-city-sample.appspot.com/api/pos/", true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
    	console.log("req");

    req.onload = function(){
    	console.log(req);
    };
    // };

    console.log("この端末では位置情報が取得できます");
    getPosition();
    // Geolocation APIに対応していない
  } else {
    console.log("この端末では位置情報が取得できません");
  }

  // 現在地取得処理
  function getPosition() {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      function(position) {

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
          center: latlng, // 地図の中心を指定
          zoom: 19 // 地図のズームを指定
        });
        // マーカーの新規出力
        new google.maps.Marker({
          map: map,
          position: latlng,
        });

        for (var i = 0; i < markerData.length; i++) {
          markerLatLng = new google.maps.LatLng({
            lat: markerData[i][16],
            lng: markerData[i][17]
          }); // 緯度経度のデータ作成
          marker[i] = new google.maps.Marker({ // マーカーの追加
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
          });

          infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div class="sample">' + markerData[i][0] + '</div>' // 吹き出しに表示する内容
          });

          markerEvent(i); // マーカーにクリックイベントを追加
        }

        console.log("緯度:" + position.coords.latitude + ",経度" + position.coords.longitude);

      },
      // 取得失敗した場合
      function(error) {
        switch (error.code) {
          case 1: //PERMISSION_DENIED
            console.log("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            console.log("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            console.log("タイムアウトになりました");
            break;
          default:
            console.log("その他のエラー(エラーコード:" + error.code + ")");
            break;
        }
      }
    );
  }
}
