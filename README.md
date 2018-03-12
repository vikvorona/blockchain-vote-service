# Blockchain Vote Service

## Create account
```sh
geth account new
```

## Init blockchain
```sh
geth -identity 9873 init \path_to_project_folder\genesis.json -datadir \path_to_your_data_directory\BlockChainVoteService
```

## Start blockchain
```sh
geth --rpc --rpcport "8008" --rpccorsdomain "*" --datadir \path_to_your_data_directory\BlockChainVoteService --networkid 9877
```

## Start console (second cmd window)
```sh
geth attach ipc:\\.\pipe\geth.ipc
```

## Solidity template
```
pragma solidity ^0.4.11;
contract voteContract  {
      string public vote;

    // the function with the same name as the class is a constructor
     function voteContract(string _vote) {
         vote = _vote;
     }
 
     function getVote() constant returns (string) {
         return vote;
     }
 }
 ```

 ## Remix url
 http://remix.ethereum.org

 ## Mining
 ```
 miner.start(); 
 miner.stop();
 ```

 ## Get accounts
 ```
 eth.accounts
 ```