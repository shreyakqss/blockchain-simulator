import { useState } from 'react'
import './App.css'
import { Block, createBlock } from './lib/blockchain-lib'

function App() {
  const [blocks, setBlocks] = useState<Block[]>([])

  const handleCreateBlockClick = async () => {
    let block = createBlock(blocks[blocks.length - 1], "DDD");
    block.blockHashString = await block.blockHash;
    block.prevBlockHashString = await block.prevBlockHash;
    console.log("new block", block)
    setBlocks([...blocks, block]);
  }


  return (
    <div className="App">
      <h3>Blockchain Simulator</h3>
      <input type="text" id='blockdata' placeholder='Block data string' />
      <button onClick={handleCreateBlockClick}>Add Block</button>
      {blocks.map((block, i) => (
        <div className='block' key={i}>Block #{block.blockIndex} {block.blockIndex == 0 && " GENESIS BLOCK"}</div>
      ))}

    </div>
  )
}

export default App
