import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "./client"
import './App.css'
const App = () => {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState("created_at")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select()
        .order(sortBy, { ascending: sortBy === "created_at" ? false : false })

      setPosts(data || [])
    }

    fetchPosts()
  }, [sortBy])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="controls">
        <input placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Popular</option>
        </select>
      </div>
      <ul>
        {filtered.map((post) => (
          <li key={post.id} className="post">
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p>Posted at: {new Date(post.created_at).toLocaleString()}</p>
              <p>👍 {post.upvotes}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
