class BHT{
	constructor(numeroBitsPC, n){
		this.numeroBitsPC = numeroBitsPC;
		this.address = Array();
		this.pred = Array();
		this.hist = Array();
		this.hits = Array();
		this.miss = Array();
	}

	executar(endereco, resultado){
		let predicao = 0;
		if(!this.address.includes(endereco)){
			this.address.push(endereco);
			this.pred.push(2);
		}
		let pos = ((parseInt(endereco, 16) >>> 2) % Math.pow(2,this.numeroBitsPC)) + 1;
		console.log(pos);
		predicao = this.pred[pos];
		document.getElementById("myTable").rows[pos].cells[3].innerHTML=resultado;
		let end = document.getElementById("myTable").rows[pos].cells[1].innerHTML;
		console.log(end);
		if(endereco !== end){
			predicao=2;
			this.pred[pos]=2;
		}
		console.log("Predicao: "+predicao);
		console.log("Resultado: "+resultado);
		if ((predicao <= 1 && resultado == 'N') || (predicao >= 2 && resultado == 'T')){
			if(predicao == 1){
				this.pred[pos] -= 1;
			} else if (predicao == 2){
				this.pred[pos] += 1;
			}
			this.hits[pos] += 1;
		} else {
			if(predicao == 0){
				this.pred[pos] += 1;
			} else if (predicao == 1){
				this.pred[pos] += 2;
			} else if (predicao == 2){
				this.pred[pos] -= 2;
			} else {
				this.pred[pos] -= 1;
			}
			this.miss[pos] += 1;
		}
		if(this.pred[pos]==0){
			this.hist[pos]="N,N";
		}
		else if(this.pred[pos]==1){
			this.hist[pos]="N,T";
		}
		else if(this.pred[pos]==2){
			this.hist[pos]="T,N";
		}
		else{
			this.hist[pos]="T,T";
		}
		document.getElementById("myTable").rows[pos].cells[1].innerHTML=endereco;
		(predicao<=1) ? predicao="NT" : predicao="T";
		document.getElementById("myTable").rows[pos].cells[4].innerHTML=predicao;
		document.getElementById("myTable").rows[pos].cells[2].innerHTML= this.hist[pos];
	}

	getPercent(){
		return parseInt(this.hits/(this.hits + this.miss)*100);
	}

	getHits(){
		return this.hits;
	}

	getMiss(){
		return this.miss;
	}
}

let bht;
let linhasDoArquivo = Array();
let linhaAtualIndice = -1;
let linhaAtual;
let flagFimDoArquivo = false;

function lerArquivo(){
	let file = $('#file-id').prop('files')[0];;
	let reader = new FileReader();
	reader.onload = function(){
		linhaAtualIndice = -1;
		linhasDoArquivo = this.result.split('\n');
	};
	reader.readAsText(file);
}

function executaProximaLinha(){ 
	linhaAtual = linhasDoArquivo[linhaAtualIndice].split(' ');
	bht.executar(linhaAtual[0], linhaAtual[1]);
}

function iniciarPreditor(){
	$(".menu").hide();
	$("#menu-2").show();
	
	let table = $("#myTable")[0];
	let numeroBitsPC = $("#numeroBitsPC").val();
	let n = $("#n").val();
	let m2 = 1;

	lerArquivo();
	
	bht = new BHT(numeroBitsPC, n);
	
	for (let i=0; i<numeroBitsPC; i++){
		m2*=2;
	}
	
	for (let i=0; i<m2; i++){
		let row = table.insertRow(table.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		
		let e = 0;
		let aux = i;
		
		for (let j=0; j<numeroBitsPC; j++){
			e += aux % 2 * Math.pow(10,numeroBitsPC);
			aux=parseInt(aux/2);
			e=parseInt(e/10);
		}
		
		cell1.innerHTML = e;
		cell2.innerHTML = "";
		cell3.innerHTML = "T,N";
		cell4.innerHTML = "";
		cell5.innerHTML = "";
	}
}

function proximaExecutacao(){
	linhaAtualIndice += 1;
	if (linhaAtualIndice >= linhasDoArquivo.length){
		flagFimDoArquivo = true;
	} else {
		executaProximaLinha();
		flagFimDoArquivo = false;
	}
}