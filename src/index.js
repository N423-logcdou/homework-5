import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, where, query } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAkOmRBIrS0ALZKZB5fPfAvgMVBabqC_SY",
    authDomain: "logcdoug-fb.firebaseapp.com",
    projectId: "logcdoug-fb",
    storageBucket: "logcdoug-fb.appspot.com",
    messagingSenderId: "599654783924",
    appId: "1:599654783924:web:bb770925b9c5374b53f0e1",
    measurementId: "G-PSV6CK7MW8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var addAlbumBtn = document.getElementById("addAlbum")
var getQueryBtn = document.getElementById("getQueryButton");

getQueryBtn.addEventListener("click", queryData);
addAlbumBtn.addEventListener("click", addAlbumToDB);

function addAlbumToDB() {
    let title = document.getElementById("title").value;
    let artist = document.getElementById("artist").value;
    let img = document.getElementById("img").value;
    let genre = document.getElementById("genre").value;

    let album = {
        title: title,
        artist: artist,
        photo: img,
        genre: genre
    }

    addData(album);
}

async function addData(album) {
    try {
        const docRef = await addDoc(collection(db, "Albums"), album);
        console.log("Doc id: ", docRef.id);
        // clears the fields
        document.getElementById("title").value = "";
        document.getElementById("artist").value = "";
        document.getElementById("img").value = "";
        document.getElementById("genre").value = "";

        getAllData();
    } catch (e) {
        console.log(e);
    }
}

async function queryData() {
    let searchGenre = $("#query-input").val();
    const q = query(collection(db, "Albums"), where("genre", "==", searchGenre));
    $("#albumQuery").html("");
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
        let htmlStr = "";
        querySnapshot.forEach((doc) => {
            htmlStr += `<div class="album-item">
            <img src="${doc.data().photo}">
            <p class="name">Title: ${doc.data().title}</p>
            <p class="name">Artist: ${doc.data().artist}</p>
            <p class="name">Genre: ${doc.data().genre}</p>
            </div>`
        })
        $("#albumQuery").html(htmlStr);
    } else {
        console.log("no data")
    }
}

async function getAllData() {
    $("#albumQuery").html("");
    // gets all the data from the collection
    const querySnapshot = await getDocs(collection(db, "Albums"));
    let htmlStr = "";
    querySnapshot.forEach((doc) => {
        htmlStr += `<div class="album-item">
        <img src="${doc.data().photo}">
        <p class="name">Title: ${doc.data().title}</p>
        <p class="name">Artist: ${doc.data().artist}</p>
        <p class="name">Genre: ${doc.data().genre}</p>
        </div>`
    });
    $("#albumQuery").html(htmlStr);
}

$(document).ready(function () {
    getAllData();
})

