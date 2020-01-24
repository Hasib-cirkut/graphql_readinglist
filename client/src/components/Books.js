import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import {Button} from 'semantic-ui-react'
import { Loader, Card} from 'semantic-ui-react'


const books = gql`
query{
    books{
        name
        genre
        author{
          name
        }
      }
  }
`

const Books = ()=>{

    const {loading, error, data} = useQuery(books)

    if(loading){
        return(
            <Loader active inline='centered' />
        )
    }else{
        let tempData = []

        data.books.map(book =>{
            tempData.push({header: book.name,description: book.author.name, meta: book.genre})
        })
        
        return(/*
            <div>
                {data.authors.map(author =>(
                    <h1>{author.name}</h1>
        ))}
            
            </div>
            */

           <Card.Group items={tempData} style={{marginLeft: "2vw", marginTop: "2vhls"}}/>
        )
    }
}

export default Books