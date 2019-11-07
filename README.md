O objetivo deste trabalho é desenvolver o aprendizado sobre preditores de desvio. Serão
estudados, implementados e avaliados os seguintes tipos de preditores de desvio: Preditor
local de desvios (BHT), Preditor Global (GHT) e Preditor Híbrido. Utilizando-se de lin-
guagens de programação será desenvolvido um programa para simular o comportamento
dos preditores de desvios.

* Os preditor local BHT pode ser modelado como um preditor de parâmetros (m, n),
onde:
m - é o número de bits do PC de mais baixa ordem (LSB) usados para indexar a
tabela de histórico local (branch-history table).
n - número de bits armazenados no registro da tabela de histórico local.

No projeto *m* é o input "Numero bits de PC" e *n* é o input "Numero bits do preditor"
Também é necessário escolher um arquivo do contendo o endereço branch e o valor tomado

Exemplo de arquivo:
	b77a8a3a T
	b77be7ab N
	b77b55a0 N


