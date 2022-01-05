module.exports = {
    //SAE
    networks : {
        development: {
            host : "127.0.0.1", 
            port : "7545",
            network_id : "*" // match any network 
        }
    },
    compilers: {
        solc: {
          version: "^0.8",
          //this optimizer config for reduce gas fee
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
}