import {useState} from 'react';
import { setSourceMapRange } from 'typescript';

export function RetrieveApiData(setSymbols:any){
    async function retrieveData(){
        const url:string = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token='
        let resp = await fetch(url);
        let data = await resp.json();
        let symbolObjects:Array<any> = [];
        console.log(data[0]);
        for(let i:number = 0; i < data.length; i++){
            symbolObjects.push({symbol:data[i].symbol,description:data[i].description});
        }
        console.log(symbolObjects[3]);
        setSymbols(symbolObjects);
    }
    retrieveData();
}

export function RetrieveSymbolData(setSymbolData:any,symbol:string,startDate:any,endDate:any){
    async function retrieveSymbolData(){
        console.log(startDate.getTime().toString().slice(0,-3));
        startDate = Math.floor(startDate.getTime()/1000);
        endDate = Math.floor(endDate.getTime()/1000);
        console.log(startDate,endDate);
        const url:string = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${startDate}&to=${endDate}&token=`
        console.log(url);
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data);
        let symbolData:any = {};
        symbolData.curr = data.c;
        symbolData.low = data.l;
        symbolData.hgh = data.h;
        setSymbolData(symbolData);
    }
    retrieveSymbolData();
}