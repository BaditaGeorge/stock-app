import React,{useEffect, useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';

function produceData():any{
    let data = {
        // labels:["Jan","Feb","Mar","Apr","May","Jun"],
        labels:[1,2,3,4,5,6],
        // height:'50%',
        datasets:[
            {
                label:'First dataset',
                data:[33,53,85,41,44,65],
                fill:false,
                // backgroundColor:'rgba(75,192,192,0.2)',
                // borderColor:'rgba(75,192,192,1)'
                borderColor:'blue'
            },
            {
                label:'Second dataset',
                data:[33,25,35,51,54,76],
                fill:false,
                borderColor:'#742774'
            }
        ]
    };
    return data;
}

interface ChartData{
    labels:Array<string>;
    datasets:Array<DatasetData>;
}

interface DatasetData{
    label:string;
    data:Array<number>;
    fill:boolean;
    borderColor:string;
}

function produceChartData(symbolData:any):ChartData|any{
    if(symbolData.hgh === undefined){
        return {};
    }
    const weekDays:Array<string> = ['Monday','Thursday','Wednesday','Tuesday','Friday'];
    let labels:Array<string> = [];
    for(let index:number = 0; index < symbolData.low.length; index++){
        labels.push(weekDays[index%5]);
    }
    let dataCurr:DatasetData = {label:'Close Prices',data:symbolData.curr,fill:false,borderColor:'blue'};
    let dataHgh:DatasetData = {label:'High Prices',data:symbolData.hgh,fill:false,borderColor:'purple'};
    let dataLow:DatasetData = {label:'Low Prices',data:symbolData.low,fill:false,borderColor:'red'};
    let chartData:ChartData = {labels:labels,datasets:[dataLow,dataCurr,dataHgh]};
    return chartData;
}

export function Chart({symbolData}:any){
    let chrt:any = useRef(null);
    let [data,setData]:any = useState({});
    useEffect(()=>{
        console.log(produceChartData(symbolData));
        setData(produceChartData(symbolData));
    },[symbolData]);
    // let data:ChartData = produceChartData(symbolData);
    return (
        <div ref={chrt} style={{position:'absolute',left:'5%',top:'10%',width:'90%',height:'85%',backgroundColor:'white',borderTopRightRadius:'2.5%',borderBottomLeftRadius:'2.5%'}}>
            <Line data={data} options={{maintainAspectRatio:false,hover:{mode:false}}}/>
        </div>
    );   
}