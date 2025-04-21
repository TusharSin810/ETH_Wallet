import { id, JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/ch2xeAWYr9E6ShlCU3e2VI7wvh5dXXhj");

async function pollBack(blockNumber: number){
    const logs = await provider.getLogs({
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        fromBlock: blockNumber,
        toBlock: blockNumber + 2,
        topics: [id("Transfer(address,address,uint256)")]
    });
    console.log(logs)
}

pollBack(21493826);