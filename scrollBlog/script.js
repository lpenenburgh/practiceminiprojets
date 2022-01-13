const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


// 3 post limit
let limit = 5;
// default page (#1)
let page = 1;


//fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

// Show posts in DOm
async function showPosts() {
    const posts = await getPosts();

    // console.log(posts);
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

//Show loader and fetch more posts
// setTimeout to remove show class so the dots dont stay there bouncing
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        // loading the next group of posts
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

//show initial posts
showPosts();

// scrollTop = length from the top to where you're scrolling at
// scrollHeight = height of the element
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} =
    document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
});