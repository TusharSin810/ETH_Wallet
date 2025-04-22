import { id, JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/ch2xeAWYr9E6ShlCU3e2VI7wvh5dXXhj");

async function pollBlock(blockNumber: number){
    const logs = await provider.getLogs({
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        fromBlock: blockNumber,
        toBlock: blockNumber + 2,
        topics: [id("Transfer(address,address,uint256)")]
    });
    console.log(logs)
}

async function main(){
    const currentblock = 1;
    while(1){
        await pollBlock(currentblock)
    } 
}