const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) {
        return null
    }

    const reducer = (max, current) => {
        if(current.likes > max.likes){
            max = current
        }
        return max
      }

    return blogs.reduce(reducer, blogs[0])
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }