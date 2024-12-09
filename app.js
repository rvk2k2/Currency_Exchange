const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");





for(let select of dropdowns){
    for (currencycode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currencycode;
        newoption.value = currencycode;
        if(select.name === "from" && currencycode ==="USD")
        {
            newoption.selected = "selected";
        } else if(select.name === "to" && currencycode ==="INR")
        {
            newoption.selected = "selected";
        }
        select.append(newoption);
        

    }

    select.addEventListener("change",(evt) => {
        updateflag(evt.target);
    });
}


const  updateExrate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval< 1){
        amtval = 1;
       amount.value ="1";
    }

    let finalfrom = fromcurr.value.toLowerCase();
    let finalto = tocurr.value.toLowerCase();
  

 
      const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
      const data = await response.json();
      
      const eurdata = data.eur;
      const fromtoeur = 1 / eurdata[finalfrom];
    //   console.log(fromtoeur);

      const eurtotarget = eurdata[finalto];
    //   console.log(eurtotarget);

      const rate = fromtoeur * eurtotarget;
    //   console.log(rate);

    finalamount = amtval * rate;
     msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value} `

}



const updateflag = (element) =>{

     let currencycode = element.value;
    let countrycode = countryList[currencycode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
};


window.document.addEventListener("click", () =>{
    updateExrate();

})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExrate();
    });


   

