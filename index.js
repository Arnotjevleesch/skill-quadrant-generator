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
    "dataset":undefined
};

var chart = new Vue({
  el: '#app',
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: {},
    x: undefined,
    y: undefined,
    lib: undefined,
    colors: undefined,
    myTextArea: undefined
  },
  computed: {     
    events: function () {
      var self = this;
      return {
        chartClick: function (eventObj, dataObj) {
          // 35 -> 0 ; 980 -> 100
          // (980-35)/100 = 9.45
          self.x = Math.round((dataObj.chartX - 35) / 9.45);
          // 560 -> 0 ; 40 -> 100
          // (40-560)/100 = -5.2
          self.y = Math.round((dataObj.chartY - 560) / -5.2);

          self.$refs.myModalRef.show();
        }
      }
    }  
  },
  mounted () {
    //prettyPrint();
    this.dataSource = Object.assign({}, myDataSource);
  },
  methods: {  
    showModal() {
      this.$refs.myModalRef.show();
    }
  },
  watch: {
    'myTextArea': function(val) {
      this.dataSource.dataset = JSON.parse(val);
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



