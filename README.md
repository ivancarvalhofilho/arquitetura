# PREDITOR DE DESVIOS (BHT E GHT)

Aplicação: https://ivancarvalhofilho.github.io/arquitetura/

## UFLA - Arquitetura de Computadores II – GCC123

### Introdução

O objetivo deste trabalho é desenvolver o aprendizado sobre preditores de desvio. Serão
estudados, implementados e avaliados os seguintes tipos de preditores de desvio: Preditor
local de desvios (BHT) e Preditor Global (GHT). Utilizando-se de linguagens de programação
será desenvolvido um programa para simular o comportamento dos preditores de desvios.

---

### Preditor local (BHT)

- O objetivo do preditor BHT é encontrar um padrão de desvio para cada branch, considerando cada preditor separadamente.
  Para realizar a predição, ele utiliza o número de bits do PC para criar a tabela de predições, então o tamanho total
  da tabela seria: 2^m. Cada endereço é indexado à uma posição na tabela, que não é necessariamente única, mas totalmente
  determinística, isto é, um endereço será sempre indexado na mesma posição.

O preditor local BHT pode ser modelado como um preditor de parâmetros (m, n),
onde:
m - é o número de bits do PC de mais baixa ordem (LSB) usados para indexar a
tabela de histórico local (branch-history table).
n - número de bits armazenados no registro da tabela de histórico local.

      No projeto *m* é o input "Numero bits de PC" e *n* é o input "Numero bits do preditor"
      Também é necessário escolher um arquivo do contendo o endereço branch e o valor tomado

      Exemplo de arquivo:

```
b77a8a3a T
b77be7ab T
b77b55a0 N
b77b55e2 T
b77b55ec T
b77a8b56 N
b77ae087 T
b77be7ab T
b77bdec4 N
b77b5c36 T
b77b5c3d T
b77bdec4 N
b77b5c5f T
b77b5c4d T
b77ae087 N
b77be7ab T
b77bdec4 T
b77b5c36 N

```

- Exemplo de saída para o arquivo acima, com 1 para bits do preditor e 3 para número de bits do PC:

| ID  | Endereço | Histórico | Realizado | Predito | Desvio | Acertos | Total | Precisão |
| --- | -------- | --------- | --------- | ------- | ------ | ------- | ----- | -------- |
| 000 | b77b55e2 | T         | T         | N       | Errado | 0       | 2     | 0.00%    |
| 001 | b77bdec4 | T         | T         | N       | Errado | 3       | 5     | 60.00%   |
| 010 | b77be7ab | T         | T         | T       | Certo  | 3       | 3     | 100.00%  |
| 011 | b77b5c4d | T         | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 100 |          | T         |           |         |        |         |       | NA       |
| 101 | b77b5c36 | N         | N         | T       | Errado | 0       | 3     | 0.00%    |
| 110 | b77a8a3a | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 111 | b77b5c5f | T         | T         | T       | Certo  | 2       | 2     | 100.00%  |

```
 Precisão Geral: 61.11%
```

---

- Exemplo de saída para o arquivo acima, com 2 para bits do preditor e 3 para número de bits do PC:

| ID  | Endereço | Histórico | Realizado | Predito | Desvio | Acertos | Total | Precisão |
| --- | -------- | --------- | --------- | ------- | ------ | ------- | ----- | -------- |
| 000 | b77b55e2 | N,T       | T         | N       | Errado | 0       | 2     | 0.00%    |
| 001 | b77bdec4 | N,T       | T         | N       | Errado | 2       | 5     | 40.00%   |
| 010 | b77be7ab | T,T       | T         | T       | Certo  | 3       | 3     | 100.00%  |
| 011 | b77b5c4d | T,T       | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 100 |          | T,N       |           |         |        |         |       | NA       |
| 101 | b77b5c36 | N,N       | N         | N       | Certo  | 1       | 3     | 33.33%   |
| 110 | b77a8a3a | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 111 | b77ae087 | T,T       | T         | T       | Certo  | 2       | 2     | 100.00%  |

```
 Precisão Geral: 61.11%
```

---

### Preditor Global (GHT)

- O objetivo do preditor GHT é encontrar um padrão de desvio geral, considerando todos os preditores. Para realizar a predição,
  ele possui uma lista de histórico global, que armazena, da esquerda para a direita, os resultados dos últimos desvios realizado
  (se foram tomados ou não tomados) então concatena o número de bits do PC para criar a tabela de predições, assim, o ght dá ao
  endereço influência sobre sua predição. A tabela é indexada considerando os bits mais significativos como os resultados possíveis
  na lista de histórico global. Os bits menos significativos são os bits do número de PC. Então o tamanho total de uma tabela de
  predições ght seria: 2^g \* 2^m.

---

O preditor global GHT pode ser modelado como um preditor de parâmetros (m, n, g),
onde:
m - é o número de bits do PC de mais baixa ordem (LSB) usados para indexar a
tabela de histórico local (branch-history table).
n - número de bits armazenados no registro da tabela de histórico local.
g- é o número de bits armazenados no hirtórico global.

    	No projeto _m_ é o input "Numero bits de PC" e _n_ é o input "Numero bits do preditor"
    	e _g_ é o número de bits do histórico global Também é necessário escolher um arquivo
    	do contendo o endereço branch e o valor tomado.

    	Exemplo de arquivo:

```
b77a8a3a T
b77be7ab T
b77b55a0 N
b77b55e2 T
b77b55ec T
b77a8b56 N
b77ae087 T
b77be7ab T
b77bdec4 N
b77b5c36 T
b77b5c3d T
b77bdec4 N
b77b5c5f T
b77b5c4d T
b77ae087 N
b77be7ab T
b77bdec4 T
b77b5c36 N

```

- Exemplo de saída para o arquivo acima, com 1 para bits do preditor, 2 para número de bits do PC
  e 2 para o tamanho do histórico global:

| Histórico Global |
| ---------------- |
| T, N             |

| ID    | Endereço | Histórico | Realizado | Predito | Desvio | Acertos | Total | Precisão |
| ----- | -------- | --------- | --------- | ------- | ------ | ------- | ----- | -------- |
| 00 00 |          | T         |           |         |        |         |       | NA       |
| 00 01 |          | T         |           |         |        |         |       | NA       |
| 00 10 |          | T         |           |         |        |         |       | NA       |
| 00 11 |          | T         |           |         |        |         |       | NA       |
| 01 00 |          | T         |           |         |        |         |       | NA       |
| 01 01 | b77bdec4 | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 01 10 | b77be7ab | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 01 11 | b77b5c4d | T         | T         | T       | Certo  | 3       | 3     | 100.00%  |
| 10 00 | b77b55e2 | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 10 01 | b77b5c36 | T         | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 10 10 | b77be7ab | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 10 11 | b77b5c5f | T         | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 11 00 | b77b55a0 | N         | N         | T       | Errado | 0       | 1     | 0.00%    |
| 11 01 | b77b5c36 | N         | N         | N       | Certo  | 4       | 5     | 80.00%   |
| 11 10 | b77be7ab | T         | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 11 11 |          | T         |           |         |        |         |       | NA       |

```
 Precisão Geral: 88.89%
```

---

- Exemplo de saída para o arquivo acima, com 2 para bits do preditor, 2 para número de bits do PC
  e 2 para o tamanho do histórico global:

| Histórico Global |
| ---------------- |
| T, N             |

| ID    | Endereço | Histórico | Realizado | Predito | Desvio | Acertos | Total | Precisão |
| ----- | -------- | --------- | --------- | ------- | ------ | ------- | ----- | -------- |
| 00 00 |          | T,N       |           |         |        |         |       | NA       |
| 00 01 |          | T,N       |           |         |        |         |       | NA       |
| 00 10 |          | T,N       |           |         |        |         |       | NA       |
| 00 11 |          | T,N       |           |         |        |         |       | NA       |
| 01 00 |          | T,N       |           |         |        |         |       | NA       |
| 01 01 | b77bdec4 | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 01 10 | b77be7ab | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 01 11 | b77b5c4d | T,T       | T         | T       | Certo  | 3       | 3     | 100.00%  |
| 10 00 | b77b55e2 | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 10 01 | b77b5c36 | T,T       | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 10 10 | b77be7ab | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 10 11 | b77b5c5f | T,T       | T         | T       | Certo  | 1       | 1     | 100.00%  |
| 11 00 | b77b55a0 | N,N       | N         | T       | Errado | 0       | 1     | 0.00%    |
| 11 01 | b77b5c36 | N,N       | N         | N       | Certo  | 4       | 5     | 80.00%   |
| 11 10 | b77be7ab | T,T       | T         | T       | Certo  | 2       | 2     | 100.00%  |
| 11 11 |          | T,N       |           |         |        |         |       | NA       |

```
 Precisão Geral: 88.89%
```

---

### Conclusão

Em relação ao BHT de 1 e 2 bits, para entradas intercaladas do tipo 'TNTNTNT' o preditor de 2 bits obteve
uma presição maior que o de 1bit, sendo 66.67% para o de preditor de 1 bit e 72.22% para o preditor de 2 bits.
Esse comportamento é esperado já que para mudar a predição no caso de 2 bits é preciso que ele falhe 2 vezes seguidas.

Na comparação do preditor global GHT e o preditor local BHT, foi visto que para entradas com algum padrão como a do exemplo
apresentado no trabalho, O GHT tem uma precisão maior que o BHT, pois, o GHT segue uma tabela de histórico global que
auxilia o preditor a identificar padrões.
