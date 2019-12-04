# PREDITOR DE DESVIOS (BHT E GHT)

Aplicação: https://ivancarvalhofilho.github.io/arquitetura/

### UNIVERSIDADE FEDERAL DE LAVRAS - Arquitetura de Computadores II – GCC123

O objetivo deste trabalho é desenvolver o aprendizado sobre preditores de desvio. Serão
estudados, implementados e avaliados os seguintes tipos de preditores de desvio: Preditor
local de desvios (BHT) e Preditor Global (GHT). Utilizando-se de linguagens de programação
será desenvolvido um programa para simular o comportamento dos preditores de desvios.

---

- O preditor local BHT pode ser modelado como um preditor de parâmetros (m, n),
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
