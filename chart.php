<?php 
session_start();
include('funcs.php');
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
　<title>グラフ</title> 
</head>
<body>
  <h1>体重推移グラフ</h1>
  <canvas id="myLineChart"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>

  <script　type="text/javascript" src="server.js">
  var ctx = document.getElementById("myLineChart");
  var chart_weight = conection.query('SELECT * from `weights` WHERE user_id = "xxxxxxx" AND date > "2021-01-05";')//表示する体重をchart_weirhtとする
  var max_weight = 'SELECT MAX(weight) AS max_weight FROM `weights` WHERE user_id = "xxxxxxx" AND date > "2021-01-05";' + 10//MAX体重
  var min_weight = 'SELECT MIN(weight) AS max_weight FROM `weights` WHERE user_id = "xxxxxxx" AND date > "2021-01-05";' - 10//MIN体重
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      //labels: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
      labels: [date],//labelは日付
      datasets: [
        {
          label: '体重(kg）',
          //data: [35, 34, 37, 35, 34, 35, 34, 25],
          data: chart_weight,
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(0,0,0,0)"
        },
      ],
    },
    options: {
      title: {
        display: false,//タイトル非表示
        text: '体重'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: max_weight,//max値
            suggestedMin: min_weight,//min値
            stepSize: 1,
            callback: function(value, index, values){//軸のラベル
              return  value +  'kg'
            }
          }
        }]
      },
    }
  });
  </script>
</body>

</html>