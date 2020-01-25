import React, { useEffect, useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import {Button} from 'semantic-ui-react'
import { Loader, Card, Segment, Form} from 'semantic-ui-react'


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

const addBooks = gql`

mutation($name: String, $genre: String){
    addBook(name: $name, genre: $genre){
      name,
      genre
    }
  }`

const Books = ()=>{

    const {loading, error, data} = useQuery(books)
    const [addInfo] = useMutation(addBooks)

    const [Name, setName] = useState("");
    const [Genre, setGenre] = useState("");


    const nameHandle = event =>{
        
        setName(event.target.value)
    }

    const genreHandle = event =>{
        setGenre(event.target.value)
    }

    const handleSubmit = event =>{
        event.preventDefault()

        addInfo({variables:{name: Name, genre: Genre}})

    }


    if(loading){
        return(
            <Loader active inline='centered' />
        )
    }else{
        let tempData = []
        
        data.books.map(book =>{
            if(book.author === null){
                tempData.push({header: book.name,description: "Unknown", meta: book.genre})
            }else{
                tempData.push({header: book.name,description: book.author.name, meta: book.genre})
            }
            
        })
        
        return(

            <div>
                <Card.Group items={tempData} style={{marginLeft: "2vw", marginTop: "2vh"}}/>

                <Segment inverted>
                    <Form inverted >
                    <Form.Group widths='equal'>
                        <Form.Input fluid name="bookname" onChange={nameHandle} placeholder='Book name' />
                        <Form.Input fluid name="bookgenre" onChange={genreHandle} placeholder='Genre' />
                    </Form.Group>
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Segment>
            </div>

        
        )
    }
}

export default Books