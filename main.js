function displayPaymentInfo() {
    //displays payment info including wallet link and qr code to user based off their input and the cointext api
    var phoneNumber = document.getElementById("phoneNumber").value;
    var errorField = document.getElementById("error");
    var amount = document.getElementById("amount").value;
    var QRCodeImage = document.getElementById("QRCode");
    var scanMessage = document.getElementById("scanMessage");
    var openWallet = document.getElementById("openInWallet");

    if (phoneNumber.toString()[0] == "+"){
        phoneNumber = phoneNumber.slice(1);
    }

    //Check that both fields are populated.
    if (!(amount && phoneNumber)){
        errorField.innerHTML = "Please fill in both fields.";
        setTimeout(function(){document.getElementById("error").innerHTML="";}, 5000);
    }

    else if (isNaN(phoneNumber)){
        errorField.innerHTML = "Please only enter numbers with no spaces into telephone number field.";
        setTimeout(function(){document.getElementById("error").innerHTML="";}, 5000);
    }

    else if (isNaN(amount)){
        errorField.innerHTML = "Please only enter number into the amount field.";
        setTimeout(function(){document.getElementById("error").innerHTML="";}, 5000);
    }

    else {
        var errorFree = true; //to remove need to code rest of the function indented under this else {}
    }

    if (!errorFree){
        return; //the following code will only run if no errors above were detected
    }
    
    bchAmount = getBCHAmount();
    var url = "https://pay.cointext.io/p/" + phoneNumber + "/" + (bchAmount*100000000).toString();
    console.log(url);

    QRCodeImage.src = url;
    openWallet.href = "bitcoincash:?r=" + url;
    QRCodeImage.style.display = "block";
    scanMessage.style.display = "block";
    openWallet.style.display = "block";
    
}

function getBCHAmount(){
    //Returns BCH value of amount of currency specified in amount field based off exchange rate between selected currencyMenu currency and BCH
    var currencyMeny = document.getElementById("currencyMenu");
    var amount = document.getElementById("amount").value;
    var selectedCurrency = currencyMeny.options[currencyMeny.selectedIndex].value

    if (selectedCurrency == "bch"){
        var exchangeRate = 1;
    }
    else if (selectedCurrency == "usd"){
        var req = new XMLHttpRequest();
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=USD'; 
        req.open('GET', url, false);
        req.send(null);
        var jsonResponse = JSON.parse(req.responseText);
        var exchangeRate = 1/jsonResponse["bitcoin-cash"]["usd"];
    }
    
    return exchangeRate * amount; //returns BCH value of the currency speified by user
}
