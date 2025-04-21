import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useDisconnect, useReadContract, WagmiProvider } from 'wagmi'
import { config } from './config'
import { ABI } from './abi'
import { AllowUSDT } from './AllowUSDT'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <ConnectWallet />
          <TotalSupply />
          <BalanceOf />
          <Account />
          <AllowUSDT />
      </QueryClientProvider>
    </WagmiProvider>
  )
}


function TotalSupply(){
  const {data, isLoading, error} = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: ABI,
    functionName: 'totalSupply'
  })
  return(
    <div>
      Total Supply - {JSON.stringify(data?.toString())}
    </div>
  )
}

function Account(){
  const {address} = useAccount()
  return(
    <div>
      {address ? "You Are Connected - "+ address : "You Are Not Connected"} 
    </div>
  )
}

function BalanceOf(){
  const {address} = useAccount();
  const {data, isLoading, error} = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: ABI,
    functionName: 'balanceOf',
    args: [address?.toString()]
  })
  return(
    <div>
      USDT Balance Of User - {JSON.stringify(data?.toString())}
    </div>
  )  
}

function ConnectWallet(){
  const { connectors, connect } = useConnect()
  const {address} = useAccount();
  const {disconnect} = useDisconnect();

  if(address){
    return(
      <div>
        You are Logged In - {address}
        <br />
        <button onClick={() => {
          disconnect();
        }}>Disconnect</button>
      </div>
    )
  }

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>)
  )
}


export default App
