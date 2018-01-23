Vue.use(VueFusionCharts);

var myDataSource = {
  "chart": {
        "caption": "Compétences",
        "subcaption": "",
        "xAxisMinValue": "0",
        "xAxisMaxValue": "100",
        "yAxisMinValue": "0",
        "yAxisMaxValue": "100",
        "showYAxisValues": "0",
        "showToolTip": "0",
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "Acquis ->",
        "yAxisName": "Intérêt ->",
        "numDivlines": "0",
        "showValues": "1",
        "drawQuadrant": "1",
        "quadrantLabelTL": "ENTHOUSIASTE",
        "quadrantLabelTR": "FERVENT",
        "quadrantLabelBL": "CURIEUX",
        "quadrantLabelBR": "EXPERIMENTÉ",
        "bubbleScale": "0.5"
    },
    "categories": [{
        "category": [{
            "x": "0"
        }, {
            "x": "100"
        }]
    }],
    "dataset":[{"color": "#00aee4","data":[{"x": "85","y": "90","z": "10","name": "Git"}]}]
};

var defaultColors = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}

var compact = VueColor.Compact

var chart = new Vue({
  el: '#app',
  components: {
    'compact-picker': compact
  },
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: {},
    events: {
      chartClick: function (eventObj, dataObj) {
        // 35 -> 0 ; 980 -> 100
        // (980-35)/100 = 9.45
        console.log((dataObj.chartX - 35) / 9.45);
        // 560 -> 0 ; 40 -> 100
        // (40-560)/100 = -5.2
        console.log((dataObj.chartY - 560) / -5.2);

        //this.$refs.myModalRef.show();
      }   
    },
    dataSet: '',
    colors: defaultColors
  },
  mounted () {
    //prettyPrint();
    this.dataSource = Object.assign({}, myDataSource);
  },
  methods: {  
    updateSkills() {
      this.dataSource.dataset = JSON.parse(this.dataSet);
    }
  }
});


function prettyPrint() {
  var ugly = document.getElementById('myTextArea').value;
  var obj = JSON.parse(ugly);
  var pretty = JSON.stringify(obj, undefined, 4);
  document.getElementById('myTextArea').value = pretty;
}

$('.modal-content').draggable();



