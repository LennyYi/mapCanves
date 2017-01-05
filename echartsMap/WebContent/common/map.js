//定义方法名称供document中的onclick事件调用
;var drawMap;
//块级作用域，这么可以避免定义较多的全局变量
(function(){
var option1;
var chart1;
var echart1;
		require.config({
			packages:[
				{  
				    name: 'zrender',  
				    location: './common/zrender2/src', // zrender与echarts在同一级目录  
				    main: 'zrender'  
				},  
				{  
				    name: 'echarts',  
				    location: './common/echarts-2.2.7/src',  
				    main: 'echarts'  
				}      
			]
		});
		
		// 按需加载(需要用什么图标就引入包，如柱状图：'echarts/chart/bar',)
		require(
			[
			 	'echarts', 
			 	'echarts/config', 
			 	'echarts/chart/bar',
			 	'echarts/chart/pie',
			 	'echarts/chart/map'
			],
			function (ec) {
				chart1=document.getElementById('main');
				echart1 = ec.init(chart1);
				var mapData=[];
				var pieData=[];
				var x;
				var y;
				var pos = [x,y];
				 option1 = {
						backgroundColor: 'rgba(187,203,243,0.5)',
					    tooltip : {
					    	enterable:false,
					    	transitionDuration:10,
					    	position:function(pos) {return [pos[0]+100,pos[1]+100]},
					    	backgroundColor:'rgba(187,203,243,0.5)',
					    	borderWidth:2,
					    	borderColor:'#fff',
					    	showDelay:100,
					    	enterable:false,
					    	transitionDuration:1000,
					        trigger: 'item',
					        borderRadius:10,
					        formatter :function (params, ticket, callback) {
					            $.get(encodeURI('map?country=' + params.name), function (content) {
					            	 callback(ticket, "<div id='chart3' style='border:0px;height:200px;width:400px;background-color:rgba(187,203,243,0.5)'></div>");
					                 chart3=document.getElementById('chart3');
					                 echart3 = ec.init(chart3);
					                 var option3 = {
					            			    legend: {
					            			    	itemGap:40,
					            			    	itemWidth:10,
					            			    	itemHeight:8,
					            			    	selectedMode:false,
					            			    	formatter:function(name){
					            			    		return name;
					            			    	},
					            			        orient : 'horizontal',
					            			        x : 'center',
					            			        y : 'bottom',
					            			        data:[{
					            				                name:'normal',
					            				                textStyle:{
					            				                    fontSize:12,
					            				                    fontWeight:'bolder',
					            				                    color:'#fffff'
					            				                },
					            				                icon:'stack'
					            				            },
					            				            {
					            				                name:'risk',
					            				                textStyle:{
					            				                    fontSize:12,
					            				                    fontWeight:'bolder',
					            				                    color:'#fffff'
					            				                },
					            				                icon:'stack'
					            				            },
					            				            {
					            				                name:'overdue',
					            				                textStyle:{
					            				                    fontSize:12,
					            				                    fontWeight:'bolder',
					            				                    color:'#fffff'
					            				                },
					            				                icon:'stack'
					            				            }]
					            			    },
					            			    calculable : true,
					            			    series : [
					            			        {
					            			            name:'各国财务状况',
					            			            type:'pie',
					            			            radius : ['20%', '40%'],
					            			            itemStyle : {
					            			                normal : {
					            			                    label : {
					            			                    	   show : true,
								            			                position : 'outer',
								            			                formatter: "{b}:{c} ({d}%)",
								            			                textStyle: {
								            			                    baseline : 'bottom'
								            			                },
								            			                textStyle:{
								            			                	color:'#fffff',
								            			                	fontSize:12
								            			                }
					            			                    },
					            			                    labelLine : {
					            			                        show : true
					            			                    }
					            			                },
					            			                emphasis : {
					            			                    label : {
					            			                        show : false,
					            			                        position : 'inner',
					            			                        textStyle : {
					            			                            fontSize : '30',
					            			                            fontWeight : 'bold'
					            			                        }
					            			                    }
					            			                }
					            			            },
					            			            data:content.pieData
					            			        }
					            			    ],
					            			    animation: false,
					            			    color:['green','yellow','red']  
					            			};
					                echart3.setOption(option3);
					            }); 
					            return "";
					        }
					    },
					    dataRange: {
					        x: 'left',
					        y: 'bottom',
					        splitList: [
					            {start:1, end: 1, label: 'normal',color: 'green'},
					            {start: 0, end: 0, label: 'risk', color: 'yellow'},
					            {start: -1, end: -1, label: 'overdue', color: 'red'}
					        ],
					        color:['green','yellow','red']  
					    },
					    series : [
					        {
					            name: '世界地图',
					            type: 'map',
					            mapType: 'world',
					            roam: true,
					            selectedMode : 'single',
					            itemStyle:{
					                normal:{
					                	  borderWidth:2,
					                      borderColor:'white',
					                      //color: 'gray',
					                	label:{
					                		  show:false
					                		},
					                		 labelLine : {
	            			                        show : true
	            			                    }
					        },
					                emphasis:{
					                	label:{show:true}
					                	}
					            },
					            data:mapData
					        }
					    ],
					    animation: false,
					    color:['green','yellow','red'] 
					};
				 option2 = {
						backgroundColor: 'rgba(223,230,249,0.5)',
					    title : {
					        text: 'World Population (2010)',
					        subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
					        x:'center',
					        y:'top'
					    },
					    tooltip : {
					        trigger: 'item',
					        backgroundColor:'rgba(187,203,243,0.5)',
					    	borderWidth:0,
					    	borderColor:'#000',
					    	transitionDuration:0.8,
					    	 formatter :function (params, ticket, callback) {
						            $.get(encodeURI('map?country=' + params.name), function (content) {
						            	 callback(ticket, "<div id='chart3' style='border:0px;height:250px;width:500px;background-color:rgba(187,203,243,0.5)'></div>");
						                 chart3=document.getElementById('chart3');
						                 echart3 = ec.init(chart3);
						                 var option3 = {
						            			    tooltip : {
						            			        trigger: 'item',
						            			        formatter: "{a} <br/>{b} : {c} ({d}%)"
						            			    },
						            			    itemStyle : {
						            			        normal : {
						            			            label : {
						            			                show : true,
						            			                position : 'center',
						            			                formatter: "{a} <br/>{b} : {c} ({d}%)",
						            			                textStyle: {
						            			                    baseline : 'bottom'
						            			                }
						            			            },
						            			            labelLine : {
						            			                show : true
						            			            }
						            			        }
						            			    },
						            			    legend: {
						            			        orient : 'vertical',
						            			        x : 'right',
						            			        data:[{
						            				                name:'normal',
						            				                textStyle:{
						            				                    fontSize:12,
						            				                    fontWeight:'bolder',
						            				                    color:'#fffff'
						            				                },
						            				                icon:'stack'
						            				            },
						            				            {
						            				                name:'risk',
						            				                textStyle:{
						            				                    fontSize:12,
						            				                    fontWeight:'bolder',
						            				                    color:'#fffff'
						            				                },
						            				                icon:'stack'
						            				            },
						            				            {
						            				                name:'overdue',
						            				                textStyle:{
						            				                    fontSize:12,
						            				                    fontWeight:'bolder',
						            				                    color:'#fffff'
						            				                },
						            				                icon:'stack'
						            				            }]
						            			    },
						            			    calculable : true,
						            			    series : [
						            			              {
						            			                  name:'各国财务状况',
						            			                  type:'pie',
						            			                  selectedMode: 'single',
						            			                  radius : [0, 40],
						            			                  
						            			                  itemStyle : {
						            			                      normal : {
						            			                          label : {
						            			                              position : 'inner',
						            			                            	  textStyle:{
						            			                            		  color : 'rgba(0,0,0,0.5)',
						            			                                      align : 'center',
						            			                                      baseline : 'middle',
						            			                                      fontFamily : '微软雅黑',
						            			                                      fontSize : 1,
						            			                                      fontWeight : 'bolder'
											            			                }
						            			                          },
						            			                          labelLine : {
						            			                              show : false
						            			                          }
						            			                      }
						            			                  },
						            			                  data:content.pieData
						            			              },
						            			        {
						            			            name:'各国财务状况',
						            			            type:'pie',
						            			            radius : ['50%', '70%'],
						            			            itemStyle : {
						            			                normal : {
						            			                    label : {
						            			                    	   show : true,
									            			                position : 'outer',
									            			                formatter: "{c} ({d}%)",
									            			                textStyle: {
									            			                    baseline : 'bottom'
									            			                },
									            			                textStyle:{
									            			                	color:'#fffff',
									            			                	fontSize:2
									            			                }
						            			                    },
						            			                    labelLine : {
						            			                        show : true
						            			                    }
						            			                },
						            			                emphasis : {
						            			                    label : {
						            			                        show : true,
						            			                        position : 'inner',
						            			                        textStyle : {
						            			                            fontSize : '30',
						            			                            fontWeight : 'bold'
						            			                        }
						            			                    }
						            			                }
						            			            },
						            			            data:content.pieData
						            			        }
						            			    ],
						            			    animation: false,
						            			    color:['green','yellow','red']  
						            			};
						                echart3.setOption(option3);
						            }); 
						            return "";
						        }
					    },
					    toolbox: {
					        show : true,
					        orient : 'vertical',
					        x: 'right',
					        y: 'center',
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:[{
						                name:'normal',
						                textStyle:{
						                    fontSize:12,
						                    fontWeight:'bolder',
						                    color:'#7CFC00'
						                },
						                icon:'stack'
						            },
						            {
						                name:'risk',
						                textStyle:{
						                    fontSize:12,
						                    fontWeight:'bolder',
						                    color:'#EEEE00'
						                },
						                icon:'stack'
						            },
						            {
						                name:'overdue',
						                textStyle:{
						                    fontSize:12,
						                    fontWeight:'bolder',
						                    color:'#FF0000'
						                },
						                icon:'stack'
						            }]
					    },
					    dataRange: {
					        x: 'left',
					        y: 'bottom',
					        splitList: [
					            {start:1, end: 1, label: 'normal',color: 'green'},
					            {start: 0, end: 0, label: 'risk', color: 'yellow'},
					            {start: -1, end: -1, label: 'overdue', color: 'red'}
					        ],
					        color:['green','yellow','red']  
					    },
					    series : [
					        {
					            name: 'World Population (2010)',
					            type: 'map',
					            mapType: 'world',
					            roam: true,
					            mapLocation: {
					                y : 60
					            },
					            itemStyle:{
					                emphasis:{label:{show:true}}
					            },
					            showLegendSymbol:true,
					            markPoint:{
					            	clickable:true,
					            	symbol:'emptyCircle',
					            	data:mapData
					            },
					            data:mapData
					        },
					        {
					            name:'该国财务概况',
					            type:'pie',
					            roseType : 'area',
					            tooltip: {
					                trigger: 'item',
					                formatter: "{a} <br/>{b} : {c} ({d}%)"
					            },
					            center: [document.getElementById('main').offsetWidth - 1200, 225],
					            radius: [20, 60],
					            data:pieData
					        }
					    ],
					    animation: false,
					    color:['green','yellow','red']  
					};
				
				echart1.setOption(option1);
				 var ecConfig = require('echarts/config');  
				 echart1.on(ecConfig.EVENT.MAP_SELECTED, function (param) {  
				        var selected = param.selected;
		                for (var p in selected) {
		                    if (selected[p]) {//注意判断
		                    	//读取后台URI 需要通过ajax把这个值传入到servlet 或者  专门处理点击跳转的sevice(action)
		                    	 $.ajax({  
		                             url : "/map",//springmvc的controller的请求路径
		                             type : "GET",  
		                             async : true, //同步执行  
		                             data : {"country":p},  //设置过滤参数，或者条件参数
		                             dataType : "json", //返回数据形式为json  
		                             success : function(data) {  
		                                 if (data) {  
		                                    alert(data.url);
		                                   	location.href=data.url;
		                                 }  
		                             },  
		                             error : function(xmlHttpRequest,errorMsg,exceptionObject) {  
		                            	 echart1.hideLoading();  
		                             }  
		                         });  
		                    }
		                }
				       
				    }
				 )  
			}
		);

 drawMap = function(){
	 $.ajax({  
         url : "map",//springmvc的controller的请求路径
         type : "GET",  
         async : true, //同步执行  
         data : {},  //设置过滤参数，或者条件参数
         dataType : "json", //返回数据形式为json  
         success : function(data) {  
             if (data) {  
                 //请求成功将数据设置到相应的位置上
                 option1.series[0].data = data.mapData;  
                // option1.series[1].data = data.pieData;  
                 echart1.setOption(option1);  
             }  
         },  
         error : function(xmlHttpRequest,errorMsg,exceptionObject) {  
             echart1.hideLoading();  
         }  
     });  
 } 
}
)()