import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import './Edit.css'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: "", context: "", image: "" })

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("posts").select().eq("id", id).single()
      setForm(data)
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.from("posts").update(form).eq("id", id)
    navigate(`/post/${id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required/>
      <textarea value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
      <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <button type="submit">Update Post</button>
    </form>
  )
}

export default Edit
