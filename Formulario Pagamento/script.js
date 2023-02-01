// O que o usuário escrever nos inputs, vai ser passado para a 'imagem' do cartão
document.querySelector('.numero-cartao-input').oninput = () => {
    document.querySelector('.card-number-box').innerText = document.querySelector('.numero-cartao-input').value;
}

document.querySelector('.nome-titular-input').oninput = () => {
    document.querySelector('.card-holder-name').innerText = document.querySelector('.nome-titular-input').value;
}

document.querySelector('.mes-exp-input').oninput = () => {
    document.querySelector('.exp-month').innerText = document.querySelector('.mes-exp-input').value;
}

document.querySelector('.ano-exp-input').oninput = () => {
    document.querySelector('.exp-year').innerText = document.querySelector('.ano-exp-input').value;
}

document.querySelector('.cvv-input').onfocus = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onblur = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () => {
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

let bandeiraFinal;
let valido = true;
document.getElementById('btn-enviar').value = "Finalizar Pagamento";
var spanInvalido = document.getElementsByClassName('invalid');
const inputs = document.querySelectorAll('input');
let isFormValid = false;


function detectar_cartao(digito) {
    digito = document.getElementById("numero-cartao").value

    // JCB
    jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$');
    // American Express
    amex_regex = new RegExp('^3[47][0-9]{0,}$');
    // Diners Club
    diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$');
    // Visa
    visa_regex = new RegExp('^4[0-9]{0,}$');
    // MasterCard
    mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$');
    // Maestro
    maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$');
    // Discover
    discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');


    valor = digito.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = valor.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {

        var bandeira = "";
        const imagemBandeira = document.getElementById("icone-bandeira");
        const imagemBandeiraFundo = document.getElementById("icone-bandeira-fundo");
        const LengthCvv = document.getElementById("cvv-seguranca");


        if (digito.match(jcb_regex)) {
            bandeira = "jcb";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/jcb-icon.png";
            imagemBandeiraFundo.src = "Resources/jcb-icon.png";
            LengthCvv.setAttribute('maxlength', 3);
            valido = true;
        }
        else if (digito.match(amex_regex)) {
            bandeira = "amex";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/amex-icon.png";
            imagemBandeiraFundo.src = "Resources/amex-icon.png";
            LengthCvv.setAttribute('maxlength', 4);
            valido = true;
        }
        else if (digito.match(diners_regex)) {
            bandeira = "diners_club";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/diners-icon.png";
            imagemBandeiraFundo.src = "Resources/diners-icon.png";
            LengthCvv.setAttribute('maxlength', 3);
            valido = true;
        }
        else if (digito.match(visa_regex)) {
            bandeira = "visa";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/visa-icon.png"
            imagemBandeiraFundo.src = "Resources/visa-icon.png"
            LengthCvv.setAttribute('maxlength', 3);
            valido = true;
        }
        else if (digito.match(mastercard_regex)) {
            bandeira = "mastercard";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/mastercard-icon.png";
            imagemBandeiraFundo.src = "Resources/mastercard-icon.png";
            LengthCvv.setAttribute('maxlength', 3);
            valido = true;
        }
        else if (digito.match(discover_regex)) {
            bandeira = "discover";
            bandeiraFinal = bandeira.toUpperCase();
            imagemBandeira.src = "Resources/discover-icon.png";
            imagemBandeiraFundo.src = "Resources/discover-icon.png";
            LengthCvv.setAttribute('maxlength', 3);
            valido = true;
        }
        else if (digito.match(maestro_regex)) {
            if (digito[0] == '5') {
                bandeira = "mastercard";
                bandeiraFinal = bandeira.toUpperCase();
                imagemBandeira.src = "Resources/mastercard-icon.png";
                imagemBandeiraFundo.src = "Resources/mastercard-icon.png";
                LengthCvv.setAttribute('maxlength', 3);
                valido = true;
            }
            else {
                bandeira = "maestro";
                bandeiraFinal = bandeira.toUpperCase();
                imagemBandeira.src = "Resources/maestro-icon.png";
                imagemBandeiraFundo.src = "Resources/maestro-icon.png";
                LengthCvv.setAttribute('maxlength', 3);
                valido = true;
            }
        }


        return parts.join(' ')

    } else {
        valido = false;
        return valor

    }

    onload = function () {
        document.getElementById('numero-cartao-input').oninput = function () {
            this.value = detectar_cartao(this.value)


        }
    }


}



function finalizar_pagamento() {
    event.preventDefault();
    var numeroCard = document.getElementById('numero-cartao').value;
    try{
        var numeroCartao = numeroCard.replace(/ /g, '',);
        console.log(numeroCartao, "deu certo", numeroCartao.length + " numeros");
    }catch{console.log("erro")}
    
    var nomeTitular = document.getElementById('nome-titular').value;
    var mesExpiracao = document.getElementById('mes-expir').value;
    var anoExpiracao = document.getElementById('ano-expir').value;
    var numeroCvv = document.getElementById('cvv-seguranca').value;
    var parcelas = document.getElementById('parcela').value;
    var bandeira = bandeiraFinal;


    var submitButton = document.getElementById('btn-enviar');




        if (numeroCartao.length <= 15 | valido != true) {
            spanInvalido[0].setAttribute('style', 'visibility: visible');
            inputs[0].setAttribute('style', 'border-color: red');
            isFormValid = false;
        } else if(numeroCartao.length == 16 && valido == true) {
            isFormValid = true;
            spanInvalido[0].setAttribute('style', 'visibility: hidden');
            inputs[0].setAttribute('style', 'border-color: black');
        }

        if (nomeTitular == '' | nomeTitular.length <= 5) {
            spanInvalido[1].setAttribute('style', 'visibility: visible');
            inputs[1].setAttribute('style', 'border-color: red');
            isFormValid = false;
        } else if(nomeTitular.length >= 6) {
            isFormValid = true;
            spanInvalido[1].setAttribute('style', 'visibility: hidden');
            inputs[1].setAttribute('style', 'border-color: black');
        }

        if (mesExpiracao.value == 'month') {
            isFormValid = false;
        } else { isFormValid = true; }

        if (anoExpiracao.value == 'year') {
            isFormValid = false;
        } else { isFormValid = true; }

        if (numeroCvv.length <= 2) {
            spanInvalido[2].setAttribute('style', 'visibility: visible');
            inputs[2].setAttribute('style', 'border-color: red');
            isFormValid = false;
        } else if(numeroCvv.length >= 3) {
            isFormValid = true;
            spanInvalido[2].setAttribute('style', 'visibility: hidden');
            inputs[2].setAttribute('style', 'border-color: black');
        }

        if (isFormValid == false) {
            return;
        } else {
           
             submitButton.value = "Enviando...";

                console.log('\n Número do cartão:' + numeroCartao + "\n Bandeira:" + bandeira + "\n Nome do Titular: " + nomeTitular + "\n Mês de expiração: " + mesExpiracao + "\n Ano de Expiração: " + anoExpiracao
                    + "\n Número de Segurança: " + numeroCvv + "\n Parcelas: " + parcelas)
            }
 
}

