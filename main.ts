//% color="#32a852" weight=10 icon="\uf130"

namespace KittenGPS{
let SerialData='xxxxxxxx'
let serialBuf: string[] = []
let UTC=""
let longitude=""
let latitude=""
export enum timeindex{
//% block="Hour"
hour=0,
//% block="Minute"
min=1,
//% block="Second"
sec=2,
}
/**
   * init serial port
   * @param tx Tx pin; eg: SerialPin.P1
   * @param rx Rx pin; eg: SerialPin.P2
   */
  //% blockId=gps_init block="GPS init|Tx(Blue) pin %tx|Rx(Green) pin %rx"
  //% group="Basic" weight=100
  export function gps_init(tx: SerialPin, rx: SerialPin): void {
    serial.redirect(tx, rx, BaudRate.BaudRate9600)
    basic.pause(100)
  }

  //% blockId=gps_read block="GPS Read Data"
  //% group="Basic" weight=95
  export function gps_read(){
  SerialData='xxxxxxxx'
  //SerialData=serial.readString()
  while (!SerialData.includes("GNGGA")){
    SerialData=serial.readLine()
    //SerialData="$GNGGA,130651.000,2234.88821,N,11352.29253,E,1,21,0.9,17.8,M,-3.8,M,,*67"
    serialBuf=SerialData.split(",")
    basic.pause(100)
  }
  if (serialBuf.length>4){
  UTC=serialBuf[1]
  latitude=serialBuf[2]
  longitude=serialBuf[4]
  }

  }

  //% blockId=gps_get block="GPS Get Data"
  //% group="Basic" weight=90
  export function gps_get(): string{
    return SerialData
  }

  //% blockId=gps_utc block="GPS get UTC Time %i"
  //% group="Basic" weight=85
  export function gps_utc(i:timeindex): number{
  if (UTC!=''){
  let time=[]
  time[0]=parseFloat(UTC.substr(0,2))
  time[0]=time[0]+8
  time[1]=parseFloat(UTC.substr(2,2))
  time[2]=parseFloat(UTC.substr(4,2))
  return time[i]
  }
  else return 0
  }

  //% blockID=gps_latitude block="GPS Get Latitude"
  //% group="Basic" weight=80
  export function gps_latitude():number{
  let latfinal = -1
  if (latitude!=''){
  latfinal=parseFloat(latitude.substr(0,2))+(parseFloat(latitude.substr(2,latitude.length)))/60
  }
  // 22.5814701666667
  return latfinal
  }

  //% blockID=gps_longitude block="GPS Get Longitude"
  //% group="Basic" weight=75
  export function gps_longitude():number{
  let lonfinal = -1
  if (longitude!=''){
  lonfinal=parseFloat(longitude.substr(0,3))+(parseFloat(longitude.substr(3,longitude.length)))/60
  }
  return lonfinal
  }
}

