import "./styles/main.scss"
import { renderData } from "./Render data"

import { db } from "./config"
import openform from "./openForm"
const openForm = document.querySelector(".open-form")
const data = document.querySelector(".data")

let cond = true


setInterval(() => {
    let notices = document.querySelectorAll(".notice")
    cond = false
    notices.forEach(el => {
        el.addEventListener("click", async function (e) {
            if (e.target.classList.contains("delete")) {
                await db.collection("main").doc(e.target.dataset.id).delete()
                await db.collection("date").doc("date").set({ date: new Date() })

                renderData()
                cond = true
            } else {
                const data = { title: this.querySelector("h2").textContent, text: this.querySelector("p").textContent, id: this.dataset.id, date: new Date(+this.dataset.date) }
                await db.collection("exp").doc("exp").set(data)
                location.assign("./form.html")

            }


        })
    })
}, cond && 1000);
openForm.addEventListener("click", openform)
renderData()

db.collection("main").get().then(cols => {
    cols.docs.forEach(el => {
        console.log(el.data())
    })
})