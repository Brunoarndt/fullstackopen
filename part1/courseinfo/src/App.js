import React, { useState } from 'react'

const App = () => {
  const [esquerda, setEsquerda] = useState(0)
  const [direita, setDireita] = useState(0)
  const [todosOsCliques, setTodos] = useState([])

  const handleCliqueEsquerda = () => {
    setTodos(todosOsCliques.concat('E'))
    setEsquerda(esquerda + 1)
  } 

  const handleCliqueDireita = () => {
    setDireita(direita + 1)
  }

  return (
    <div>
      {esquerda}
      <button onClick={handleCliqueEsquerda}>Esquerda</button>
      <button onClick={handleCliqueDireita}>Direita</button>
      <p>{todosOsCliques.join(' ')}</p>
    </div>
  )
}