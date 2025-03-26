// src/pages/index.js
import { useState } from "react";
import Calculator from "../components/Calculator";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Calculadora Educativa</h1>
      <Calculator />
    </div>
  );
}
