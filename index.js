let linhasDoArquivo = [];
let linhaAtualIndice = 0;
let numeroBitsPreditor;
let numeroBitsIndexador;
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
	let opcaoPreditorBht = $("[name='preditor']:checked").val();
	if(opcaoPreditorBht == 0){
		executarBht(linhaAtual[0], linhaAtual[1].replace(/\r?\n|\r/, ''));
	} else {
		executarGht(linhaAtual[0], linhaAtual[1].replace(/\r?\n|\r/, ''));
	}
}

function proximaExecutacao(){
	if (linhaAtualIndice < linhasDoArquivo.length - 1){
		executarProximaLinha();
		linhaAtualIndice += 1;
	} else {
		$("#botaoDoNext").disabled = true;
		$("#botaoDoNext").text("Terminado");
		$("#botaoDoNext").addClass("disabledButton");
	}
}

function iniciarPreditor () {
	lerArquivo();

	numeroBitsPC = $("#numeroBitsPC").val();
	
	numeroBitsPreditor = $("#numeroBitsPreditor").val();

	let opcaoPreditorGht = $("[name='preditor']:checked").val();
	if(opcaoPreditorGht == 1){
		$("#titulo").text("Preditor Global de Desvios");
		tamanhoHistoricoGlobal = $("#tamanhoHistoricoGlobal").val();
		historicoGlobal = "".padStart(tamanhoHistoricoGlobal, "1");

		let tabelaHistoricoGlobal = $("#tabelaHistoricoGlobal")[0];
		let row = tabelaHistoricoGlobal.insertRow(1);
		for (let j=0; j < tamanhoHistoricoGlobal; j++) {
			coluna = row.insertCell(j);
			coluna.innerHTML = "T";
		}
		$(tabelaHistoricoGlobal).show();
	}
	numeroBitsIndexador = Number(numeroBitsPC) + Number(tamanhoHistoricoGlobal);
	
	$("#menu-1").hide();
	$("#menu-2").show();

	let table = $("#myTable")[0];
	let quantidadeLinhasNaTabela = Math.pow(2, numeroBitsIndexador);
	

	let colunas = [];
	for (let i=0; i < quantidadeLinhasNaTabela; i++){
		let row = table.insertRow(table.length);
		
		for (let j = 0; j < 9; j++) {
			colunas[j] = row.insertCell(j);
		}
		
		let index = i.toString(2).padStart(numeroBitsIndexador, "0");
		index = `<global>${index.substring(0, tamanhoHistoricoGlobal)} </global>${index.substring(tamanhoHistoricoGlobal, index.length)}`;
		colunas[COLUNA.ID].innerHTML = index;
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
		$(linha).addClass("green");
	} else {
		linha.cells[COLUNA.PREDITO].innerHTML = linha.cells[COLUNA.HISTORICO].innerHTML;
		linha.cells[COLUNA.HISTORICO].innerHTML = inverteTomado(linha.cells[COLUNA.HISTORICO].innerHTML);
		linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
		$(linha).addClass("red");
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
			$(linha).addClass("green");
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,N";
			$(linha).addClass("red");
		}
	} else if (linha.cells[COLUNA.HISTORICO].innerHTML == "T,N") {
		if (realizado == "T") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,T";
			$(linha).addClass("green");
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,N";
			$(linha).addClass("red");
		}
	} else if (linha.cells[COLUNA.HISTORICO].innerHTML == "N,N") {
		if (realizado == "N") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
			$(linha).addClass("green");
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,T";
			$(linha).addClass("red");
		}
	} else {
		if (realizado == "N") {
			linha.cells[COLUNA.PREDITO].innerHTML = realizado;
			linha.cells[COLUNA.DESVIO].innerHTML = "Certo";
			linha.cells[COLUNA.ACERTOS].innerHTML++;
			linha.cells[COLUNA.HISTORICO].innerHTML = "N,N";
			$(linha).addClass("red");
		} else {
			linha.cells[COLUNA.PREDITO].innerHTML = inverteTomado(linha.cells[COLUNA.REALIZADO].innerHTML);
			linha.cells[COLUNA.DESVIO].innerHTML = "Errado";
			linha.cells[COLUNA.HISTORICO].innerHTML = "T,T";
			$(linha).addClass("red");
		}
	}

	linha.cells[COLUNA.TOTAL].innerHTML++;
	linha.cells[COLUNA.PRECISAO].innerHTML = calculaPrecisao(linha);
}

function executarBht(endereco, realizado) {
	let enderecoEmBinario = ((parseInt(endereco, 16)) >>> 2).toString(2);
	let indiceBin = enderecoEmBinario.substring(enderecoEmBinario.length - numeroBitsIndexador, enderecoEmBinario.length);
	let indiceLinhaTabela = parseInt(indiceBin, 2);

	let linha = $("#myTable")[0].rows[indiceLinhaTabela + 1];

	$(".green").removeClass("green");
	$(".red").removeClass("red");
	$(linha).addClass("yellow");

	setTimeout(function () {
		$(".yellow").removeClass("yellow");

		linha.cells[COLUNA.ENDERECO].innerHTML = endereco;
		linha.cells[COLUNA.REALIZADO].innerHTML = realizado;

		if(numeroBitsPreditor == 1) {
			preditor1Bit(linha, realizado);
		} else {
			preditor2Bits(linha, realizado);
		}
		calculaPrecisaoGeral();
	}, 250);
}

let historicoGlobal = null;
let tamanhoHistoricoGlobal = 0;

function calculaPrecisaoGeral() {
	let precisaoGeral = 0;
	let numeroDePreditores = 0;
	$("#myTable tr").each(function (index, linha) {
		if(index == 0)
			return 1;
		
		let precisaoAtual = $(linha).find("td")[COLUNA.PRECISAO].innerHTML.replace("%","");
		if (precisaoAtual != 0) {
			precisaoGeral += Number(precisaoAtual);
			numeroDePreditores++;
		}
	});
	if(precisaoGeral != 0){
		$("#precisaoGeral").text((precisaoGeral/numeroDePreditores).toFixed(2)+"%");
	}
}

function executarGht(endereco, realizado) {
	let enderecoEmBinario = ((parseInt(endereco, 16)) >>> 2).toString(2);
	let indiceBin = enderecoEmBinario.substring(enderecoEmBinario.length - numeroBitsPC, enderecoEmBinario.length);
	realizadoNumber = 0;
	if(realizado == "T"){
		realizadoNumber = 1;
	}
	let historicoGlobalAtual = historicoGlobal + realizadoNumber;
	historicoGlobalAtual = historicoGlobalAtual.slice(1, historicoGlobalAtual.length);
	
	let indiceLinhaTabela = parseInt(historicoGlobal + indiceBin, 2);

	historicoGlobal = historicoGlobalAtual;

	historicoGlobal.split("").forEach(function(item, index){
		$("#tabelaHistoricoGlobal td")[index].innerHTML = item == 1 ? "T" : "N";
	});
	
	let linha = $("#myTable")[0].rows[indiceLinhaTabela + 1];

	$(".green").removeClass("green");
	$(".red").removeClass("red");
	$(linha).addClass("yellow");

	setTimeout(function () {
		$(".yellow").removeClass("yellow");

		linha.cells[COLUNA.ENDERECO].innerHTML = endereco;
		linha.cells[COLUNA.REALIZADO].innerHTML = realizado;

		if(numeroBitsPreditor == 1) {
			preditor1Bit(linha, realizado);
		} else {
			preditor2Bits(linha, realizado);
		}
		calculaPrecisaoGeral();
	}, 1000);
}

