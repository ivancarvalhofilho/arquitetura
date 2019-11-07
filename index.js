let linhasDoArquivo = [];
let linhaAtualIndice = 0;
let numeroBitsPreditor;
let numeroBitsPC;

function lerArquivo(){
	let file = $('#file-id').prop('files')[0];
	let reader = new FileReader();
	reader.onload = function(){
		linhasDoArquivo = this.result.split('\n');
		numeroAcertosPorLinha = new Array
	};
	reader.readAsText(file);
}

function executarProximaLinha(){
	linhaAtual = linhasDoArquivo[linhaAtualIndice].split(' ');
	executar(linhaAtual[0], linhaAtual[1]);
}

function proximaExecutacao(){
	if (linhaAtualIndice < linhasDoArquivo.length - 1){
		executarProximaLinha();
		linhaAtualIndice += 1;
	} else {
		$("#botaoDoNext").disabled = true;
		$("#botaoDoNext").text("Finish");
	}
}

function iniciarPreditor () {
	lerArquivo();
	
	$("#menu-1").hide();
	$("#menu-2").show();

	let table = $("#myTable")[0];
	numeroBitsPC = $("#numeroBitsPC").val();
	let quantidadeLinhasNaTabela = Math.pow(2, numeroBitsPC);
	
	numeroBitsPreditor = $("#numeroBitsPreditor").val();

	let colunas = [];
	for (let i=0; i < quantidadeLinhasNaTabela; i++){
		let row = table.insertRow(table.length);
		
		for (let j = 0; j < 9; j++) {
			colunas[j] = row.insertCell(j);
		}
		
		colunas[COLUNA.ID].innerHTML = i.toString(2).padStart(numeroBitsPC, "0");
		colunas[COLUNA.ENDERECO].innerHTML = "";
		colunas[COLUNA.HISTORICO].innerHTML = numeroBitsPreditor == 1 ? "T" : "T,N";
		colunas[COLUNA.REALIZADO].innerHTML = "";
		colunas[COLUNA.PREDITO].innerHTML = "";
		colunas[COLUNA.DESVIO].innerHTML = "";
		colunas[COLUNA.ACERTOS].innerHTML = 0;
		colunas[COLUNA.TOTAL].innerHTML = 0;
		colunas[COLUNA.PRECISAO].innerHTML = 0;
	}
}

COLUNA = {
	ID: 0,	
	ENDERECO: 1,	
	HISTORICO: 2,	
	REALIZADO: 3,	
	PREDITO: 4,
	DESVIO: 5,
	ACERTOS: 6,
	TOTAL: 7,
	PRECISAO: 8
};

function inverteTomado( valor ) {
	return valor == "T" ? "N" : "T";
}

function calculaPrecisao(linha) {
	return ((linha.cells[COLUNA.ACERTOS].innerHTML / linha.cells[COLUNA.TOTAL].innerHTML) * 100).toFixed(2).toString() + "%";
}

function preditor1Bit(linha, realizado) {
	if (linha.cells[COLUNA.HISTORICO].innerHTML == realizado) {
		linha.cells[COLUNA.PREDITO].innerHTML = realizado;
		linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
		linha.cells[COLUNA.ACERTOS].innerHTML++;
	} else {
		linha.cells[COLUNA.PREDITO].innerHTML = linha.cells[COLUNA.HISTORICO].innerHTML;
		linha.cells[COLUNA.HISTORICO].innerHTML = inverteTomado(linha.cells[COLUNA.HISTORICO].innerHTML);
		linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
	}
	linha.cells[COLUNA.TOTAL].innerHTML++;
	linha.cells[COLUNA.PRECISAO].innerHTML = calculaPrecisao(linha);
}

function preditor2Bits(linha, realizado) {
	if (linha.cells[COLUNA.HISTORICO].innerHTML == "T,T") {
		if (realizado == "T") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,N";
		}
	} else if (linha.cells[COLUNA.HISTORICO].innerHTML == "T,N") {
		if (realizado == "T") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,T";
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,N";
		}
	} else if (linha.cells[COLUNA.HISTORICO].innerHTML == "N,N") {
		if (realizado == "N") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,T";
		}
	} else {
		if (realizado == "N") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,N";
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,T";
		}
	}

	linha.cells[COLUNA.TOTAL].innerHTML++;
	linha.cells[COLUNA.PRECISAO].innerHTML = calculaPrecisao(linha);
}

function executar(endereco, realizado) {
	let enderecoEmBinario = (parseInt(endereco, 16)).toString(2);
	let indiceBin = enderecoEmBinario.substring(enderecoEmBinario.length - numeroBitsPC, enderecoEmBinario.length);
	let indiceLinhaTabela = parseInt(indiceBin, 2);

	let linha = $("#myTable")[0].rows[indiceLinhaTabela + 1];

	$(".green").removeClass("green");
	$(linha).addClass("yellow");

	setTimeout(function () {
		$(".yellow").removeClass("yellow");
		$(linha).addClass("green");

		linha.cells[COLUNA.ENDERECO].innerHTML = endereco;
		linha.cells[COLUNA.REALIZADO].innerHTML = realizado;

		if(numeroBitsPreditor == 1) {
			preditor1Bit(linha, realizado);
		} else {
			preditor2Bits(linha, realizado);
		}	
	}, 1000);
}