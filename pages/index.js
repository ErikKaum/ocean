import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { ethers } from "ethers";
import toast from 'react-hot-toast';

import Ocean from "../contracts/Ocean.json"
const CONTRACT_ADDRESS = "0xfAa01Ab72Ae7D34301EA70f54736977292195427"

export default function Home() {

  const [account, setAccount] = useState("");
  const [link, setLink] = useState(null);
  const [svg, setSvg] = useState("")

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to OCEAN
        </h1>

        <p>I see myself as someone who...</p>

        <form
        onSubmit={SubmitForm}
        >
        <p>worries a lot.</p>

        <select onChange={(value) => setStatement1(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>gets nervous easily</p>
        <select onChange={(value) => setStatement2(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>remains calm in tense situations</p>
        <select onChange={(value) => setStatement3(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p>is talkative</p>
        <select onChange={(value) => setStatement4(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>is outgoing, sociable</p>
        <select onChange={(value) => setStatement5(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>is reserved</p>
        <select onChange={(value) => setStatement6(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p>is original, comes up with new ideas</p>
        <select onChange={(value) => setStatement7(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>values artistic, aesthetic experiences</p>
        <select onChange={(value) => setStatement8(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>has an active imagination</p>
        <select onChange={(value) => setStatement9(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>is sometimes rude to others</p>
        <select onChange={(value) => setStatement10(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p>has a forgiving nature</p>
        <select onChange={(value) => setStatement11(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>is considerate and kind to almost everyone</p>
        <select onChange={(value) => setStatement12(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>does a thorough job</p>
        <select onChange={(value) => setStatement13(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <p>tends to be lazy</p>
        <select onChange={(value) => setStatement14(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={7}> strongly disagree </option>
          <option value={6}> disagree </option>
          <option value={5}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={3}> somewhat agree </option>
          <option value={2}> agree </option>
          <option value={1}> strongly agree </option>
        </select>

        <p>does things efficiently</p>
        <select onChange={(value) => setStatement15(value.target.value)}>
          <option value={0}> choose options below </option>
          <option value={1}> strongly disagree </option>
          <option value={2}> disagree </option>
          <option value={3}> somewhat disagree </option>
          <option value={4}> neither agree nor disagree </option>
          <option value={5}> somewhat agree </option>
          <option value={6}> agree </option>
          <option value={7}> strongly agree </option>
        </select>

        <input type="submit" value="Submit"></input>
        </form>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
