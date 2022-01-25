import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item 1",
            rating: 10
        },
        {
            id: 2,
            text: "This item 2",
            rating: 5
        },
        {
            id: 3,
            text: "This 3",
            rating: 7
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // Functions

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete this feedback?")){
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const updateFeedback = (id, updatedFeedback) => {
        setFeedbackEdit(feedback.map((item) => item.id === id ? { ...item, ...updatedFeedback } : item))
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;