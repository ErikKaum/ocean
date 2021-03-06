import Head from 'next/head'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { ethers } from "ethers";
import toast from 'react-hot-toast';
import arrow from './assets/arrow.svg'
import Link from 'next/link';

import Ocean from "../contracts/Ocean.json"
const CONTRACT_ADDRESS = "0xfAa01Ab72Ae7D34301EA70f54736977292195427"

export default function Home() {

  const [account, setAccount] = useState("");
  const [link, setLink] = useState(null);
  const [svg, setSvg] = useState("")

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        toast.error("Metamask required");
        return;
      }

      const accounts = await ethereum.request({method : "eth_requestAccounts" })
      const currentAccount = accounts[0]

      setAccount(accounts[0])
      console.log(currentAccount)

      toast("Wallet connected!", {
        icon: '👏',
      });

      eventListener()
    } catch (error) {
      console.log(error)
    }
  }



  const walletIsConnected = async() => {
    const { ethereum } = window

    if (!ethereum) {
      toast.error('No metamask found')
      return;
    } else {
      console.log(ethereum)
    }

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);
    
    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
    	toast.error("You are not connected to the Rinkeby Test Network!");
    }

    const accounts = await ethereum.request({method: 'eth_accounts'})
    
    if (accounts.length !== 0) {
      const currentAccount = accounts[0]
      setAccount(accounts[0])
      console.log(currentAccount)
      eventListener()
    } else {
      console.log('No authorized accounts')
    }
  }

  const eventListener = () => {
  try{
    const { ethereum } = window
    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectContract = new ethers.Contract(CONTRACT_ADDRESS, Ocean.abi, signer);

        connectContract.on("NftMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          console.log(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
          setLink(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        })
        
    }
  }

  catch (error) {
    console.log(error)
  }
}
           
    
  
  const [statement1, setStatement1] = useState(0)
  const [statement2, setStatement2] = useState(0)
  const [statement3, setStatement3] = useState(0)
  const [statement4, setStatement4] = useState(0)
  const [statement5, setStatement5] = useState(0)
  const [statement6, setStatement6] = useState(0)
  const [statement7, setStatement7] = useState(0)
  const [statement8, setStatement8] = useState(0)
  const [statement9, setStatement9] = useState(0)
  const [statement10, setStatement10] = useState(0)
  const [statement11, setStatement11] = useState(0)
  const [statement12, setStatement12] = useState(0)
  const [statement13, setStatement13] = useState(0)
  const [statement14, setStatement14] = useState(0)
  const [statement15, setStatement15] = useState(0)

  const SubmitForm = async (e) => {
    e.preventDefault()
    
    if (statement1 != 0 && statement2 != 0 && statement3 != 0 && statement4 != 0 && statement5 != 0 && statement6 != 0 && statement7 != 0 && statement8 != 0 && statement9 != 0 && statement10 != 0 && statement11 != 0 && statement12 != 0 && statement13 != 0 && statement14 != 0 && statement15 != 0) {

    let neuroticism_sum = parseInt(statement1)+parseInt(statement2)+parseInt(statement3) 
    let neuroticism = neuroticism_sum/3
    console.log(neuroticism)

    let extraversion_sum = parseInt(statement4)+parseInt(statement5)+parseInt(statement6) 
    let extraversion = extraversion_sum/3
    console.log(extraversion)

    let openness_sum = parseInt(statement7)+parseInt(statement8)+parseInt(statement9) 
    let openness = openness_sum/3
    console.log(openness)

    let agreeableness_sum = parseInt(statement10)+parseInt(statement11)+parseInt(statement12) 
    let agreeableness = agreeableness_sum/3
    console.log(agreeableness)

    let conscientiousness_sum = parseInt(statement13)+parseInt(statement14)+parseInt(statement15) 
    let conscientiousness = conscientiousness_sum/3
    console.log(conscientiousness)
    

    let result = `O ${openness.toFixed(1)}; C ${conscientiousness.toFixed(1)}; E ${extraversion.toFixed(1)}; A ${agreeableness.toFixed(1)}; N ${neuroticism.toFixed(1)}`
    
    console.log(result)
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectContract = new ethers.Contract(CONTRACT_ADDRESS, Ocean.abi, signer);

        console.log('Pay gas')

        let nftTx = await connectContract.makeAnNft(result, neuroticism.toFixed(2).toString(), agreeableness.toFixed(2).toString(), openness.toFixed(2).toString(), conscientiousness.toFixed(2).toString(), extraversion.toFixed(2).toString());

        toast.promise(
          nftTx.wait(),
          {
            loading: 'Minting... please wait.',
            success: 'Minted!',
            error: 'Something went wrong',
          },
          
        ).then(
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`),
        )
        
        // console.log("Mining...please wait.")
  

      } else {
        toast.error("No wallet")
      }

    } catch (error) {
      console.log(error)
    }
  }
  else {
    console.log("answer all statements!")
  }
}


  useEffect(() => {
    walletIsConnected();
  }, [])

  const scroll = () => {
      window.document.getElementById('next').scrollIntoView({ 
        behavior: 'smooth' 
      });
  };


  return (
    <div>
    <div>
      <Head>
        <title>OCEAN</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={'w-full h-screen bg-[#9BCCF7] flex flex-col justify-center items-center'}>

        <h1 className={'text-6xl font-bold text-[#173477] mb-5'}>
          Welcome to OCEAN
        </h1>

        <button onClick={connectWallet} className={'bg-[#173477]  text-white p-3 rounded-md mb-10'}>
          Connect wallet
        </button>

        <h2 className={'text-3xl font-semibold text-[#173477] mb-5'}>
          Mint you personality as an NFT!
        </h2>

        <button onClick={() => scroll()}>
        <Image src={arrow} width="40" height="40" className={'animate-bounce hover: cursor-pointer'}/>
        </button>
        </div>

        <div className={'w-full h-full bg-underwater bg-contain flex flex-col justify-center items-center'} id="next">

        <div className={'bg-white bg-opacity-70 px-10 py-5 rounded-md flex flex-col'}> 
        
        <h2 className={'text-3xl font-semibold text-[#173477] mb-5'}>
          I see myself as someone who...
        </h2>

        <form
        className={'flex flex-col'}
        onSubmit={SubmitForm}
        >
        
        <p className={'text-center mb-2'}>worries a lot</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement1(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>gets nervous easily</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement2(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>remains calm in tense situations</p>
        <select className={'self-center mb-10'} onChange={(value) => setStatement3(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>is talkative</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement4(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'} >is outgoing, sociable</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement5(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'} >is reserved</p>
        <select className={'self-center mb-10'} onChange={(value) => setStatement6(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'} >is original, comes up with new ideas</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement7(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'} >values artistic, aesthetic experiences</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement8(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>has an active imagination</p>
        <select className={'self-center mb-10'} onChange={(value) => setStatement9(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'} >is sometimes rude to others</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement10(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>has a forgiving nature</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement11(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>is considerate and kind to almost everyone</p>
        <select className={'self-center mb-10'} onChange={(value) => setStatement12(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>does a thorough job</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement13(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>tends to be lazy</p>
        <select className={'self-center mb-5'} onChange={(value) => setStatement14(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p className={'text-center mb-2'}>does things efficiently</p>
        <select className={'self-center mb-10'} onChange={(value) => setStatement15(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <button className={'bg-[#173477] text-white w-1/2 rounded-md p-3 self-center hover: cursor-pointer'}>
          <input className={'hove: cursor-pointer'} type="submit" value="Submit & Mint"></input>
        </button>

        </form>
        </div>

        <div className={'flex'}>
          <footer>
            <div className={'flex p-10'}></div>
          </footer>
        </div>

        </div>
      </main>

      
    </div>
    </div>
  )
}
