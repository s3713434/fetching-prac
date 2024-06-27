import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, FormControl, Row, Col, Card } from 'react-bootstrap'
import { useQuery } from 'react-query'
import axios from 'axios'

const getPokemon = async ({ queryKey }) => {
  const [_key, q] = queryKey
  try {
    console.log('Fetching data for query:', q)
    const { data } = await axios.get(`/api/search?q=${encodeURIComponent(q)}`)
    console.log('Received data:', data)
    return data.map((pokemon) => ({
      ...pokemon,
      image: `/pokemon/${pokemon.name.english
        .toLowerCase()
        .replace(' ', '-')}.jpg`,
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch data')
  }
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const { data, error } = useQuery(['q', query], getPokemon)
  return (
    <div className='container'>
      <Head>
        <title>Pokemon!</title>
      </Head>

      <Container>
        <FormControl
          placeholder='Search'
          aria-label='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Link href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img
                      variant='top'
                      src={image}
                      style={{ maxHeight: 300 }}
                    />
                    <Card.Body>
                      <Card.Title>
                        {name.english}
                        {' ' + name.chinese}
                      </Card.Title>
                      <Card.Subtitle>{type.join(',')}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}
