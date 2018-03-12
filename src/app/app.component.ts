import { Component } from '@angular/core';
import * as Web3 from 'web3'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  voice = null;
  first = null;
  second = null;
  third = null;
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8008"));
  myContract = this.web3.eth.contract([{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"count","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"arrayCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"arrayNames","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"name2","type":"string"},{"name":"name3","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
  lol = this.myContract.at("0xd46e74ae80d8f2433463e91761431fda98f35460");

  countVoices() {
    var lol2 = this.lol.count(this.voice);
    this.first = lol2[0].c[0];
    this.second = lol2[1].c[0];
    this.third = lol2[2].c[0];
    /*web3.eth.getBalance(this.accNumber, (err, res) => {
      this.ethBalance = web3.fromWei(res, "ether");
    })*/
  }
}
