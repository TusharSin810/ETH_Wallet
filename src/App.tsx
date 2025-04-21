import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function ConnectWallet(){
  const { connectors, connect } = useConnect()
  const {address} = useAccount();
  const {disconnect} = useDisconnect();

  if(address){
    return(
      <div>
        You are Logged In {address}
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
