document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(1);
});

async function fetchUsers(page) {
    const userContainer = document.getElementById('userContainer');
    const spinner = document.getElementById('spinner');
    userContainer.innerHTML = '';
    spinner.style.display = 'block';
    
    try {
        const response = await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
        const data = await response.json();
        displayUsers(data.data);
    } catch (error) {
        userContainer.innerHTML = '<p>Error loading users. Please try again.</p>';
    } finally {
        spinner.style.display = 'none';
    }
}

function displayUsers(users) {
    const userContainer = document.getElementById('userContainer');
    const colors = ['#8cc759cc', '#8c6dafcc', '#ef5d74cc', '#f9a74bcc', '#60beebcc', '#fbef5acc'];
    
    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.style.backgroundColor = colors[index % colors.length];
        userCard.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name}" style="border-radius: 10px; margin: 5px;" width="100" height="100">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        `;
        userContainer.appendChild(userCard);
    });
}


