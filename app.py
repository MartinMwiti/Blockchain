import os
from web3 import Web3

#ETHERIUM
infura_endpoint_key = os.environ.get('infura_endpoint_key')
infura_url = "https://mainnet.infura.io/v3/" + infura_endpoint_key  # PROJECT ENDPOINT URL KEY
web3 = Web3(Web3.HTTPProvider(infura_url))

print(web3.isConnected())  # check connection status
print(web3.eth.blockNumber) #read/get the latest block number on the etherium blochchain

mm_key = os.environ.get('Meta_Mask') #MetaMask wallet key
balance = web3.eth.getBalance(mm_key)
print(web3.fromWei(balance, 'ether'))


