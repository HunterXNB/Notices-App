import { db } from "./config"
import moment from "moment"
export function renderData() {
    db.collection("main").orderBy("date", "desc").get().then(col => {
        let fetched = col.docs.map(el => {
            const ell = el.data()
            return { title: ell.title, id: el.id, text: ell.text, date: ell.date }
        })

        document.querySelector(".container .data").innerHTML = ""
        fetched.forEach((el) => {
            const heading = document.createElement("h2")
            const headingTxt = document.createTextNode(`${el.title}`)
            heading.appendChild(headingTxt)
            const content = document.createElement("p")
            const contentTxt = document.createTextNode(`${el.text}`)
            const deleteBtn = document.createElement("span")
            const deleteX = document.createTextNode("X")
            deleteBtn.appendChild(deleteX)
            deleteBtn.dataset.id = `${el.id}`
            content.appendChild(contentTxt)
            deleteBtn.classList.add("delete")
            const notice = document.createElement("div")
            notice.classList.add("notice")
            const holder = document.createElement("div")
            holder.append(heading, content)
            notice.dataset.date = `${el.date.seconds * 1000}`
            notice.dataset.id = el.id
            notice.append(holder, deleteBtn)

            document.querySelector(".container .data").append(notice)
        })
    })
    db.collection("date").onSnapshot(snap => {
        let fetched = snap.docs.map(el => el.data().date.seconds * 1000)
        document.querySelector(".time").textContent = `Last edit ${moment(...fetched).toNow().replace("in", "")} ago`

        setInterval(() => {
            document.querySelector(".time").textContent = `Last edit ${moment(...fetched).toNow().replace("in", "")} ago`

        }, 60000)

    })

}