import { db } from "./config";
let cond
export default async function addToDB(title, text) {
    db.collection("main").get().then(async (cols) => {
        let fetched = cols.docs.map(el => {
            return { title: el.data().title, id: el.id }
        })
        let data = fetched.find(el => el.title === title)
        if (data) {

            cond = confirm("You are trying to modify an existing note are You sure ?")
            if (cond) {
                await db.collection("main").doc(data.id).set({ title, date: new Date(), text })
                await db.collection("date").doc("date").set({ date: new Date() })
                location.assign("./index.html")
            }
            else {
                location.assign("./index.html")
            }



        } else {

            await db.collection("main").add({ text: text.trim(), date: new Date(), title })
            await db.collection("date").doc("date").set({ date: new Date() })
            location.assign("./index.html")



        }


    })
}