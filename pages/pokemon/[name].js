import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const getPokemon = async (context) => {
  const name = context?.name ? context.name[1] : context
  try {
    console.log('Fetching data for query:', name)
    const { data } = await axios.get(
      `http://localhost:3000/api/pokemon?name=${encodeURIComponent(name)}`
    )
    console.log('Received data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch data')
  }
}

export default function Pokemon({ data }) {
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || 'Pokemon'}</title>
      </Head>
      <Container>
        {data && (
          <Container>
            <h1>
              {data.name.english} {data.name.chinese}
            </h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(' ', '-')}.jpg`}
                  style={{
                    width: '100%',
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  )
}

export async function getServerSideProps(context) {
  const data = await getPokemon(context.params.name)

  return {
    props: {
      data: data,
    },
  }
}
