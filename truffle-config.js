module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // local Ganache blockchain port
      network_id: "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}