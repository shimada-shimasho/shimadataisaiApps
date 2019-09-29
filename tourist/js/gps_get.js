
// Geolocation APIに対応している
if (navigator.geolocation) {
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
      var map;

      function initMap() {
        map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
          center: { // 地図の中心を指定
            lat: position.coords.latitude, // 緯度
            lng: position.coords.longitude // 経度
          },
          zoom: 19 // 地図のズームを指定
        });
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
}}
