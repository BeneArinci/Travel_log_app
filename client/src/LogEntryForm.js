import React from 'react';

const LogEntryForm = () => {
    return (
        <form className="entry-form">
            <label for="title">Title</label>
            <input name="title" />
            <label for="comments">Comments</label>
            <textarea name="comments" rows={3}></textarea>
            <label for="description">Description</label>
            <textarea name="description" rows={3}></textarea>
            <label for="image">Image</label>
            <input name ="image" />
            <label for="visit_date">Visit date</label>
            <input name="visit_date" type="date"/>
            <button>Create your travel log entry</button>
        </form>
    )
}

export default LogEntryForm