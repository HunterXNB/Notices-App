import "./styles/main.scss"
import moment from "moment"
import addToDB from "./addToDB"
import { db } from "./config"

const cancelButton = document.querySelector("#cancel")
const title = document.querySelector("#title")
const text = document.querySelector("#text")
const form = document.querySelector("form")
const formTime = document.querySelector(".form-time")
let tit, cond
window.addEventListener("load", async () => {
    await db.collection("exp").limit(1).get().then(query => cond = query.size)

    if (cond) {
        await db.collection("exp").get().then(col => {
            const fetched = col.docs.map(el => el.data())
            title.value = fetched[0].title
            tit = fetched[0].id
            text.value = fetched[0].text

            formTime.textContent = `Edited ${moment(fetched[0].date.seconds * 1000).toNow()}`
        })
    }
})
cancelButton.addEventListener("click", (e) => {
    e.preventDefault()
    location.assign("./index.html")
})
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (title.value == "" || text.value == "") {
        alert("Please fill the fields")
    } else {
        if (cond) {


            await db.collection("main").doc(tit).delete()

            await db.collection("exp").doc("exp").delete()

        }
        addToDB(title.value, text.value)
    }
})