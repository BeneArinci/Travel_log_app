import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from "../src/API"


const LogEntryForm = ({ location, onClose }) => {
    const { register, handleSubmit } = useForm();

    const [ loading, setLoading ] = useState(false)

    const [ error, setError ] = useState("")

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const completeData = {
                ...data,
                latitude: location.latitude,
                longitude: location.longitude
            }
            const created = createLogEntry(completeData);
            console.log(created);
            onClose();

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
            { error ? <h3 className='error'>{error}</h3> : null }
            <label for="title">Title</label>
            <input name="title" required {...register("title")}/>

            <label for="rating">Rating (0-10)</label>
            <input name="rating" type="number" {...register("rating")}/>

            <label for="comments">Comments</label>
            <textarea name="comments" rows={3} {...register("comments")}></textarea>

            <label for="description">Description</label>
            <textarea name="description" rows={3} {...register("description")}></textarea>

            <label for="image">Image</label>
            <input name ="image" {...register("image")} />

            <label for="visit_date">Visit date</label>
            <input name="visit_date" type="date" required {...register("visitDate")} />

            <button disabled={loading}>{loading ? 'Loading..' : 'Create your travel log entry'}</button>
        </form>
    )
}

export default LogEntryForm