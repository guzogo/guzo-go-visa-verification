import { db } from "./firebase.js";
import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
let applicants = [];
updateStats();
displayApplicants();

function generateId() {
    return "VG" + Math.floor(100000 + Math.random() * 900000);
}

async function generateApplicant() {

    let today = new Date();

    let issueDate = today.toLocaleDateString("en-GB");

    let expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 2);

    let expiryDate = expiry.toLocaleDateString("en-GB");

    let applicant = {

        id: generateId(),

        name: document.getElementById("name").value,

        passport: document.getElementById("passport").value,

        dob: document.getElementById("dob").value,

        issueDate: issueDate,

        expiryDate: expiryDate,

        country: document.getElementById("country").value,

        type: document.getElementById("type").value,

        status: document.getElementById("status").value,

        photo: document.getElementById("photo").value,

        date: today.toISOString().split("T")[0]

    };

    await addDoc(collection(db, "applicants"), applicant);

    

    document.getElementById("photoPreview").innerHTML = `
    <div style="text-align:center;margin-top:20px;">
        <img
        src="${applicant.photo || 'https://via.placeholder.com/150'}"
        style="
        width:150px;
        height:150px;
        border-radius:50%;
        object-fit:cover;
        border:4px solid #003366;
        ">
    </div>
    `;

    await loadApplicants();

    alert(
`Applicant Created

ID: ${applicant.id}

Name: ${applicant.name}

Passport: ${applicant.passport}`
    );
}

function updateStats(){

let total = applicants.length;

let approved =
applicants.filter(a => a.status === "Approved").length;

let processing =
applicants.filter(a => a.status === "Processing").length;

let rejected =
applicants.filter(a => a.status === "Rejected").length;

document.getElementById("stats").innerHTML = `
<div style="
display:grid;
grid-template-columns:repeat(2,1fr);
gap:10px;
margin-top:15px;
">

<div class="info-card">
<h3>Total</h3>
<p>${total}</p>
</div>

<div class="info-card">
<h3>Approved</h3>
<p>${approved}</p>
</div>

<div class="info-card">
<h3>Processing</h3>
<p>${processing}</p>
</div>

<div class="info-card">
<h3>Rejected</h3>
<p>${rejected}</p>
</div>

</div>
`;

}

function displayApplicants(){

let html = `
<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Country</th>
<th>Status</th>
<th>Action</th>
</tr>
`;

applicants.forEach(a => {

html += `
<tr>
<td>${a.id}</td>
<td>${a.name}</td>
<td>${a.country}</td>
<td>${a.status}</td>
<td>
<button onclick="deleteApplicant('${a.id}')">
Delete
</button>
</td>
</tr>
`;

});

html += "</table>";

document.getElementById("applicantList").innerHTML = html;

}

function searchApplicant(){

let id =
document.getElementById("searchInput").value.trim();

let applicant =
applicants.find(a => a.id === id);

if(applicant){

document.getElementById("searchResult").innerHTML = `

<div class="info-card">

<img
src="${applicant.photo || 'https://via.placeholder.com/150'}"
style="
width:120px;
height:120px;
border-radius:50%;
object-fit:cover;
display:block;
margin:auto;
">

<h3 style="text-align:center;margin-top:10px;">
${applicant.name}
</h3>

<p><b>Visa ID:</b> ${applicant.id}</p>

<p><b>Passport No:</b> ${applicant.passport}</p>

<p><b>Date of Birth:</b> ${applicant.dob}</p>

<p><b>Country:</b> ${applicant.country}</p>

<p><b>Visa Type:</b> ${applicant.type}</p>

<p><b>Status:</b> ${applicant.status}</p>

<p><b>Issue Date:</b> ${applicant.issueDate}</p>

<p><b>Expiry Date:</b> ${applicant.expiryDate}</p>

</div>

`;

}else{

document.getElementById("searchResult").innerHTML =
"<p style='color:red'>Applicant Not Found</p>";

}

}


async function deleteApplicant(id){

if(!confirm("Delete this applicant?")){
return;
}

alert("Delete will be completed in the next step.");

await loadApplicants();

}
async function loadApplicants() {

    const snapshot = await getDocs(collection(db, "applicants"));

    applicants = [];

    snapshot.forEach((doc) => {
        applicants.push({
            firestoreId: doc.id,
            ...doc.data()
        });
    });

    updateStats();
    displayApplicants();
}

loadApplicants();
window.generateApplicant = generateApplicant;
window.searchApplicant = searchApplicant;
window.deleteApplicant = deleteApplicant;
