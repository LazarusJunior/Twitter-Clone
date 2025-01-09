async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const userSelect = document.getElementById('userSelect');
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    // Set default user
    displayUserInfo(users[0]);
    fetchPosts(users[0].id);

    userSelect.addEventListener('change', (e) => {
        const selectedUser = users.find(user => user.id == e.target.value);
        displayUserInfo(selectedUser);
        fetchPosts(selectedUser.id);
    });
}

function displayUserInfo(user) {
    document.querySelector('.profile-name').textContent = user.name;
    document.querySelector('.profile-username').textContent = `@${user.username}`;
    document.querySelector('.profile-website').textContent = user.website;
    document.querySelector('.profile-bio').textContent = user.company.catchPhrase;
    document.querySelector('.profile-location').textContent = user.address.city;
}

async function fetchPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    displayPosts(posts);
    if (posts.length > 0) {
        fetchComments(posts[0].id);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="./profile.jpg" alt="Avatar" class="post-avatar">
            <div class="post-content">
                <div class="post-header">
                    <strong>${post.title}</strong>
                    <span class="verified-badge">✓</span>
                    <span class="twitter-icon">𝕏</span>
                </div>
                <p>${post.body}</p>
                <div class="engagement">
                    <span>💬 200</span>
                    <span>🔄 200</span>
                    <span>❤️ 200</span>
 
        `;
         postElement.onclick = () => fetchComments(post.id);
        postsContainer.appendChild(postElement);
    });
}

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();
    displayComments(comments);
}

function displayComments(comments) {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = `<div class="comments-header">Post ${comments[0]?.postId} Comments</div>`;

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <img src="/profile.jpg" alt="Avatar" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <strong>${comment.name}</strong>
                    <span class="verified-badge">✓</span>
                    <span class="twitter-icon">𝕏</span>
                </div>
                <p>${comment.body}</p>
                <div class="engagement">
                    <span>💬 0</span>
                    <span>🔄 0</span>
                    <span>❤️ 0</span>
                </div>
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

fetchUsers();
