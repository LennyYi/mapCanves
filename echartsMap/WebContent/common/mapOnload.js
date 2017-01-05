window.onload=function(){
var initData;
	 $.ajax({  
        url : "map",//springmvc的controller的请求路径
        type : "GET",  
        async : true, //同步执行  
        data : {},  //设置过滤参数，或者条件参数
        dataType : "json", //返回数据形式为json  
        success : function(data) { 
        	initData=data;
        	var option1;
        	var chart1;
        	var echart1;
        	var chart3;
        	var echart3;
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
        					var x;
        					var y;
        					var pos = [x,y];
        					 option1 = {
        							backgroundColor: 'rgba(187,203,243,0.5)',
        						    tooltip : {
        						    	enterable:false,
        						    	position:function(pos) {return [pos[0]+100,pos[1]+100]},
        						    	backgroundColor:'rgba(187,203,243,0.5)',
        						    	borderWidth:2,
        						    	showDelay: 0,
        						    	transitionDuration:4000,
        						    	borderColor:'#fff',
        						        trigger: 'item',
        						        borderRadius:10,
        						        formatter :function(params,ticket, callback){
        				                            setTimeout(function (){  
        				                                callback(ticket, "<div id='chart3' style='border:0px;height:200px;width:400px;background-color:rgba(187,203,243,0.5)'></div>");  
        				                            	chart3=document.getElementById('chart3');
        				                            	 echart3 = ec.init(chart3);
        				                            	 echart3.hideLoading(); 
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
        								            				                    color:'#000000'
        								            				                },
        								            				                icon:'stack'
        								            				            },
        								            				            {
        								            				                name:'risk',
        								            				                textStyle:{
        								            				                    fontSize:12,
        								            				                    fontWeight:'bolder',
        								            				                    color:'#000000'
        								            				                },
        								            				                icon:'stack'
        								            				            },
        								            				            {
        								            				                name:'overdue',
        								            				                textStyle:{
        								            				                    fontSize:12,
        								            				                    fontWeight:'bolder',
        								            				                    color:'#000000'
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
        											            			                	color:'#000000',
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
        								            			            data:initData.pieData
        								            			        }
        								            			    ],
        								            			    animation: false,
        								            			    color:['green','yellow','red']  
        								            			};
        				                            	  echart3.setOption(option3);
        				                            	  
        				                            }, 0);
        				                            return "loading";
        				                         
        						        }
        						    	 
        						        	/*function (params, ticket, callback) {
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
        						        }*/
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
        						            data:initData.mapData
        						        }
        						    ],
        						    animation: false,
        						    color:['green','yellow','red'] 
        						};
        					
        					     option1.series[0].data = initData.mapData;  
        		                 echart1.setOption(option1);  
        					 var ecConfig = require('echarts/config');  
        					 echart1.on(ecConfig.EVENT.MAP_SELECTED, function (param) {  
        					        var selected = param.selected;
        			                for (var p in selected) {
        			                    if (selected[p]) {//注意判断
        			                    	//读取后台URI 需要通过ajax把这个值传入到servlet 或者  专门处理点击跳转的sevice(action)
        			                    	   if (typeof data.url=="string") {  
   			                                   	location.href=initData.url;
   			                                 }  
        			                    }
        			                }
        					       
        					    }
        					 )  
        				}
        			);
        	
        },  
        error : function(xmlHttpRequest,errorMsg,exceptionObject) {  
            echart1.hideLoading();  
        }  
    });  
	
	
}
