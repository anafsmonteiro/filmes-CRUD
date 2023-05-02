import { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../../componentes/Title";
import Catalogo from "../../componentes/Catalogo/Catalogo";

const Container = styled.div`
display: flex;
justify-content: center;
alingn-itens: center;
text-alingn: center;
flex-direction: column;
align-items: center;
box-sizing: border-box;
`
const Input=styled.input`
margin: .5rem 0;
padding: 1rem 2rem;
border: 2px solid #ccc;
border-radius: 10px;
`
const Botao=styled.button`
padding: 1rem 1.5rem;
font-size: 16px;
border: 1px solid grey;
border-radius: 10px;
`


export default function Home() {

  const [filmes, setFilmes] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [ano, setAno] = useState('')
  const [direcao, setDirecao] = useState('')
  const [studio, setStudio] = useState('')

  useEffect(() => {
    fetch("http://localhost:4000/filmes", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      setFilmes(data);
      console.log(data);
    })
    .catch(err => console.log(err));
  }, [])

  const addMovie = () => {

    const newMovie = {
      titulo: titulo,
      descricao: descricao,
      ano: ano,
      direcao: direcao,
      studio: studio,
    }

    fetch('http://localhost:4000/filmes/catalogo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie)
    })
    .then(data => console.log(data))

    fetch("http://localhost:4000/filmes", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      setFilmes(data);
      console.log(data);
    })
    .catch(err => console.log(err));
  }
    

    const deleteFilme = async (id) => {
      await fetch(`http://localhost:4000/filmes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(setFilmes(filmes))

      fetch("http://localhost:4000/filmes", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      setFilmes(data);
      console.log(data);
    })
    .catch(err => console.log(err));
    };

    return (
      <div>
        <Container>
          <Title>Cadastre um novo filme</Title>
            <Container>
              <Input placeholder='Digite o nome do filme' type='text'
                onChange={(event) => setTitulo(event.target.value)}/>
              <Input placeholder='Digite a descrição do filme' type='text'
                onChange={(event) => setDescricao(event.target.value)}/>
              <Input placeholder='Digite o ano do filme' type='number'
                onChange={(event) => setAno(event.target.value)}/>
              <Input placeholder='Digite quem dirigiu o filme' type='text'
                onChange={(event) => setDirecao(event.target.value)}/>
              <Input placeholder='Digite o nome do studio' type='text'
                onChange={(event) => setStudio(event.target.value)}/>
              <Botao onClick={() => addMovie()}>
                Enviar
              </Botao>
            </Container>
        </Container>

        <Container>
          <Title>Catálogo de filmes</Title>
          {filmes.length === 0 ? (
            <p>Carregando...</p>
          ) : (filmes.map(filme => (
            <Catalogo
              key={filme._id}
              filme={filme}
              deleteFilme={deleteFilme}
              film={filme}
            />
          ))
          )}
        </Container>
      </div>
    )
  }