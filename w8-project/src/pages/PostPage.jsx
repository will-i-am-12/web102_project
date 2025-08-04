import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import './PostPage.css'

const PostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch post and comments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch post
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select()
          .eq("id", id)
          .single()

        if (postError) throw postError
        setPost(postData)

        // Fetch comments
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select()
          .eq("post_id", id)
          .order("created_at", { ascending: false })

        if (commentsError) throw commentsError
        setComments(commentsData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load post data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // Upvote handler
  const handleUpvote = async () => {
    if (!post) return

    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ upvotes: post.upvotes + 1 })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      setPost(data)
    } catch (err) {
      console.error("Error upvoting:", err)
    }
  }

  // Delete handler
  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)
      if (error) throw error
      navigate("/")
    } catch (err) {
      console.error("Error deleting post:", err)
    }
  }

  // Comment submission handler
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const { error } = await supabase
        .from("comments")
        .insert([{ content: comment, post_id: id }])
      if (error) throw error

      setComment("")

      // Refetch comments after insert
      const { data, error: commentsError } = await supabase
        .from("comments")
        .select()
        .eq("post_id", id)
        .order("created_at", { ascending: false })

      if (commentsError) throw commentsError
      setComments(data)
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!post) return <p>Post not found.</p>

  return (
    <div>
      <h1>{post.title}</h1>
      <p><em> Posted at:{new Date(post.created_at).toLocaleString()}</em></p>
      <p>{post.context}</p>
      {post.image && <img src={post.image} alt="Post visual" />}
      <div className="upvote-edit-delete">
        <p>       <button className = 'button-text-only'onClick={handleUpvote}>👍</button> {post.upvotes}</p>
        <br />
        <div className="edit-delete">
            <Link to={`/edit/${post.id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </div>

      </div>
      
      <hr />

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {comments.length === 0 && <li>No comments yet.</li>}
        {comments.map((c) => (
          <li key={c.id} className="comment">  
            <div className="comment-text"> {c.content}</div>
           
            <div className="comment-date"> 
                <small>{new Date(c.created_at).toLocaleString()}</small> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostPage
