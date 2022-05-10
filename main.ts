//% color="#32a852" weight=10 icon="\uf130"

namespace KittenGPS{
let SerialData='xxxxxxxx'
/**
   * init serial port
   * @param tx Tx pin; eg: SerialPin.P1
   * @param rx Rx pin; eg: SerialPin.P2
   */
  //% blockId=gps_init block="GPS init|Tx(Blue) pin %tx|Rx(Green) pin %rx"
  //% group="Basic" weight=100
  export function gps_init(tx: SerialPin, rx: SerialPin): void {
    serial.redirect(tx, rx, BaudRate.BaudRate115200)
    basic.pause(100)
  }

  //% blockId=gps_read block="GPS Get Data"
  //% group="Basic" weight=95
  export function gps_read(){
  let SerialData='xxxxxxxx'
    while (SerialData.length != 15){
        while (SerialData.substr(0,8) != "b'$GNGGA"){
        SerialData=serial.readString()
        }
    }

  }

  //% blockId=gps_get block="GPS Get Data"
  //% group="Basic" weight=90
  export function gps_get(): string{
    return SerialData
  }

}