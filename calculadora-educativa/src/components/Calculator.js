// src/components/Calculator.js
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState(null);
  const [passos, setPassos] = useState([]);

  // Função para adicionar um número ou operador no input
  const handleButtonClick = (value) => {
    setInput(input + value);
  };
  const gerarExplicacao = (operacao, resultado) => {
    // Divisão Longa
    if (operacao.includes("/")) {
      const [numerador, denominador] = operacao.split("/").map(Number);
      const resultadoInteiro = Math.floor(resultado); // Parte inteira do resultado
      const multiplicacao = denominador * resultadoInteiro; // Multiplicação do divisor pela parte inteira
      const resto = numerador - multiplicacao; // Resto da divisão

      return `
        ${numerador}
      ÷ ${denominador} = ( ${resultado} )
      ----------------
        ${numerador}
      - ${multiplicacao}
      ----------------
          ${resto}
      `;
    }

    // Multiplicação vertical
    if (operacao.includes("*")) {
      const [multiplicando, multiplicador] = operacao.split("*");
      return ` 
        ${multiplicando}
      × ${multiplicador}
      -----
        ${resultado}
      `;
    }

    // Soma (com explicação do somatório)
    if (operacao.includes("+")) {
      const [a, b] = operacao.split("+");
      return `
        ${a}
      + ${b}
      -----
        ${resultado}
      `;
    }

    // Subtração (com explicação do cálculo)
    if (operacao.includes("-")) {
      const [a, b] = operacao.split("-");
      return `
        ${a}
      - ${b}
      -----
        ${resultado}
      `;
    }

    // Caso de operação desconhecida
    return `Operação: ${operacao} resulta em ${resultado}`;
  };

  // Função para calcular a expressão
  const calcular = () => {
    try {
      const resultado = eval(input); // Calcula a expressão
      setResultado(resultado);

      // Gera a explicação detalhada da operação
      const explicacao = gerarExplicacao(input, resultado);

      // Adiciona a operação ao histórico de passos
      setPassos([
        ...passos,
        { operacao: input, resultado: resultado, explicacao: explicacao },
      ]);

      setInput(""); // Limpa o input após o cálculo
    } catch (error) {
      alert("Erro na operação. Verifique sua expressão.");
    }
  };

  // Função para limpar o input
  const limpar = () => {
    setInput("");
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{input || "0"}</div>
      <div className={styles.buttons}>
        {/* Botões de números e operadores */}
        <button
          className={styles.button}
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("*")}
        >
          *
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button className={styles.button} onClick={calcular}>
          =
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
        <button className={styles.button} onClick={limpar}>
          C
        </button>
      </div>

      {/* Exibindo o histórico de operações abaixo */}
      <div className={styles.history}>
        <h3>Histórico de Operações:</h3>
        {passos.length === 0 ? (
          <p>Nenhuma operação realizada.</p>
        ) : (
          passos.map((passo, index) => (
            <div key={index}>
              <p>
                <strong>Operação:</strong> {passo.operacao} = {passo.resultado}
              </p>
              <pre>
                <strong>Explicação:</strong> {passo.explicacao}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
