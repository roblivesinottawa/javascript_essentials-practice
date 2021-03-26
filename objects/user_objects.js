let user = {
    name: "Steve Rogers",
    age: 96,
    email: "steve@email.com",
    location: "New York",
    blogs: [
            { title: 'the 1940s were the best', likes: 30},
            { title: 'I love America', likes: 60}
    ],

    // define methods
    login() {
        console.log('the user logged in')
    },
    logout() {
        console.log('the user logged out')
    },
    logBlogs() {
        console.log('the user has written the folowing blogs:')
        this.blogs.forEach(blog => console.log(blog.title, blog.likes))
    }
}

user.login()
user.logout()
user.logBlogs()
console.log(user)