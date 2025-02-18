function validarBandeiraCartao(numeroCartao) {
    // Remove espaços e caracteres não numéricos
    numeroCartao = numeroCartao.replace(/\D/g, '');

    // Verifica se o número é válido usando o algoritmo de Luhn
    if (!validarLuhn(numeroCartao)) {
        return "Número de cartão inválido";
    }

    // Verifica a bandeira com base nos prefixos
    if (/^4/.test(numeroCartao)) {
        return "Visa";
    } else if (/^5[1-5]/.test(numeroCartao)) {
        return "Mastercard";
    } else if (/^3[47]/.test(numeroCartao)) {
        return "American Express";
    } else if (/^6(?:011|5)/.test(numeroCartao) || /^622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|91[0-9]|92[0-5])/.test(numeroCartao) || /^64[4-9]/.test(numeroCartao)) {
        return "Discover";
    } else if (/^3(?:0[0-5]|[68])/.test(numeroCartao)) {
        return "Diners Club";
    } else if (/^(?:2131|1800|35\d{3})/.test(numeroCartao)) {
        return "JCB";
    } else if (/^(2014|2149)/.test(numeroCartao)) {
        return "EnRoute";
    } else if (/^8699/.test(numeroCartao)) {
        return "Voyager";
    } else if (/^(38|60)/.test(numeroCartao)) {
        return "HiperCard";
    } else if (/^50/.test(numeroCartao)) {
        return "Aura";
    } else {
        return "Bandeira desconhecida";
    }
}

function validarLuhn(numero) {
    let soma = 0;
    let deveDobrar = false;

    // Percorre o número do cartão de trás para frente
    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero.charAt(i), 10);

        if (deveDobrar) {
            digito *= 2;
            if (digito > 9) {
                digito = digito - 9;
            }
        }

        soma += digito;
        deveDobrar = !deveDobrar;
    }

    // O número é válido se a soma for múltipla de 10
    return soma % 10 === 0;
}

// Exemplo de uso:
console.log(validarBandeiraCartao("4111111111111111")); // Visa
console.log(validarBandeiraCartao("6011000990139424")); // Discover
console.log(validarBandeiraCartao("869940758123456")); // Voyager
console.log(validarBandeiraCartao("3841000000000005")); // HiperCard
console.log(validarBandeiraCartao("5066991111111118")); // Aura
console.log(validarBandeiraCartao("2014000000000009")); // EnRoute
