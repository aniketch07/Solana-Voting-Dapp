import { ActionGetResponse, ActionParameter, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions"
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

import {Votingdapp} from '@/../anchor/target/types/votingdapp';
import { AnchorError, BN, Program } from "@coral-xyz/anchor";
const IDL=require('@/../anchor/target/idl/votingdapp.json');

export const OPTIONS=GET;

export async function GET(request: Request) {
  const actionmetadata:ActionGetResponse={
    icon:"data:image/jpeg;base64,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",
    title:"Vote for your Fav type of peanutbutter",
    description:"Vote Between crunchy and smooth peanut butter ",
    label:"Vote",
    links:{
      actions: [
        {
          label: "Crunchy",
          href: "/api/vote?candidate=Crunchy",
          type: "transaction"
        },
        {
          label: "Smooth",
          href: "/api/votecandidate=Smooth",
          type: "transaction"
        }
      ]
    }


  };
  return Response.json(actionmetadata,{headers:ACTIONS_CORS_HEADERS});
}

export async function POST(request:Request) {
 
  const url=new URL(request.url);
  const candidate=url.searchParams.get("candidate");

  if(candidate!="Crunchy"&& candidate!="Smooth"){
    return new Response("invalid candidate",{status:400,headers:ACTIONS_CORS_HEADERS});
  }

  const connection =new Connection('https://api.devnet.solana.com',"confirmed");
  const program: Program<Votingdapp>= new Program(IDL,{connection});
  const body: ActionPostRequest=await request.json();
  let voter;

  try{
    voter=new PublicKey(body.account);
  }catch(error){
    return new Response("Invalid Account",{status:400,headers:ACTIONS_CORS_HEADERS});
  }

  const instruction=await program.methods.vote(candidate,new BN(1)).accounts({signer: voter}).instruction();

  const blockhash=await connection.getLatestBlockhash();

  const tx=new Transaction({
    feePayer:voter,
    blockhash:blockhash.blockhash,
    lastValidBlockHeight:blockhash.lastValidBlockHeight,

  }).add(instruction);

  const response=await createPostResponse({
    fields:{
      transaction:tx,
    }
  })
  return Response.json(response,{headers:ACTIONS_CORS_HEADERS});
}