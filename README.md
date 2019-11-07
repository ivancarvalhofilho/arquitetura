# UNIVERSIDADE FEDERAL DE LAVRAS

## Arquitetura de Computadores II – GCC123

O objetivo deste trabalho é desenvolver o aprendizado sobre preditores de desvio. Serão
estudados, implementados e avaliados os seguintes tipos de preditores de desvio: Preditor
local de desvios (BHT), Preditor Global (GHT) e Preditor Híbrido. Utilizando-se de lin-
guagens de programação será desenvolvido um programa para simular o comportamento
dos preditores de desvios.

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
		b77be7ab N
		b77b55a0 N
		b77b55e2 N
		b77b55ec N
		b77a8b56 N
		b77ae087 N
		b77be7ab N
		b77bdec4 T
		b77b5c36 T
		b77b5c3d T
		b77bdec4 T
		b77b5c5f T
		b77b5c4d T
		b77ae087 T
		b77be7ab N
		b77bdec4 N
		b77b5c36 N

```

- Exemplo de saída para o arquivo acima, com 1 bit para bits do preditor e 3 para número de bits do pc


	| ID  | Endereço | Histórico | Realizado | Predito | Desvio | Acertos | Total | Precisão |
	|-----|----------|-----------|-----------|---------|--------|---------|-------|----------|
	| 000 | b77b55a0 | N         | N         | T       | Errado | 0       | 1     | 0.00%    |
	| 001 |          | T         |           |         |        | 0       | 0     | NA       |
	| 010 | b77b55e2 | N         | N         | T       | Errado | 1       | 2     | 50.00%   |
	| 011 | b77be7ab | N         | N         | N       | Certo  | 2       | 3     | 66.67%   |
	| 100 | b77bdec4 | N         | N         | T       | Errado | 1       | 4     | 25.00%   |
	| 101 | b77b5c4d | T         | T         | T       | Certo  | 2       | 2     | 100.00%  |
	| 110 | b77b5c36 | N         | N         | T       | Errado | 0       | 3     | 0.00%    |
	| 111 | b77ae087 | T         | T         | T       | Certo  | 1       | 3     | 33.33%   |

