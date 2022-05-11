//% color="#32a852" weight=10 icon="\uf130"

namespace KittenGPS{
let SerialData='xxxxxxxx'
let serialBuf=[]
let UTC=""
let longitude=""
let latitude=""
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
    SerialData="$GNGGA,130651.000,2234.88821,N,11352.29253,E,1,21,0.9,17.8,M,-3.8,M,,*67"
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

  //% blockId=gps_utch block="GPS get UTC Time %timeindex"
  //% group="Basic" weight=85
  export function gps_utch(i:timeindex): number{
  let time=[]
  time[0]=parseFloat(UTC.substr(0,2))
  time[0]=time[0]+8
  time[1]=parseFloat(UTC.substr(2,2))
  time[2]=parseFloat(UTC.substr(4,2))
  return time[i]
  }


}

