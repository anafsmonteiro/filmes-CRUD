import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
justify-content: center;
alingn-itens: center;
text-alingn: center;
flex-direction: column;
align-items: center;
box-sizing: border-box;
border: 1px solid grey;
margin: 10px 0;
`
const Botao=styled.button`
padding: .5rem 2rem;
margin: 0 .5rem;
font-size: 14px;
border: 1px solid grey;
border-radius: 10px;
`

const ContainerBotao=styled.div`
display: flex;
padding: 1rem;
background-color: #f0f0f0;
`

const Input = styled.input`
padding:  .5rem 3.3rem;
border: 1px solid #f0f0f0;

`

export default function Catalogo({ filme, deleteFilme, film }) {
    const [moovie, setMoovie] = useState(film.titulo);
    const [descrition, setDescrition] = useState(film.descricao);
    const [year, setYear] = useState(film.ano);
    const [diretor, setDiretor] = useState(film.direcao);
    const [estudio, setEstudio] = useState(film.studio);

    const putFilme = async () => {
        await fetch(`http://localhost:4000/filmes/update/${film._id}`, {
          method: "PUT",
          body: JSON.stringify({ 
            titulo: moovie, 
            descricao: descrition, 
            ano: year, 
            direcao: diretor, 
            studio: estudio
        }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(res => res.json())
          .then(data => {})
          .catch(err => console.log(err))
      };

    const handleDeleteFilme = async () => {
        deleteFilme(film._id)
    };

    return (
      <Container>
        <Input value={moovie} onChange={(event) => {
            setMoovie(event.target.value)
            console.log(moovie);
        }}/>
        <Input value={descrition} onChange={(event) => setDescrition(event.target.value)}/>
        <Input value={year} onChange={(event) => setYear(event.target.value)}/>
        <Input value={diretor} onChange={(event) => setDiretor(event.target.value)}/>
        <Input value={estudio} onChange={(event) => setEstudio(event.target.value)}/>

        <ContainerBotao >
          <Botao onClick={() => putFilme()} >Editar</Botao>

          <Botao onClick={() => handleDeleteFilme()} >Excluir</Botao>
        </ContainerBotao>
      </Container>
    );
  }