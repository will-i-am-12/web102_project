import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client"
import './CreatePost.css'
const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: "", context: "", image: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert("Title is required")

    const { error } = await supabase.from("posts").insert([
      { ...form, upvotes: 0 }
    ])
    if (!error) navigate("/")
  }

  return (
    <form className = "form"onSubmit={handleSubmit}>
      <input
        required
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Additional content..."
        value={form.context}
        onChange={(e) => setForm({ ...form, context: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button type="submit">Post</button>
    </form>
  )
}

export default CreatePost
