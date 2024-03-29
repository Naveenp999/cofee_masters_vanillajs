import {getProduct} from "../services/service.js";
import {addToCart} from "../services/cart.js";


export class detailspage extends HTMLElement{ 
    constructor(){
        super();


        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("details-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);    

        const styles=document.createElement("style");

        async function loadCSS() {
            const request = await fetch("./components/DetailsPage.css");
            styles.textContent = await request.text();
        }
        loadCSS();  

        this.root.appendChild(styles);
    }

    async rendor(){
            this.product=await getProduct(this.dataset.productId);
            if(this.product){
                this.root.querySelector("h2").textContent = this.product.name;
                this.root.querySelector("img").src = `/data/images/${this.product.image}`;
                this.root.querySelector(".description").textContent = this.product.description;
                this.root.querySelector(".price").textContent = `$ ${this.product.price.toFixed(2)} ea`
                this.root.querySelector("button").addEventListener("click", ()=> {
                    addToCart(this.product.id);
                    app.router.go('/order');
                });
            }
        else{
            alert("Invalid Id");
        }
    }

    connectedCallback(){
        this.rendor();
    }

};

customElements.define("details-page",detailspage);