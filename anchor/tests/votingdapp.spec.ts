import * as anchor from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {Keypair, PublicKey} from '@solana/web3.js';
import { BankrunProvider, startAnchor } from "anchor-bankrun";

import {Votingdapp} from '../target/types/votingdapp';
import { before } from 'node:test';
const IDL=require('../target/idl/votingdapp.json');
const   votindAddress=new PublicKey('AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ');

describe('votingdapp', () => {
  let context;
  let provider;
  let votingProgram;

   beforeAll(async()=>{
     context = await startAnchor("", [{name:"votingdapp",programId:votindAddress}], []);

     provider = new BankrunProvider(context);
  
     votingProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );
   }
  )
  

  it('Initialize Poll', async () => {
   
  
    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your fav peanut butter?",
      new anchor.BN(0),
      new anchor.BN(1821246480),
    ).rpc();


    const[pollAddress]=PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8)],
      votindAddress,
    )

    const poll=await votingProgram.account.poll.fetch(pollAddress);
    console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    });

  


it('Initialize candidate', async () => {

})

it('Vote', async () => {

})

});