function showList() {
    axios.get("http://localhost:8080/api/products").then(x => {
        let str = `<table>
<th>Name</th>
<th>price</th>
<th>Category</th>`;
        let list = x.data;
        for (const item of list) {
            str += `<tr>
<td>${item.name}</td>
<td>${item.price}</td>
<td>${item.category.name} </td>
<td><button onclick="showFormEdit(${item.id})">Edit</button></td>
<td><button onclick="deletes(${item.id})">Delete</button></td>
</td>
</tr>`
        }
        str += `</table>`
        document.getElementById('main').innerHTML = str;
    })
    axios.get("http://localhost:8080/api/categories").then(y => {
        let str = `<table>`
        for (const cate of y.data) {
            str += `<tr>
<td>
<button onclick="searchCate(${cate.id})">${cate.name}</button>
</td>
</tr>`
        }
        str += `</table>`
        document.getElementById('cate').innerHTML = str;
    })
}

function showFormAdd() {
    choiceCategory()
    document.getElementById("main").innerHTML =
        '<input type="text" id="name">'
        + '<input type="text" id="price">'
        + '<div type="text" id="choice"></div>' +
        '<button onclick="add()">Save</button>'

}

function add(id) {
    let data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        category: {
            id: document.getElementById('idCate').value
        }

    }
    axios.post('http://localhost:8080/api/products', data).then(() => {
        showList()
    })
}

function showFormEdit(id) {
    axios.get(`http://localhost:8080/api/products/${id}`).then(x => {
        choiceCategory()
        document.getElementById("main").innerHTML =
            `<input type="text" id="name" value="${x.data.name}">`
            + `<input type="text" id="price" value="${x.data.price}">`
            + `<div type="text" id="choice"></div>` +
            '<button onclick="edit(' + id + ')">Save</button>'
    })
}

function edit(id) {
    let data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        category: {
            id: document.getElementById('idCate').value
        }

    }
    axios.put(`http://localhost:8080/api/products/${id}`, data).then(() => {
        showList()
    })
}

function deletes(id) {
    axios.delete(`http://localhost:8080/api/products/${id}`).then(() => {
        alert("Xoas tc")
        showList()
    })

}

function choiceCategory() {
    axios.get(`http://localhost:8080/api/categories`).then(x => {
        let str = '<select id="idCate">';
        for (const item of x.data) {
            str += `<option value="${item.id} ">${item.name}</option>`
        }
        str += '</select>'
        document.getElementById("choice").innerHTML = str;
    })

}

function search() {
    name = document.getElementById("search").value;
    axios.get(`http://localhost:8080/api/products/search/${name}`).then(x => {
        let str = `<table>
<th>Name</th>
<th>price</th>
<th>Category</th>`;
        let list = x.data;
        for (const item of list) {
            str += `<tr>
<td>${item.name}</td>
<td>${item.price}</td>
<td>${item.category.name} </td>
<td><button onclick="showFormEdit(${item.id})">Edit</button></td>
<td><button onclick="deletes(${item.id})">Delete</button></td>
</td>
</tr>`
        }
        str += `</table>`
        document.getElementById('main').innerHTML = str;
    })
}

function searchCate(id) {
    axios.get(`http://localhost:8080/api/products/searchCate/${id}`).then(x => {
        let str = `<table>
<th>Name</th>
<th>price</th>
<th>Category</th>`;
        let list = x.data;
        for (const item of list) {
            str += `<tr>
<td>${item.name}</td>
<td>${item.price}</td>
<td>${item.category.name} </td>
<td><button onclick="showFormEdit(${item.id})">Edit</button></td>
<td><button onclick="deletes(${item.id})">Delete</button></td>
</td>
</tr>`
        }
        str += `</table>`
        document.getElementById('main').innerHTML = str;
    })
}
