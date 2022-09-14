document.addEventListener("DOMContentLoaded", function () {
  let users = [
    {
      "id": "1215",
      "name": "Arshil M Vahora",
      "email": "kdsfnefmkenemkgn@nrg.comk",
      "address": "kgkrgrogn,rgrj grgjrngkrjbgkr g rgirngjrngkrjbgrm gr grg",
      "city": "anand",
      "state": "gujarat",
      "pin code": "388001",
      "contact number": "95495845944",
      "google pay number": "803538530538",
      "UPI id": "rkgrjrngrgr rrgrngk grgkrng",
      "date": "9 september",
      "time": "12:92pm",
      "status": "approved"
    },
    {
      "id": "1215",
      "name": "Arshil M Vahora",
      "email": "kdsfnefmkenemkgn@nrg.comk",
      "address": "kgkrgrogn,rgrj grgjrngkrjbgkr g rgirngjrngkrjbgrm gr grg",
      "city": "anand",
      "state": "gujarat",
      "pin code": "388001",
      "contact number": "95495845944",
      "google pay number": "803538530538",
      "UPI id": "rkgrjrngrgr rrgrngk grgkrng",
      "date": "9 september",
      "time": "12:92pm",
      "status": "approved"
    }
  ]
  let parent = document.getElementById("users")
  for (let i = 0; i < users.length; i++) {
    let user_container = document.createElement("div");
    user_container.classList.add("user_container", "mb-30");

    let element = document.createElement("span");
    element.classList.add("mb-2");
    element.innerHTML = "Login ";
    user_container.appendChild(element);

    element = document.createElement("b")
    element.innerHTML = "#" + users[i].id;
    user_container.appendChild(element);

    let request_information = document.createElement("div");
    request_information.classList.add("request_information", "mb-2")
    element = document.createElement("span");
    element.classList.add("mb-2");
    element.innerHTML = users[i].date + " " + users[i].time;
    request_information.appendChild(element);

    let approval_status = document.createElement("div")
    approval_status.classList.add("approval_status");
    element = document.createElement("label");
    element.innerHTML = "Approval Status : ";
    approval_status.appendChild(element);
    element = document.createElement("span");
    if (users[i].status === "approved") {
      element.classList.add("green");
      element.innerHTML = " Approved";
    }
    else {
      element.classList.add("red");
      element.innerHTML = " Denied";
    }
    approval_status.appendChild(element);
    request_information.appendChild(approval_status);

    user_container.appendChild(request_information);
    let user_details = document.createElement("div");
    user_details.classList.add("user_details", "mb-2");
    
    let need = ["Name", "Email", "Address", "City", "State", "Pin code", "Contact number", "Google pay number", "UPI id",]
    let details = Object.keys(users[i]).filter(key => need.includes(key[0].toUpperCase() + key.slice(1)))
      .reduce((obj, key) => {
        obj[key[i].toUpperCase() + key.slice(1)] = users[0][key];
        return obj;
      }, {})
    for(let key in details)
    {
      let information = document.createElement("div");
      information.classList.add("information");
      element = document.createElement("span");
      element.classList.add("title");
      element.innerHTML=key;
      information.appendChild(element);

      element = document.createElement("span");
      element.classList.add("detail")
      element.innerHTML= " : " + details[key];
      information.appendChild(element);
      user_details.appendChild(information);
    } 
    user_container.appendChild(user_details);
    element = document.createElement("button");
    if (users[i].status === "approved") {
      element.innerHTML = "Deny";
    }
    else {
      element.innerHTML = "Approve";
    }
    user_container.appendChild(element);

    parent.appendChild(user_container)
  }

})