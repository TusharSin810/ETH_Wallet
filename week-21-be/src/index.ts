import { id, JsonRpcProvider } from "ethers";
import { getBlockNumber } from "viem/actions";

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
let currentBlock = 0;

while (true) {
    const latestBlock = await provider.getBlockNumber();

    while (currentBlock <= latestBlock - 32) {
        await pollBlock(currentBlock);
        currentBlock++;
    }
}
}