 const resultView = document.getElementById("result");
        const filterText = document.getElementById("filter");
       const listItem = []; // empty array
        getData();

      async  function getData() {
        // fetch data from the API
        // await = loading for data
       const result = await fetch('https://randomuser.me/api/?results=50');
         
       const { results} =  await result.json();

       resultView.innerHTML = ""; // clear previous results 
     
        // Loop through the data and create list items
        results.forEach(user => {                       
            const li  = document.createElement("li");
            listItem.push(li);
            // create list item with user data
              // display user name 
               // display user location
            li.innerHTML = `       
                    <img src="${user.picture.large}" alt="${user.name.first}">
                <div class="user-info">   
                    <h4> <a class="fa-solid fa-user-plus" id="delete-icon"></a>${user.name.first} ${user.name.last}  </h4> 
                    <p> ${user.location.city}, ${user.location.country} </p>
                                        
                </div>
            `;
            resultView.appendChild(li); // append list item to the result view
        });
        }  
        //  fliter the fined user
        filterText.addEventListener("input", (e)=> filterData(e.target.value));
           
        function filterData(inputText) {
               listItem.forEach(item => {
              if(item.innerText.toLowerCase().includes(inputText.toLowerCase())){

                    item.classList.remove('hide');
                }else {
                    item.classList.add('hide' + "No user found");
                }
               })
        }