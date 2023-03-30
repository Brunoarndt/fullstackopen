import { useState } from 'react'


const AnecdoteDay = ({anecdotes}) => {
  return(
    <div>
    <h2>Anedota do dia</h2>
    <p>{anecdotes}</p>
  </div>
  )
}

const MaisVotada = ({maisVotado, melhorAnedota}) => {
  return (
    <div>
    <h2>Anedota com mais votos</h2>
    {maisVotado ? (
      <div>
        <p>{melhorAnedota}</p>
      </div>
    ) : (
      <p>Sem votos ainda</p>
    )}
  </div>
  )
}

const App = () => {
  
  const [selected, setSelected] = useState(0)
  const [pontos, setPontos] = useState(Array(anecdotes.length).fill(0))
  
  const copia = [...pontos]

  const maisVotado = (Math.max(...pontos))
  const melhorAnedota = anecdotes[pontos.indexOf(maisVotado)] 


  const handleNext = () => {
    let random = generateRandom(anecdotes.length)
    while (random === selected) {
      random = Math.floor(Math.random() * (anecdotes.length)) 
    }
    setSelected(random)
  }

  const handleVote = () => {
    copia[selected] ++
    setPontos(copia)
  }
  return (
    <div>
      <AnecdoteDay anecdotes={anecdotes[selected]}/>
      <MaisVotada maisVotado={maisVotado} melhorAnedota={melhorAnedota}/>
      
      <button onClick={handleVote}>votar</button>
      <button onClick={handleNext}>Proxima anedota</button>
    </div>
  )

  function generateRandom(length) {
    return Math.floor(Math.random() * length);
  }
}

const anecdotes = [
  'Se fazer algo dói, faça isso com mais frequência.',
  'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
  'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
  'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
  'Otimização prematura é a raiz de todo o mal.',
  'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
  'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
  'A única maneira de ir rápido é ir bem.'
]
 

export default App