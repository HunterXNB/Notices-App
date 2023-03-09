import { db } from "./config";

export default async function openform() {
    await db.collection("exp").doc("exp").delete()

    location.assign("./form.html")
}