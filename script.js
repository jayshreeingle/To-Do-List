function getAndUpdate(){
    console.log('Updating List');
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if(localStorage.getItem('itemsJson')==null){
        itemJsonArr = [];
        itemJsonArr.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArr));
    }
    else{
        itemJsonArrStr = localStorage.getItem('itemsJson');
        itemJsonArr = JSON.parse(itemJsonArrStr);
        itemJsonArr.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArr));
    }
    update();
}

function update(){
    if(localStorage.getItem('itemsJson')==null){
        itemJsonArr = [];
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArr));
    }
    else{
        itemJsonArrStr = localStorage.getItem('itemsJson');
        itemJsonArr = JSON.parse(itemJsonArrStr);
    }
    //Populate table
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArr.forEach((element,index) => {
        str += `
            <tr>
                <td>${index+1}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><input type="checkbox" name="status" id="status"></td>
                <td><button class="btn-sm" onclick="deleted(${index})">Delete</button></td>
            </tr>
        `;
    });
    tableBody.innerHTML = str;
}

let add = document.getElementById('add');
add.addEventListener("click",getAndUpdate);
update();

//To delete the list element
function deleted(itemIndex){
    console.log('Delete',itemIndex+1);
    itemJsonArrStr = localStorage.getItem('itemsJson');
    itemJsonArr = JSON.parse(itemJsonArrStr);

    //delete element
    itemJsonArr.splice(itemIndex,1);
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArr));
    update();
}

//To clear the entire list
function clearStorage(){
    if(confirm("Do you really want to clear the list?")){
        console.log("Clearing the storage");
        localStorage.clear();
        update();
    }
}
