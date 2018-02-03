function saveTextAsFile(fileNameToSaveAs) {
	var textToWrite = document.getElementById("textarea").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs + ".json";
	downloadLink.innerHTML = "Download File";
	if (window.URL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

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
    "dataset":[{"id": "", "text": "", "color": "", "data":[]}]
};

var chart = new Vue({
  el: '#app',
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: {},
    id: "",
    text: undefined,
    color: undefined,
    x: undefined,
    y: undefined,
    z: 10,
    lib: ""
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
          self.lib = "";

          self.dataSource.dataset[0].data.splice(0, 0, {});

          self.$refs.myModalRef.show();
        }
      }
    },
    currentSkill: function () {
      return {"x": this.x, "y": this.y, "z": this.z, "name": this.lib}
    }
  },
  mounted () {
    //prettyPrint();
    this.dataSource = Object.assign({}, myDataSource);
    this.color = "#aabbcc";
  },
  methods: {
    onOpen (evt) {
      $('lib').focus();
    },
		getTAValue() {
			if(this.dataSource.dataset){
				return JSON.stringify(this.dataSource.dataset[0], undefined, 4);
			}
			return "";
		},
		onTAChange() {
			var obj = JSON.parse($('textarea').val());
			this.id = obj.id;
			this.text = obj.text;
			this.color = obj.color;
			this.dataSource.dataset.splice(0, 1, obj);
		},
    saveAs() {
      saveTextAsFile(this.id);
    },
    clear() {
      this.id = "";
      this.text = "";
      this.dataSource.dataset[0].data.splice(0, this.dataSource.dataset[0].data.length);
    }
  },
  watch: {
    currentSkill: function(val) {
      this.dataSource.dataset[0].data.splice(0, 1, val);
    },
    id: function(val) {
      this.dataSource.dataset[0].id = val;
    },
    text: function(val) {
      this.dataSource.dataset[0].text = val;
    },
    color: function(val) {
      this.dataSource.dataset[0].color = val;
    }
  }
});

$('.modal-content').draggable();
